import { Base } from '@dword-design/base';
import packageName from 'depcheck-package-name';
import nuxtDevReady from 'nuxt-dev-ready';
import kill from 'tree-kill-promise';

export default () => ({
  async after() {
    await kill(this.nuxt.pid);
  },
  async before() {
    const base = new Base({
      name: packageName`@dword-design/base-config-nuxt`,
    });

    this.nuxt = base.run('dev');
    await nuxtDevReady();
  },
});
