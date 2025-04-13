import { Base } from '@dword-design/base';
import packageName from 'depcheck-package-name';
import portReady from 'port-ready';
import kill from 'tree-kill-promise';

export default () => ({
  async after() {
    await kill(this.nuxt.pid);
  },
  async before() {
    const base = new Base({
      name: packageName`@dword-design/base-config-nuxt`,
    });

    await base.run('prepublishOnly');
    this.nuxt = base.run('start');
    await portReady(3000);
  },
});
