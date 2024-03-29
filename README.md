# React Messenger Customer Chat

> React component for [Messenger customer chat plugin](https://developers.facebook.com/docs/messenger-platform/discovery/customer-chat-plugin)

[![npm](https://img.shields.io/npm/v/react-messenger-customer-chat.svg)](https://www.npmjs.com/package/react-messenger-customer-chat)
[![Build Status](https://travis-ci.org/Yoctol/react-messenger-customer-chat.svg?branch=master)](https://travis-ci.org/Yoctol/react-messenger-customer-chat)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Screenshots

![](https://user-images.githubusercontent.com/3382565/130329195-0aaee250-5500-413f-ba8b-a78cda9b6a7b.png)
![](https://user-images.githubusercontent.com/3382565/130329198-3e5b7bee-44c2-4bd8-befc-461a176cbf53.png)

## Prerequisite

Whitelist your domain to connect your Facebook Page to your website via the
Facebook tool.

- From UI: Facebook Page Settings > Messenger Platform > Whitelisted Domains
- From API: Use HTTP API or API client likes
  [messaging-api-messenger](https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#setwhitelisteddomainsdomains)

## Installation

```sh
$ npm install react-messenger-customer-chat
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
    htmlRef="<REF_STRING>"
  />,
  document.getElementById('demo'),
);
```

> Note: It will handle sdk initialize automatically for you. See more details in
> [Customer Chat Plugin official docs](https://developers.facebook.com/docs/messenger-platform/discovery/customer-chat-plugin) and [Customer Chat SDK official docs](https://developers.facebook.com/docs/messenger-platform/discovery/customer-chat-plugin/sdk).

## Props

```js
static propTypes = {
  pageId: PropTypes.string.isRequired,
  appId: PropTypes.string.isRequired,

  shouldShowDialog: PropTypes.bool,
  htmlRef: PropTypes.string,
  minimized: PropTypes.bool,
  themeColor: PropTypes.string,
  loggedInGreeting: PropTypes.string,
  loggedOutGreeting: PropTypes.string,
  greetingDialogDisplay: PropTypes.oneOf(['show', 'hide', 'fade']),
  greetingDialogDelay: PropTypes.number,
  autoLogAppEvents: PropTypes.bool,
  xfbml: PropTypes.bool,
  version: PropTypes.string,
  language: PropTypes.string,
  debug: PropTypes.bool,
  onCustomerChatDialogShow: PropTypes.func,
  onCustomerChatDialogHide: PropTypes.func,
};

static defaultProps = {
  shouldShowDialog: false,
  htmlRef: undefined,
  minimized: undefined,
  themeColor: undefined,
  loggedInGreeting: undefined,
  loggedOutGreeting: undefined,
  greetingDialogDisplay: undefined,
  greetingDialogDelay: undefined,
  autoLogAppEvents: true,
  xfbml: true,
  version: '2.11',
  language: 'en_US',
  debug: false,
  onCustomerChatDialogShow: undefined,
  onCustomerChatDialogHide: undefined,
};
```

## Next.js/SSR

To make `<MessengerComponent />` work with Server-Side Rendering (SSR), you need to avoid rendering it on the server:

```js
{
  typeof window !== 'undefiend' && (
    <MessengerComponent
      pageId="<PAGE_ID>"
      appId="<APP_ID>"
      htmlRef="<REF_STRING>"
    />
  );
}
```

## [Troubleshooting Tips](https://developers.facebook.com/docs/messenger-platform/discovery/facebook-chat-plugin?locale=en_US#debug-tips)

If you're having trouble getting the plugin to render properly, try the tips below:

- If you see a console error like "Refused to display **_ in a frame because an ancestor violates the following Content Security Policy directive: _**", check that the domain of the page the plugin is being rendered on has been whitelisted. Also make sure you didn't set the `Referrer-Policy header` to `no-referrer`.
- The Firefox Facebook Container Add-On prevents the plugin from showing up. Remove the add on if you want the plugin to render.
- Firefox desktop private browsers (version 63 and above) and Firefox mobile browsers block content tracking by default which will prevent the plugin from rendering. Turn off content blocking (click the gray shield in the search bar) to see the plugin render.

## Related

- [react-messenger-checkbox](https://github.com/Yoctol/react-messenger-checkbox) - React component for messenger checkbox plugin.
- [react-messenger-message-us](https://github.com/Yoctol/react-messenger-message-us) - React component for messenger message us plugin.
- [react-messenger-send-to-messenger](https://github.com/Yoctol/react-messenger-send-to-messenger) - React component for messenger send to messenger plugin.
- [messaging-api-messenger](https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger) - Messaging APIs for Messenger.
- [bottender](https://github.com/Yoctol/bottender) - Make Bots in Your Way, Fast and Flexibly.

## License

MIT © [Yoctol](https://github.com/Yoctol/react-messenger-customer-chat)
