import { AbstractMessage } from "./abstract-message";
import { IMessageSender } from "./imessage-sender.interface";

export class LongMessage extends AbstractMessage {
    constructor(messageSender: IMessageSender) {
        super();
        this._messageSender = messageSender;
    }
    public SendMessage(Message: string): string {
        return this._messageSender.SendMessage(Message);
    }
}