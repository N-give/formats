///<reference types='./types'/>

import { relative, isAbsolute, dirname, join } from 'path'

import * as chai from 'chai'
import * as chaiJsonSchema from 'chai-json-schema-ajv'
import { js_beautify as beautify } from 'js-beautify'
import { createInstrumenter } from 'istanbul-lib-instrument'
import { createCoverageMap } from 'istanbul-lib-coverage'
import { createContext } from 'istanbul-lib-report'
import { create as createReport } from 'istanbul-reports'

import { JSONSchema8 as Schema } from 'jsonschema8'
import * as Ajv from 'ajv'
import * as $RefParser from '@apidevtools/json-schema-ref-parser'

import schemas from './schemas'
import { loadSchema } from './ajv'

const { expect } = chai

describe('Type Schemas', () => {
  const instrumenter = createInstrumenter()
  function processCode (code: string, { $id }: Schema = {}): string {
    // Instrument schema validation code for coverage
    return instrumenter.instrumentSync(beautify(code), $id as string)
  }
  const ajv = new Ajv({
    loadSchema,
    processCode,
    inlineRefs: false,
    allErrors: true
  })
  before('Initialize JSON Schema validator', async () => {
    const meta = await $RefParser.dereference(
      'https://json-schema.org/draft/2019-09/schema'
    )

    // TODO: Why does compileAsync not work for meta schema?
    ajv.addMetaSchema(meta)

    chai.use(chaiJsonSchema.create({ ajv }))
  })
  after('Report ajv instrumenter coverage', () => {
    // @ts-ignore
    const coverage = createCoverageMap(global.__coverage__)
    const context = createContext({
      dir: '.coverage',
      coverageMap: coverage
    })
    const report = createReport('json', { file: 'coverage-schemas.json' })
    // @ts-ignore
    report.execute(context)
  })

  // TODO: Figure out less hacky way to make it find the files correctly
  let checkRefs: (key: string, schema: Schema) => Promise<any>
  before('Initiallize $ref checker', () => {
    const $refparser = new $RefParser()
    checkRefs = (key: string, schema: Schema) =>
      $refparser.dereference(schema, {
        resolve: {
          file: {
            order: 0,
            canRead: true,
            // TODO: Support external $ref
            async read ({ url }) {
              const r = /^https:\/\/formats\.openag\.io/
              const dir = '../src/schemas'
              const path = r.test(url) ? url.replace(r, '') : relative('', url)
              const file = (isAbsolute(path)
                ? join(dir, path)
                : join(dir, dirname(key), path)
              ).replace(/\.json$/, '')
              const { default: schema } = await import(file)
              return schema
            }
          }
        }
      })
  })

  for (const { schema, key, glob } of schemas()) {
    const { $id } = schema
    describe(key, () => {
      before('Compile schema', async () => {
        try {
          await ajv.compileAsync(schema)
        } catch (err) {
          // Already compiled
        }
      })

      it('should be valid JSON Schema', () => {
        expect(schema).to.be.validJsonSchema
      })

      // $id needs to be consistent with file structure
      // or most tools get upset
      it('should have conistent $id', () => {
        expect($id).to.equal(`https://${join('formats.openag.io/', glob)}`)
      })

      xit("should have valid self $ref's")

      it("should have valid external $ref's", async () => {
        await checkRefs(glob, schema)
      })

      try {
        // Include spec file for schema
        const specFile = join(__dirname, 'schemas', glob).replace(
          /\.json$/,
          '.spec'
        )
        require(specFile)
      } catch (err) {
        // If it fails to load just ignore it?
      }

      it('should have valid default', () => {
        if (schema.default) {
          expect(schema.default).to.be.jsonSchema($id)
        }
      })

      describe('Examples', () => {
        for (const i in schema.examples ?? []) {
          const example = schema.examples?.[i]

          it(`should validate example ${i}`, () => {
            expect(example).to.be.jsonSchema($id)
          })
        }
      })
    })
  }
})
