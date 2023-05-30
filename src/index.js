import { execaCommand } from 'execa'
import nuxtDevReady from 'nuxt-dev-ready'
import kill from 'tree-kill-promise'

export default () => ({
  async after() {
    await kill(this.nuxt.pid)
  },
  async before() {
    this.nuxt = execaCommand('nuxt dev')
    await nuxtDevReady()
  },
})
