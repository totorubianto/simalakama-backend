
class ScopeType {
    static PUBLIC: string = 'PUBLIC';
    static FRIEND: string = 'FRIEND';

    static getStr(en: string): string {
        switch (en) {
            case ScopeType.PUBLIC:
                return 'Public';
                break;
            case ScopeType.FRIEND:
                return 'Friend';
                break;
            default:
                return '';
                break;
        }
    }
}
const ScopeEnum = [ScopeType.FRIEND, ScopeType.PUBLIC];
export { ScopeType, ScopeEnum };
