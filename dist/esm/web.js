import { WebPlugin } from '@capacitor/core';
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
//# sourceMappingURL=web.js.map