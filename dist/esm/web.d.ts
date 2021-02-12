import { WebPlugin } from '@capacitor/core';
import { IZip, ZipOptions, UnZipOptions, ZipResult, UnzipResult } from './definitions';
export declare class ZipPluginWeb extends WebPlugin implements IZip {
    constructor();
    zip(options: ZipOptions): Promise<ZipResult>;
    unZip(options: UnZipOptions): Promise<UnzipResult>;
}
declare const ZipPlugin: ZipPluginWeb;
export { ZipPlugin };
