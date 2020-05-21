class EventType {
    static MESSAGE: string = 'MESSAGE';
    static CONNECT: string = 'CONNECT';

    static getStr(en: string): string {
        switch (en) {
            case EventType.MESSAGE:
                return 'Message';
                break;
            case EventType.CONNECT:
                return 'Connect';
                break;
            default:
                return 'Unknown';
                break;
        }
    }
}

const EventEnum = [
    EventType.MESSAGE,
    EventType.CONNECT,
];

export { EventType, EventEnum };