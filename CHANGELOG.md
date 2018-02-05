# 0.4.0 / 2018-02-05

* [new] Support more customizing options:

```jsx
<MessengerCustomerChat
  pageId="<PAGE_ID>"
  appId="<APP_ID>"
  htmlRef="<REF_STRING>"
  themeColor="<HEX_COLOR_CODE>"
  loggedInGreeting="<GREETING_MESSAGE_FOR_LOGGED_IN_USERS>"
  loggedOutGreeting="<GREETING_MESSAGE_FOR_LOGGED_OUT_USERS>"
/>
```

# 0.3.0 / 2017-12-06

* [fix] Rename `ref` to `htmlRef` to fix prop key collision with React
* [fix] Unknown prop issue before React v16

# 0.2.1 / 2017-12-01

* [new] Added `debug` prop to enter debug mode (load debug fbsdk)

# 0.2.0 / 2017-12-01

* [fix] Removed unused state & props
