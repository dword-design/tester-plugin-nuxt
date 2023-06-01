import { execaCommand } from 'execa'
import portReady from 'port-ready'
import kill from 'tree-kill-promise'

export default () => ({
  async after() {
    await kill(this.nuxt.pid)
  },
  async before() {
    await execaCommand('nuxt build')
    this.nuxt = execaCommand('nuxt start')
    await portReady(3000)
  },
})
