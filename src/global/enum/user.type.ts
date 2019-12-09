const UserEnum = ['ADMIN', 'USER', 'MERCHANT'];
class UserType {
    static ADMIN: string = 'ADMIN';
    static USER: string = 'USER';
    static MERCHANT: string = 'MERCHANT';

    static getStr(en: string): string {
        switch (en) {
            case "ADMIN":
                return 'Admin';
                break;
            case "USER":
                return 'User';
                break;
            case "MERCHANT":
                return 'Merchant';
                break;
            default:
                return '';
                break;
        }
    }

    static getModel(en: string): string {
        switch (en) {
            case "ADMIN":
                return 'Admin';
                break;
            case "USER":
                return 'User';
                break;
            case "MERCHANT":
                return 'Merchant';
                break;
            default:
                return '';
                break;
        }   
    }
}

export { UserType, UserEnum };