import { registerPlugin } from '@capacitor/core';
const ZipPlugin = registerPlugin('ZipPlugin', {
    web: () => import('./web').then(m => new m.ZipPluginWeb()),
});
export * from './definitions';
export { ZipPlugin };
//# sourceMappingURL=index.js.map