import { IMessageSender } from "./imessage-sender.interface";

export abstract class AbstractMessage {
    protected _messageSender: IMessageSender;
    public abstract SendMessage(Message: string): string;
}