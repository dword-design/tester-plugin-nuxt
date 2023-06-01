import { execaCommand } from 'execa'
import portReady from 'port-ready'
import kill from 'tree-kill-promise'

export default () => ({
  async after() {
    await kill(this.nuxt.pid)
  },
  async before() {
    await execaCommand('nuxt build', { stdio: 'inherit' })
    this.nuxt = execaCommand('nuxt start', { stdio: 'inherit' })
    await portReady(3000)
  },
})
