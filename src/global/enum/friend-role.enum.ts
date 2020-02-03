const FriendEnum = ['PENDING', 'FRIEND'];
class FriendType {
    static PENDING: string = 'PENDING';
    static FRIEND: string = 'FRIEND';

    static getStr(en: string): string {
        switch (en) {
            case 'PENDING':
                return 'Pending';
                break;
            case 'FRIEND':
                return 'Friend';
                break;
            default:
                return '';
                break;
        }
    }
}

export { FriendType, FriendEnum };
