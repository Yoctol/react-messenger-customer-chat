# React Facebook Customer Chat

> React component for facebook customer chat plugin

## Installation

```sh
npm install react-facebook-customer-chat
```

## Usage

```js
import React from 'react';
import ReactDOM from 'react-dom';
import FacebookCustomerChat from 'react-facebook-customer-chat';

ReactDOM.render(
  <FacebookCustomerChat
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

MIT © [Yoctol](https://github.com/Yoctol/react-facebook-customer-chat)
