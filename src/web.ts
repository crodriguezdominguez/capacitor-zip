import { WebPlugin, registerWebPlugin } from '@capacitor/core';
import { IZip, ZipOptions, UnZipOptions, ZipResult, UnzipResult } from './definitions';

export class ZipPluginWeb extends WebPlugin implements IZip {
  constructor() {
    super({
      name: 'ZipPlugin',
      platforms: ['web']
    });
  }

  zip(options: ZipOptions): Promise<ZipResult> {
    console.log(options);
    return Promise.resolve({path: options.destination});
  }
  unZip(options: UnZipOptions): Promise<UnzipResult> {
    console.log(options);
    return Promise.resolve({path: options.destination});
  }
}

const ZipPlugin = new ZipPluginWeb();

export { ZipPlugin };
registerWebPlugin(ZipPlugin);
