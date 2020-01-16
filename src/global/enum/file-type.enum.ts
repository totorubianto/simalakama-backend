const FileEnum = ['LOCAL_IMAGES', 'LOCAL_DOCUMENTS', 'S3'];
class FileType {
    static LOCAL_IMAGES: string = 'LOCAL_IMAGES';
    static LOCAL_DOCUMENTS: string = 'LOCAL_DOCUMENTS';
    static S3: string = 'S3';

    static getStr(en: string): string {
        switch (en) {
            case 'LOCAL_IMAGES':
                return 'Local Images';
                break;
            case 'LOCAL_DOCUMENTS':
                return 'Local Documents';
                break;
            case 'S3':
                return 'AWS S3';
                break;
            default:
                return '';
                break;
        }
    }
}

export { FileType, FileEnum };
