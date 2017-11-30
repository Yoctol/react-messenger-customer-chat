# React Messenger Customer Chat

> React component for messenger customer chat plugin

## Installation

```sh
npm install react-messenger-customer-chat
```

## Usage

```js
import React from 'react';
import ReactDOM from 'react-dom';
import MessengerCustomerChat from 'react-messenger-customer-chat';

ReactDOM.render(
  <MessengerCustomerChat
    pageId="<PAGE_ID>"
    appId="<APP_ID>"
    autoLoad={true}
    ref="<OPTIONAL_WEBHOOK_PARAM>"
    minimized={true}
  />,
  document.getElementById('demo')
);
```

## License

MIT © [Yoctol](https://github.com/Yoctol/react-messenger-customer-chat)
