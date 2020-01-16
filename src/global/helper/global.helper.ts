import * as path from 'path';
import * as url from 'url';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { promises as fsPromise } from 'fs';
import { Model } from 'mongoose';
import { FileType } from '../enum/file-type.enum';
import { IFile } from '../../files/interfaces/file.interface';

class GlobalHelper {
    static publicPath = path.join(__dirname, '../../../public');
    static uploadPathImage = path.join(GlobalHelper.publicPath, '/upload/images');
    static uploadUrlImage = url.resolve(process.env.APP_URL, '/upload/images/');
    static uploadPathDocument = path.join(GlobalHelper.publicPath, '/upload/documents');
    static uploadUrlDocument = url.resolve(process.env.APP_URL, '/upload/documents/');

    static fileUrl(file: Model<IFile>) {
        let res;
        switch (file.type) {
            case FileType.LOCAL_IMAGES:
                res = url.resolve(GlobalHelper.uploadUrlImage, file.key);
                break;
            case FileType.LOCAL_DOCUMENTS:
                res = url.resolve(GlobalHelper.uploadUrlDocument, file.key);
                break;
            default:
                res = '';
                break;
        }

        return res;
    }

    static removeLocalFileImage(key: string) {
        const filePath = path.join(GlobalHelper.uploadPathImage, key);
        fsPromise.unlink(filePath).catch(err => console.log(err));
        return true;
    }
    static removeLocalFileDocument(key: string) {
        const filePath = path.join(GlobalHelper.uploadPathDocument, key);
        fsPromise.unlink(filePath).catch(err => console.log(err));
        return true;
    }
}

export { GlobalHelper };
