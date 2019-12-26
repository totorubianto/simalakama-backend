const UserEnum = ['ADMIN', 'USER'];
class UserType {
    static ADMIN: string = 'ADMIN';
    static USER: string = 'USER';

    static getStr(en: string): string {
        switch (en) {
            case "ADMIN":
                return 'Admin';
                break;
            case "USER":
                return 'User';
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
            default:
                return '';
                break;
        }   
    }
}

export { UserType, UserEnum };