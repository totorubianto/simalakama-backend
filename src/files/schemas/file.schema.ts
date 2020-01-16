import * as mongoose from 'mongoose';
import { FileEnum, FileType } from '../../global/enum/file-type.enum';
import { GlobalHelper } from '../../global/helper/global.helper';

const Schema = mongoose.Schema;

const attachModels = ['Admin', 'Merchant', 'User', 'Bank', 'BankAccount'];

const FileSchema = new mongoose.Schema(
    {
        name: { type: String, default: null },
        key: { type: String, required: true },
        description: { type: String, default: null },
        type: { type: String, enum: FileEnum },
    },
    { timestamps: true },
);

FileSchema.set('toJSON', { getters: true, virtuals: true });
FileSchema.set('toObject', { getters: true, virtuals: true });

FileSchema.virtual('url').get(function() {
    return GlobalHelper.fileUrl(this);
});

FileSchema.post('remove', function(doc) {
    // Remove file from local / s3
    switch (this.type) {
        case FileType.LOCAL_IMAGES:
            GlobalHelper.removeLocalFileImage(this.key);
            break;
        case FileType.LOCAL_DOCUMENTS:
            GlobalHelper.removeLocalFileDocument(this.key);
            break;
    }
});

const hidden = ['id', 'key', '__v'];

FileSchema.methods.toJSON = function() {
    var obj = this.toObject();
    for (var i = hidden.length - 1; i >= 0; i--) {
        delete obj[hidden[i]];
    }
    return obj;
};

export { FileSchema };
