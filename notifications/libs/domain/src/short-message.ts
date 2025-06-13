import { AbstractMessage } from "./abstract-message";
import { IMessageSender } from "./imessage-sender.interface";

export class ShortMessage extends AbstractMessage {
    public LARGE_ERROR_MESSAGE: string = "Unable to send the message as length > 25 characters";

    constructor(messageSender: IMessageSender) {
        super();
        this._messageSender = messageSender;
    }
    public SendMessage(Message: string): string {
        if (Message.length <= 25)
            return this._messageSender.SendMessage(Message);
        else
            throw new Error(this.LARGE_ERROR_MESSAGE);
    }
}