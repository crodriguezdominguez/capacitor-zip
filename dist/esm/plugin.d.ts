import { IZip, UnZipOptions, ZipOptions, UnzipResult, ZipResult, ZipProgressInfo } from './definitions';
export declare class Zip implements IZip {
    zip(options: ZipOptions, progress?: (progress: ZipProgressInfo) => void): Promise<ZipResult>;
    unZip(options: UnZipOptions, progress?: (progress: ZipProgressInfo) => void): Promise<UnzipResult>;
}
