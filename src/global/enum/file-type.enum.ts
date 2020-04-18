class FileType {
    static LOCAL_IMAGES: string = 'LOCAL_IMAGES';
    static LOCAL_DOCUMENTS: string = 'LOCAL_DOCUMENTS';
    static S3: string = 'S3';

    static getStr(en: string): string {
        switch (en) {
            case FileType.LOCAL_IMAGES:
                return 'Local Images';
                break;
            case FileType.LOCAL_DOCUMENTS:
                return 'Local Documents';
                break;
            case FileType.LOCAL_IMAGES:
                return 'AWS S3';
                break;
            default:
                return '';
                break;
        }
    }
}

const FileEnum = [FileType.LOCAL_IMAGES, FileType.LOCAL_DOCUMENTS, FileType.S3];

export { FileType, FileEnum };
