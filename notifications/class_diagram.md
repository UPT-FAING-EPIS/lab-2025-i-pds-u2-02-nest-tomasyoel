```mermaid
classDiagram


class AbstractMessage{
            #_messageSender: IMessageSender
            +SendMessage() string*
        }
class DomainModule{
            
            
        }
class DomainService{
            
            
        }
class EmailMessageSender{
            
            +SendMessage() string
        }
IMessageSender<|..EmailMessageSender
class IMessageSender {
            <<interface>>
            
            +SendMessage() string
        }
class LongMessage{
            
            +SendMessage() string
        }
AbstractMessage<|--LongMessage
class ShortMessage{
            +LARGE_ERROR_MESSAGE: string
            +SendMessage() string
        }
AbstractMessage<|--ShortMessage
class SmsMessageSender{
            
            +SendMessage() string
        }
IMessageSender<|..SmsMessageSender
```