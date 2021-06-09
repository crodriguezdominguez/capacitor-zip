export interface IZip {
    zip(options: ZipOptions, progress?: Function): Promise<ZipResult>;
    unZip(options: UnZipOptions, progress?: Function): Promise<UnzipResult>;
}
export interface ZipOptions {
    source: string;
    destination: string;
    keepParent?: boolean;
    password?: string;
}
export interface UnZipOptions {
    source: string;
    destination: string;
    overwrite?: boolean;
    password?: string;
}
export interface ZipResult {
    path: string;
}
export interface ZipProgressInfo {
    value: number;
}
export interface UnzipResult {
    path: string;
}
