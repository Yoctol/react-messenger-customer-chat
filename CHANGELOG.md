# 0.8.0 / 2020-06-28

- [fix] Hide messenger chat on component unmount.

# 0.7.2 / 2018-10-26

- [fix] Ensure the `className` is a string.

# 0.7.1 / 2018-10-05

- [fix] fix undefined className.

# 0.7.0 / 2018-09-16

* [new] use Customer Chat SDK internally.

# 0.6.2 / 2018-05-23

* [fix] Fix access parentNode from undefined

# 0.6.1 / 2018-05-15

* [fix] fix removing fbsdk error

# 0.6.0 / 2018-03-26

* [new] reload fbsdk when componentDidMount and props change #18

# 0.5.0 / 2018-03-23

* [new] Support more customizing options, `greetingDialogDisplay` and `greetingDialogDelay`:

```jsx
<MessengerCustomerChat
  pageId="<PAGE_ID>"
  appId="<APP_ID>"
  htmlRef="<REF_STRING>"
  greetingDialogDisplay="show"
  greetingDialogDelay={3}
/>
```

# 0.4.1 / 2018-03-14

* [fix] Fix passing `false` value to `minimized`.

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
