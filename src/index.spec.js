import { Base } from '@dword-design/base'
import { endent } from '@dword-design/functions'
import tester from '@dword-design/tester'
import testerPluginTmpDir from '@dword-design/tester-plugin-tmp-dir'
import packageName from 'depcheck-package-name'
import outputFiles from 'output-files'

export default tester(
  {
    'test env': async () => {
      await outputFiles({
        '.env.json': JSON.stringify({ foo: 'foo' }),
        '.env.schema.json': JSON.stringify({ foo: { type: 'string' } }),
        '.test.env.json': JSON.stringify({ foo: 'bar' }),
        'config.js': endent`
          export default {
            runtimeConfig: {
              public: { foo: process.env.FOO },
            },
          }
        `,
        'package.json': JSON.stringify({
          devDependencies: {
            '@dword-design/tester': '*',
            '@dword-design/tester-plugin-puppeteer': '*',
          },
        }),
        pages: {
          'index.spec.js': endent`
            import tester from '${packageName`@dword-design/tester`}'
            import testerPluginPuppeteer from '${packageName`@dword-design/tester-plugin-puppeteer`}'

            import self from '../../src/index.js'

            export default tester({
              async valid() {
                await this.page.goto('http://localhost:3000')
                const foo = await this.page.waitForSelector('.foo')
                expect(await foo.evaluate(el => el.innerText)).toEqual('bar')
              },
            }, [testerPluginPuppeteer(), self()])
          `,
          'index.vue': endent`
            <template>
              <div class="foo">{{ foo }}</div>
            </template>

            <script setup>
            import { useRuntimeConfig } from '#imports'

            const { public: { foo } } = useRuntimeConfig()
            </script>
          `,
        },
      })

      const base = new Base({ name: '@dword-design/base-config-nuxt' })
      await base.prepare()
      await base.test()
    },
    valid: async () => {
      await outputFiles({
        'package.json': JSON.stringify({
          devDependencies: {
            '@dword-design/tester': '*',
            '@dword-design/tester-plugin-puppeteer': '*',
          },
        }),
        pages: {
          'index.spec.js': endent`
            import tester from '${packageName`@dword-design/tester`}'
            import testerPluginPuppeteer from '${packageName`@dword-design/tester-plugin-puppeteer`}'

            import self from '../../src/index.js'

            export default tester({
              async valid() {
                await this.page.goto('http://localhost:3000')
                await this.page.waitForSelector('.foo')
              },
            }, [testerPluginPuppeteer(), self()])
          `,
          'index.vue': endent`
            <template>
              <div class="foo" />
            </template>
          `,
        },
      })

      const base = new Base({ name: '@dword-design/base-config-nuxt' })
      await base.prepare()
      await base.test()
    },
  },
  [testerPluginTmpDir()],
)
