import { Plugins } from '@capacitor/core';
import { IZip, UnZipOptions, ZipOptions, UnzipResult, ZipResult, ZipProgressInfo } from './definitions';

const {ZipPlugin} = Plugins;

export class Zip implements IZip {
    public zip(options: ZipOptions, progress?: (progress: ZipProgressInfo) => void): Promise<ZipResult> {
        return new Promise((resolve, reject) => {
            ZipPlugin.zip(options, (data: any, error: any) => {
                if (!error) {
                    if (!data.completed) {
                        if (progress) {
                            progress({
                                value: data.progress
                            });
                        }
                    } else {
                        resolve({
                            path: data.path
                        });
                    }
                } else {
                    reject(error);
                }
            });
        });
    }

    public unZip(options: UnZipOptions, progress?: (progress: ZipProgressInfo) => void): Promise<UnzipResult> {
        return new Promise((resolve, reject) => {
            ZipPlugin.unZip(options, (data: any, error: any) => {
                if (!error) {
                    if (!data.completed) {
                        if (progress) {
                            progress({
                                value: data.progress
                            });
                        }
                    } else {
                        resolve({
                            path: data.path
                        });
                    }
                } else {
                    reject(error);
                }
            });
        });
    }
}
