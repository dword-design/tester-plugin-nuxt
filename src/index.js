import { execaCommand } from 'execa'
import portReady from 'port-ready'
import kill from 'tree-kill-promise'

export default () => ({
  async after() {
    await kill(this.nuxt.pid)
  },
  async before() {
    await execaCommand('nuxt build', {
      env: { NODE_ENV: 'production', NUXT_TELEMETRY_DISABLED: 1 },
    })
    this.nuxt = execaCommand('nuxt start', {
      env: { NODE_ENV: 'production', NUXT_TELEMETRY_DISABLED: 1 },
    })
    await portReady(3000)
  },
})
