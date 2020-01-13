class AdminRole {
    static ROOT: string = 'ROOT';
    static FINANCE: string = 'FINANCE';
    static OPERATION: string = 'OPERATION';
    static SUPERVISOR: string = 'SUPERVISOR';
    static RISK: string = 'RISK';

    static getStr(en: string): string {
        switch (en) {
            case AdminRole.ROOT:
                return 'Root';
                break;
            case AdminRole.OPERATION:
                return 'Operation';
                break;
            case AdminRole.SUPERVISOR:
                return 'Supervisor';
                break;
            default:
                return 'Unknown';
                break;
        }
    }

    static compareRank(r, n) {
        if (!r) return false;
        if (AdminRoleEnum.indexOf(r) > AdminRoleEnum.indexOf(n)) {
            return false;
        }
        return true;
    }
}

const AdminRoleEnum = [
    AdminRole.ROOT,
    AdminRole.FINANCE,
    AdminRole.OPERATION,
    AdminRole.SUPERVISOR,
    AdminRole.RISK,
];

export { AdminRole, AdminRoleEnum };