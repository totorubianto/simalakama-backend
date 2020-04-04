import { Injectable, BadRequestException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { IFile } from './interfaces/file.interface';
import { FileType } from '../global/enum/file-type.enum';
import { promises as fs } from 'fs';
import { InjectModel } from '@nestjs/mongoose';
import * as path from 'path';
import { GlobalHelper } from '../global/helper/global.helper';
@Injectable()
export class FilesService {
    constructor(@InjectModel('File') readonly file: Model<IFile>) { }

    async findById(id: string) {
        return await this.file.findOne({ _id: id }).exec();
    }

    async upload(file: Object, type: string, desc?: string, model?: any): Promise<Model<IFile>> {
        let uploaded;
        switch (type) {
            case FileType.LOCAL_IMAGES:
                uploaded = this.uploadLocalImages(file, desc, model);
                break;
            case FileType.LOCAL_DOCUMENTS:
                uploaded = this.uploadLocalDocuments(file, desc, model);
                break;
            case FileType.S3:
                uploaded = this.uploadS3(file, desc);
                break;
        }

        return uploaded;
    }

    private async uploadLocalImages(file: any, desc?: string, model?: any): Promise<Model<IFile>> {
        if (model && !Types.ObjectId.isValid(model))
            throw new BadRequestException('Object Id not valid');
        const ext = file.originalname.split('.').pop();
        const filename = file.originalname.split('.')[0];
        const key = filename.substring(0, 10) + '_' + Date.now() + '.' + ext;
        const savePath = path.join(GlobalHelper.uploadPathImage, key);
        if (model) this.remove(model);
        const upload = await fs.writeFile(savePath, file.buffer);
        const uploaded = this.file({
            name: file.originalname,
            key: key,
            type: FileType.LOCAL_IMAGES,
            description: desc,
        });

        return uploaded.save();
    }

    private async uploadLocalDocuments(
        file: any,
        desc?: string,
        model?: any,
    ): Promise<Model<IFile>> {
        const ext = file.originalname.split('.').pop();
        const filename = file.originalname.split('.')[0];
        const key = filename.substring(0, 10) + '_' + Date.now() + '.' + ext;
        const savePath = path.join(GlobalHelper.uploadPathDocument, key);
        const upload = await fs.writeFile(savePath, file.buffer);
        if (model) this.remove(model);
        const uploaded = this.file({
            name: file.originalname,
            key: key,
            type: FileType.LOCAL_DOCUMENTS,
            description: desc,
        });

        return uploaded.save();
    }

    private async uploadS3(file: any, desc?: string) { }

    async remove(id: string): Promise<boolean> {
        const file = await this.findById(id);
        if (!file) return true;
        await file.remove();
        return true;
    }

    validateExt(file: any, ...types) {
        const ext = file.originalname.split('.').pop();
        return types.includes(ext);
    }

    isImages(...files) {
        const imageExt = ['jpg', 'png', 'jpeg'];
        return files.every(file => {
            if (!file) return false;
            const ext = file.originalname.split('.').pop();
            return imageExt.includes(ext);
        });
    }

    isImagesArr(files) {
        const imageExt = ['jpg', 'png', 'jpeg'];
        return files.every(file => {
            if (!file) return false;
            const ext = file.originalname.split('.').pop();
            return imageExt.includes(ext);
        });
    }

    maxSize(size: number, ...files) {
        const max = size * (1024 * 1024);
        return files.every(file => {
            return file.size > max;
        });
    }

    maxSizeArr(size: number, files) {
        const max = size * (1024 * 1024);
        if (files.length < 1) return false
        const data = files.every(file => {
            return file.size > max;
        });

        return data;
    }
}
