const UserEnum = ['ADMIN', 'USER', 'COMPANIES'];
class UserType {
    static ADMIN: string = 'ADMIN';
    static USER: string = 'USER';
    static COMPANIES: string = 'COMPANIES';

    static getStr(en: string): string {
        switch (en) {
            case 'ADMIN':
                return 'Admin';
                break;
            case 'USER':
                return 'User';
                break;
            case 'COMPANIES':
                return 'Companies';
                break;
            default:
                return '';
                break;
        }
    }

    static getModel(en: string): string {
        switch (en) {
            case 'ADMIN':
                return 'Admin';
                break;
            case 'USER':
                return 'User';
                break;
            case 'COMPANIES':
                return 'Companies';
                break;
            default:
                return '';
                break;
        }
    }
}

export { UserType, UserEnum };
