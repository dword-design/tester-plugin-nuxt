import { endent } from '@dword-design/functions'
import tester from '@dword-design/tester'
import testerPluginTmpDir from '@dword-design/tester-plugin-tmp-dir'
import packageName from 'depcheck-package-name'
import { execaCommand } from 'execa'
import outputFiles from 'output-files'

export default tester(
  {
    valid: async () => {
      await outputFiles({
        pages: {
          'index.spec.js': endent`
            import tester from '${packageName`@dword-design/tester`}'
            import testerPluginPuppeteer from '${packageName`@dword-design/tester-plugin-puppeteer`}'

            import self from '../../src/index.js'

            export default tester({
              async valid() {
                await this.page.goto('http://localhost:3000')
                console.log(await this.page.content())
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
      await execaCommand('mocha --ui exports --timeout 60000 pages/index.spec.js', { stdio: 'inherit' })
    },
  },
  [testerPluginTmpDir()],
)
