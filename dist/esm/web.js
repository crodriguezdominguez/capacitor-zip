import { WebPlugin, registerWebPlugin } from '@capacitor/core';
export class ZipPluginWeb extends WebPlugin {
    constructor() {
        super({
            name: 'ZipPlugin',
            platforms: ['web']
        });
    }
    zip(options) {
        console.log(options);
        return Promise.resolve({ path: options.destination });
    }
    unZip(options) {
        console.log(options);
        return Promise.resolve({ path: options.destination });
    }
}
const ZipPlugin = new ZipPluginWeb();
export { ZipPlugin };
registerWebPlugin(ZipPlugin);
//# sourceMappingURL=web.js.map