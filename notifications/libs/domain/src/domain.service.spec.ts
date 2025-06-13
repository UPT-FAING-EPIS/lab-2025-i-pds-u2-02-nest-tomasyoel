import { Test, TestingModule } from '@nestjs/testing';
import { DomainService } from './domain.service';
import { LongMessage } from './long-message';
import { EmailMessageSender } from './email-message-sender';
import { AbstractMessage } from './abstract-message';
import { ShortMessage } from './short-message';
import { SmsMessageSender } from './sms-message-sender';

describe('DomainService', () => {
  let service: DomainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DomainService],
    }).compile();

    service = module.get<DomainService>(DomainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('GivenLongMessage_WhenSend_ThenEmailIsTriggered', () => {
  let longMessage: AbstractMessage;
  let confirm: string;

  beforeEach(async () => {
    const Message = "Este es un mensaje bien pero bien largoooooooooooooooooooooooo.";
    longMessage = new LongMessage(new EmailMessageSender());
    confirm = longMessage.SendMessage(Message);
  });
  it('Long Messsage should be not null', () => {
    expect(confirm).not.toBeNull();
  });
  it('Long Messsage should contains characters more than 0', () => {
    expect(confirm.length > 0).toBeTruthy();
  });
});

describe('GivenShortMessage_WhenSend_ThenSMSIsTriggered', () => {
  let shortMessage: AbstractMessage;
  let confirm: string;

  beforeEach(async () => {
    const Message = "Este es un mensaje corto.";
    shortMessage  = new ShortMessage(new SmsMessageSender());
    confirm = shortMessage .SendMessage(Message);
  });
  it('Short Messsage should be not null', () => {
    expect(confirm).not.toBeNull();
  });
  it('Short Messsage should contains characters more than 0', () => {
    expect(confirm.length > 0).toBeTruthy();
  });
});

describe('GivenLargeMessage_WhenSendinSMS_ThenOccursException', () => {
  let shortMessage: AbstractMessage;
  const Message = "Este es un mensaje largooooooooooooooooo.";

  beforeEach(async () => {
    shortMessage  = new ShortMessage(new SmsMessageSender());
  });
  it('Large Messsage in SMS should be an error', () => {
    expect(() => {shortMessage.SendMessage(Message)}).toThrow(new ShortMessage(new SmsMessageSender()).LARGE_ERROR_MESSAGE);
  });
});
