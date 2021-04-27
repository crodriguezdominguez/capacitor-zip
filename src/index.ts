import { IZip } from './definitions';
import { registerPlugin } from '@capacitor/core';

const ZipPlugin = registerPlugin<IZip>('ZipPlugin', {
  web: () => import('./web').then(m => new m.ZipPluginWeb()),
});

export * from './definitions';
export { ZipPlugin }
