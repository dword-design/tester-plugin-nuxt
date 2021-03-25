import { Builder, Nuxt } from 'nuxt'

export default (config = {}) => ({
  after() {
    return this.nuxt.close()
  },
  async before() {
    this.nuxt = new Nuxt({ dev: true, ...config })
    await new Builder(this.nuxt).build()
    await this.nuxt.listen()
  },
})
