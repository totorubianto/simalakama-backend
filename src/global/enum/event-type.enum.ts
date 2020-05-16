class EventType {
    static MESSAGE: string = 'MESSAGE';

    static getStr(en: string): string {
        switch (en) {
            case EventType.MESSAGE:
                return 'Message';
                break;
            default:
                return 'Unknown';
                break;
        }
    }
}

const EventEnum = [
    EventType.MESSAGE,
];

export { EventType, EventEnum };