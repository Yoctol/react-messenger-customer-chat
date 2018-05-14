import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MessengerCustomerChat from '../MessengerCustomerChat';

Enzyme.configure({ adapter: new Adapter() });

function render(element) {
  const customerchat = mount(element)
    .render()
    .find('.fb-customerchat');

  return {
    customerchat,
  };
}

beforeEach(() => {
  MessengerCustomerChat.prototype.loadSDKAsynchronously = jest.fn();
  document.getElementById = jest.fn(() => ({
    parentNode: {
      removeChild: jest.fn(),
    },
  }));
});

describe('<MessengerCustomerChat />', () => {
  it('render page_id to DOM element', () => {
    const { customerchat } = render(
      <MessengerCustomerChat pageId="<PAGE_ID>" appId="<APP_ID>" />
    );
    expect(customerchat.prop('page_id')).toBe('<PAGE_ID>');
  });

  it('render no ref to DOM element', () => {
    const { customerchat } = render(
      <MessengerCustomerChat pageId="<PAGE_ID>" appId="<APP_ID>" />
    );
    expect(customerchat.prop('ref')).toBeUndefined();
  });

  it('render htmlRef as ref to DOM element', () => {
    const { customerchat } = render(
      <MessengerCustomerChat
        pageId="<PAGE_ID>"
        appId="<APP_ID>"
        htmlRef="<REF>"
      />
    );
    expect(customerchat.prop('ref')).toBe('<REF>');
  });

  it('render minimized to DOM element', () => {
    const { customerchat } = render(
      <MessengerCustomerChat
        pageId="<PAGE_ID>"
        appId="<APP_ID>"
        minimized={false}
      />
    );
    expect(customerchat.prop('minimized')).toBe('false');
  });

  it('render theme_color, logged_in_greeting and logged_out_greeting to DOM element', () => {
    const { customerchat } = render(
      <MessengerCustomerChat
        pageId="<PAGE_ID>"
        appId="<APP_ID>"
        minimized
        themeColor="#0084FF"
        loggedInGreeting="this is a logged_in_greeting"
        loggedOutGreeting="this is a logged_out_greeting"
      />
    );

    expect(customerchat.prop('theme_color')).toBe('#0084FF');
    expect(customerchat.prop('logged_in_greeting')).toBe(
      'this is a logged_in_greeting'
    );
    expect(customerchat.prop('logged_out_greeting')).toBe(
      'this is a logged_out_greeting'
    );
  });

  it('render greeting_dialog_display and greeting_dialog_delay to DOM element', () => {
    const { customerchat } = render(
      <MessengerCustomerChat
        pageId="<PAGE_ID>"
        appId="<APP_ID>"
        greetingDialogDisplay="show"
        greetingDialogDelay={3}
      />
    );

    expect(customerchat.prop('greeting_dialog_display')).toBe('show');
    expect(customerchat.prop('greeting_dialog_delay')).toBe('3');
  });

  it('define fbAsyncInit and call loadSDKAsynchronously', () => {
    mount(<MessengerCustomerChat pageId="<PAGE_ID>" appId="<APP_ID>" />);

    expect(global.fbAsyncInit).toBeDefined();
    expect(MessengerCustomerChat.prototype.loadSDKAsynchronously).toBeCalled();
  });

  it('define fbAsyncInit and call loadSDKAsynchronously when facebook-jssdk does not exist', () => {
    mount(
      <MessengerCustomerChat
        pageId="<PAGE_ID>"
        appId="<APP_ID>"
        autoLogAppEvents
        xfbml
        version="2.11"
      />
    );

    global.FB = {
      init: jest.fn(),
      Event: {
        subscribe: jest.fn(),
      },
      CustomerChat: {
        show: jest.fn(),
        showDialog: jest.fn(),
        hideDialog: jest.fn(),
      },
    };

    global.fbAsyncInit();

    expect(global.FB.init).toBeCalledWith({
      appId: '<APP_ID>',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v2.11',
    });
  });

  it('define event handlers props and call FB SDK', () => {
    const onCustomerChatShow = () => {};
    const onCustomerChatHide = () => {};
    const onCustomerChatDialogShow = () => {};
    const onCustomerChatDialogHide = () => {};

    mount(
      <MessengerCustomerChat
        pageId="<PAGE_ID>"
        appId="<APP_ID>"
        onCustomerChatShow={onCustomerChatShow}
        onCustomerChatHide={onCustomerChatHide}
        onCustomerChatDialogShow={onCustomerChatDialogShow}
        onCustomerChatDialogHide={onCustomerChatDialogHide}
      />
    );

    global.FB = {
      init: jest.fn(),
      Event: {
        subscribe: jest.fn(),
      },
      CustomerChat: {
        show: jest.fn(),
        showDialog: jest.fn(),
        hideDialog: jest.fn(),
      },
    };

    global.fbAsyncInit();

    expect(global.FB.Event.subscribe).toBeCalledWith(
      'customerchat.show',
      onCustomerChatShow
    );
    expect(global.FB.Event.subscribe).toBeCalledWith(
      'customerchat.hide',
      onCustomerChatHide
    );
    expect(global.FB.Event.subscribe).toBeCalledWith(
      'customerchat.dialogShow',
      onCustomerChatDialogShow
    );
    expect(global.FB.Event.subscribe).toBeCalledWith(
      'customerchat.dialogHide',
      onCustomerChatDialogHide
    );
  });
});
