[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/saEjXNYL)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=19756330)
# SESION DE LABORATORIO N° 02: PATRONES DE DISEÑO ESTRUCTURALES

### Nombre: 

## OBJETIVOS
  * Comprender el funcionamiento de algunos patrones de diseño de software del tipo estructural.

## REQUERIMIENTOS
  * Conocimientos: 
    - Conocimientos básicos de Bash (powershell).
    - Conocimientos básicos de Contenedores (Docker).
  * Hardware:
    - Virtualization activada en el BIOS..
    - CPU SLAT-capable feature.
    - Al menos 4GB de RAM.
  * Software:
    - Windows 10 64bit: Pro, Enterprise o Education (1607 Anniversary Update, Build 14393 o Superior)
    - Docker Desktop 
    - Powershell versión 7.x
    - Node versión 21.x.x o superior
    - Visual Studio Code

## CONSIDERACIONES INICIALES
  * Clonar el repositorio mediante git para tener los recursos necesarios

## DESARROLLO

### PARTE I: Bridge Design Pattern 

![image](https://github.com/UPT-FAING-EPIS/SI889_PDS/assets/10199939/186e0bbd-0d14-48eb-af20-8f46dc0a08ca)

![image](https://github.com/UPT-FAING-EPIS/SI889_PDS/assets/10199939/fab291c1-01e9-4a11-bfbd-a34609466cab)

1. Iniciar la aplicación Powershell o Windows Terminal en modo administrador. Redirigirse a una ubicación que no sea del sistema.
2. En el terminal, ejecutar el siguiente comando para instalar las herramientas necesarias para el laboratorio
```
npm install -g @nestjs/cli
npm install -g tsuml2
```
![](./img/1.png)


3. En el terminal, ejecutar el siguiente comando para crear una aplicación.
```
nest new Notifications -p npm -g
```

![](./img/2.png)

![](./img/3.png)

4. En el terminal, ejecutar los siguientes comandos para acceder a la carpeta del proyecto y crear una nueva libreria de clases y adicionarla a la aplicación actual.
```TS
cd notifications
nest g lib domain
```

![](./img/4.png)

> Cuando realice la pregunta de configuración, presionar Enter para aceptar el valor por defecto

5. En el terminal, ejecutar el siguiente comando para crear los archivos necesarios para el laboratorio.
```Bash
nest g itf IMessageSender -p domain --flat --no-spec
nest g cl SmsMessageSender -p domain --flat --no-spec
nest g cl EmailMessageSender -p domain --flat --no-spec
nest g cl AbstractMessage -p domain --flat --no-spec
nest g cl ShortMessage -p domain --flat --no-spec
nest g cl LongMessage -p domain --flat --no-spec
```

![](./img/5.png)

6. Iniciar Visual Studio Code (VS Code) abriendo el folder de la solución como proyecto. En el proyecto, si existe un archivo app.controller.spec.ts proceder a eliminarlo. 

![](./img/6.png)

7. En VS Code, en el proyecto Bank.Domain proceder a modificar el archivo el archivo icredit-card.interface.ts e introducir el siguiente código:
```TS
export interface IMessageSender {
  SendMessage(Message: string): string
}
```

![](./img/7.png)

7. En VS Code, en el proyecto Notification.Domain proceder a crear las implementaciones de la interfaz creada en el paso previo para eso modificamos los archivos:
> sms-message-sender
```TS
import { IMessageSender } from "./imessage-sender.interface";

export class SmsMessageSender implements IMessageSender {
    SendMessage(Message: string): string {
        return "'" + Message + "' : This Message has been sent using SMS";
    }
}
```

![](./img/8.png)

> email-message-sender.ts
```TS
import { IMessageSender } from "./imessage-sender.interface";

export class EmailMessageSender implements IMessageSender {
    SendMessage(Message: string): string {
        return "'" + Message + "'   : This Message has been sent using Email";
    }
}
```

![](./img/9.png)

8. En VS Code, en el proyecto Notification.Domain modificar la clase abstracta que permitira definir los posibles tipos de mensajes por lo que en el proyecto de Notifications.Domain se debe agregar en el archivo abstract-message.ts con el siguiente código:
```TS
import { IMessageSender } from "./imessage-sender.interface";

export abstract class AbstractMessage {
    protected _messageSender: IMessageSender;
    public abstract SendMessage(Message: string): string;
}
```

![](./img/10.png)

9. En VS Code, sobre esta clase abstracta ahora se necesita implementar los tipos de mensajes concretos, para eso adicionar los siguientes archivos al proyecto Notifications.Domain:
> short-message.ts
```TS
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
```

![](./img/11.png)

> long-message.ts
```TS
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
```

![](./img/12.png)

10. En VS Code, ahora proceder a implementar unas pruebas para verificar el correcto funcionamiento de la aplicación. Para esto al proyecto Notifications.Domains modificarr el archivo domain.service.spec.ts y agregar el siguiente código:
```TS
import { LongMessage } from './long-message';
import { EmailMessageSender } from './email-message-sender';
import { AbstractMessage } from './abstract-message';
import { ShortMessage } from './short-message';
import { SmsMessageSender } from './sms-message-sender';

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
```

![](./img/13.png)

11. Ahora necesitamos comprobar las pruebas contruidas para eso abrir un terminal en VS Code (CTRL + Ñ) o vuelva al terminal anteriormente abierto, y ejecutar los comandos:
```Bash
npm run test:cov
```

![](./img/14.png)

12. Si las pruebas se ejecutaron correctamente debera aparcer un resultado similar al siguiente:
```Bash
Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
```

![](./img/15.png)

13. En el terminal, ejecutar el siguiente comando para generar el diagrama de clases respectivo.
```Bash
tsuml2 --glob "./libs/**/*.ts" --outMermaidDsl "./class_diagram.md"
```

![](./img/16.png)

14. En el VS Code, modificar el archivo class_diagram.md y adicionar \```mermaid al inicio del archivo y al final adicionar \```

![](./img/17.png)

15. En el terminal, ejecutar el siguiente comando para generar la documentación del proyecto, esta se creara en la carpeta documentation
```Bash
npx @compodoc/compodoc -p tsconfig.json -s
```

![](./img/19.png)

### PARTE II: Facade Design Pattern

![image](https://github.com/UPT-FAING-EPIS/SI889_PDS/assets/10199939/ece5c02f-fe5e-4125-91f4-7479f6c3d746)


1. Iniciar una nueva instancia de la aplicación Powershell o Windows Terminal en modo administrador 
2. En el terminal, ejecutar el siguiente comando para crear una aplicación.
```
nest new CustomerApp -p npm -g
```

![](./img/20-1.png)

![](./img/20-2.png)

3. En el terminal, ejecutar los siguientes comandos para acceder a la carpeta del proyecto y crear una nueva libreria de clases y adicionarla a la aplicación actual.
```TS
cd customer-app
nest g lib domain
```

> Cuando realice la pregunta de configuración, presionar Enter para aceptar el valor por defecto

![](./img/20-3.png)

4. En el terminal, ejecutar el siguiente comando para crear los archivos necesarios para el laboratorio.
```Bash
nest g cl Customer -p domain --flat --no-spec
nest g cl Validator -p domain --flat --no-spec
nest g cl DataAccessLayer -p domain --flat --no-spec
nest g cl EmailService -p domain --flat --no-spec
nest g cl CustomerRegistration -p domain --flat --no-spec
```

![](./img/20-4.png)

5. Iniciar Visual Studio Code (VS Code) abriendo el folder de la solución como proyecto. En el proyecto, si existe un archivo app.controller.spec.ts proceder a eliminarlo. 

![](./img/20-5.png)

6. En el VS Code, en el proyecto CustomerApp.Domain, primero se necesita implementar la entidad Cliente, para esto crear el archivo customer.ts con el siguiente código:
```TS
export class Customer {
    public Name: string;
    public Email: string;
    public MobileNumber: string;
    public Address: string;
    public Password: string;
    public static Create(name: string, email: string, mobileNumber: string, address: string, password: string): Customer
    {
        const c = new Customer();
        c.Name = name;
        c.Email = email; 
        c.MobileNumber = mobileNumber; 
        c.Address = address; 
        c.Password = password;
        return c;
    }
}
```

![](./img/20-6.png)

7. En el VS Code, en el proyecto CustomerApp.Domain, ahora se debe implementar cada una de clases correspondiente al flujo de creaciòn del cliente (validar, guardar y enviar email) para eso se deberan crear los siguientes archivos con el còdigo correspondiente:
> validator.ts
```TS
import { Customer } from "./customer";

export class Validator {
    public ValidateCustomer(customer: Customer): boolean
    {
        //Need to Validate the Customer Object
        if (typeof customer.Name === 'string' && customer.Name.trim().length === 0) throw new Error("Name can't be null or empty");
        if (typeof customer.Email === 'string' && customer.Email.trim().length === 0) throw new Error("Email can't be null or empty");
        if (typeof customer.MobileNumber === 'string' && customer.MobileNumber.trim().length === 0) throw new Error("MobileNumber can't be null or empty");
        if (typeof customer.Address === 'string' && customer.Address.trim().length === 0) throw new Error("Address can't be null or empty");
        return true;
    }    
}
```

![](./img/20-7.png)

> data-access-layer.ts
```TS
import { Customer } from "./customer";

export class DataAccessLayer {
    public Customers: Array<Customer>;
    constructor() {
        this.Customers = [];
    }
    public SaveCustomer(customer: Customer): boolean
    {
        this.Customers.push(customer);
        return true;
    }           
}
```

![](./img/20-8.png)

> email-service.ts
```TS
import { Customer } from "./customer";
//import { MailerService } from '@nestjs-modules/mailer';

export class EmailService {
    //constructor(private readonly mailService: MailerService) {}

    public SendRegistrationEmail(customer: Customer): boolean
    {
        // this.mailService.sendMail({
        //     from: 'Kingsley Okure <kingsleyokgeorge@gmail.com>',
        //     to: customer.Email,
        //     subject: "Test mail",
        //     text: "<h1>Hello</h1>",
        //   });        
        return true;
    }         
}
```

![](./img/20-9.png)

8. En el VS Code, en el proyecto CustomerApp.Domain, para probar esta implementación, modificar el archivo domain.service.spec.ts con el siguiente código:
```TS
import { Customer } from './customer';
import { CustomerRegistration } from './customer-registration';
import { DataAccessLayer } from './data-access-layer';
import { EmailService } from './email-service';
import { Validator } from './validator';

describe('GivenANewCustomer_WhenRegister_ThenIsValidatedSavedEmailedSuccessfully', () => {
  let customer: Customer;
  let validator: Validator;
  let dataAccessLayer: DataAccessLayer;
  let saved: boolean;
  let email: EmailService;

  beforeEach(async () => {
    validator = new Validator();
    dataAccessLayer = new DataAccessLayer();
    email = new EmailService();
    customer = Customer.Create(
      "Jose Cuadros","p.cuadros@gmail.com","1234567890","Tacnamandapio","str0ng.pa55");
    saved =  dataAccessLayer.SaveCustomer(customer);
  });

  it('Customer should be defined', () => {
    expect(customer).toBeDefined();
  });

  it('Customer should be valid', () => {
    expect(validator.ValidateCustomer(customer)).toBeTruthy();
  });

  it('Customer should be saved', () => {
    expect(saved).toBeTruthy();
  });

  it('Customer should be add', () => {
    expect(dataAccessLayer.Customers.length > 0).toBeTruthy();
  });

  it('Customer should be notified', () => {
    expect(email.SendRegistrationEmail(customer)).toBeTruthy();
  });
});
```

![](./img/20-10.png)

9. Ahora necesitamos comprobar las pruebas contruidas para eso abrir un terminal en VS Code (CTRL + Ñ) o vuelva al terminal anteriormente abierto, y ejecutar el comando:
```Bash
npm run test:cov
```

10. Si las pruebas se ejecutaron correctamente debera aparcer un resultado similar al siguiente:
```Bash
Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
```

![](./img/20-11.png)

11. Entonces ¿cuál es problema con este diseño? Funciona.... pero el problema es que ahora existen muchos sub sistemas como Validador, Acceso a Datos y Servicio de Email y el cliente que las utilice necesita seguir la secuencia apropiada para crear y consumir los objetos de los subsistemas. Existe una posibilidad que el cliente no siga esta secuencia apropiada o que olvide incluir o utilizar alguno de estos sub sistemas. Entonces si en vez de darle acceso a los sub sistemas, se crea una sola interfaz y se le brinda acceso al cliente para realizar el registo, asi la lógica compleja se traslada a esta interfaz sencilla. Para esto se utilizará el patrón FACHADA el cual escondera toda la complejidad y brindará un solo metodo cimple de usar al cliente.

![image](https://github.com/UPT-FAING-EPIS/SI889_PDS/assets/10199939/a9cb73bb-c996-4e9a-bf4c-f665f1957119)

12. En el VS Code, proceder a modificar el archivo customer-registration.ts en el proyecto CustomerApp.Domain, con el siguiente contenido:
```TS
import { Customer } from "./customer";
import { DataAccessLayer } from "./data-access-layer";
import { EmailService } from "./email-service";
import { Validator } from "./validator";

export class CustomerRegistration {
    public RegisterCustomer(customer: Customer): boolean
    {
        //Step1: Validate the Customer
        const validator = new Validator();
        validator.ValidateCustomer(customer);
        //Step1: Save the Customer Object into the database
        const customerDataAccessLayer = new DataAccessLayer();
        customerDataAccessLayer.SaveCustomer(customer);
        //Step3: Send the Registration Email to the Customer
        const email = new EmailService();
        email.SendRegistrationEmail(customer);
        return true;
    }    
}

```

![](./img/20-11-1.png)

13. En el VS Code, Finalmente adciionar un nuevo test de prueba en el archivo domain.service.spec.ts para comprobar el funcionamiento de la nueva clase creada:
```C#
describe('GivenANewCustomer_WhenRegister_ThenIsRegisteredSuccessfully', () => {
  let customer: Customer;
  let registration: CustomerRegistration;

  beforeEach(async () => {
    registration = new CustomerRegistration();
    customer = Customer.Create(
      "Jose Cuadros","p.cuadros@gmail.com","1234567890","Tacnamandapio","str0ng.pa55");
  });

  it('Customer should be defined', () => {
    expect(customer).toBeDefined();
  });

  it('Customer should be registered', () => {
    expect(registration.RegisterCustomer(customer)).toBeTruthy();
  });
});
       
```

![](./img/20-12.png)

14. Ahora necesitamos comprobar las pruebas contruidas para eso abrir un terminal en VS Code (CTRL + Ñ) o vuelva al terminal anteriormente abierto, y ejecutar el comando:
```Bash
npm run test:cov
```

![](./img/20-13.png)

15. Si las pruebas se ejecutaron correctamente debera aparcer un resultado similar al siguiente:
```Bash
Test Suites: 1 passed, 1 total
Tests:       7 passed, 7 tota
```

![](./img/20-14.png)

16. En el terminal, ejecutar el siguiente comando para generar el diagrama de clases respectivo.
```Bash
tsuml2 --glob "./libs/**/*.ts" --outMermaidDsl "./class_diagram.md"
```

![](./img/20-15.png)

17. En el VS Code, modificar el archivo class_diagram.md y adicionar \```mermaid al inicio del archivo y al final adicionar \```

![](./img/20-16.png)

18. En el terminal, ejecutar el siguiente comando para generar la documentación del proyecto, esta se creara en la carpeta documentation
```Bash
npx @compodoc/compodoc -p tsconfig.json -s
```

![](./img/20-17.png)

---
## Actividades Encargadas
1. Completar la documentación de todas las clases, metodos, propiedades y generar una automatizaciòn .github/workflows/publish_docs.yml (Github Workflow) utilizando compodoc y publicar el site de documentaciòn generado en Github Pages.

![](./img/actionpublish.png)

2. Generar una automatización de nombre .github/workflows/package_npm.yml (Github Workflow) que ejecute:
   * Pruebas unitarias y reporte de pruebas automatizadas
   * Realice el analisis con SonarCloud.
   * Contruya los paquetes con nombre notifications_[apellido] y customer-app_[apellido] y lo publique en Github Packages

![](./img/actionpackage.png)

3. Generar una automatización de nombre .github/workflows/release_version.yml (Github Workflow) que contruya la version (release) del paquete y publique en Github Releases.


![](./img/actionrelease.png)