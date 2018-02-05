import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MessengerCustomerChat from '../MessengerCustomerChat';

Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
  MessengerCustomerChat.prototype.loadSdkAsynchronously = jest.fn();
});

describe('<MessengerCustomerChat />', () => {
  it('render page_id to DOM element', () => {
    const wrapper = mount(
      <MessengerCustomerChat pageId="<PAGE_ID>" appId="<APP_ID>" />
    );
    expect(
      wrapper
        .render()
        .find('.fb-customerchat')
        .prop('page_id')
    ).toBe('<PAGE_ID>');
  });

  it('render no ref to DOM element', () => {
    const wrapper = mount(
      <MessengerCustomerChat pageId="<PAGE_ID>" appId="<APP_ID>" />
    );
    expect(
      wrapper
        .render()
        .find('.fb-customerchat')
        .prop('ref')
    ).toBeUndefined();
  });

  it('render htmlRef as ref to DOM element', () => {
    const wrapper = mount(
      <MessengerCustomerChat
        pageId="<PAGE_ID>"
        appId="<APP_ID>"
        htmlRef="<REF>"
      />
    );
    expect(
      wrapper
        .render()
        .find('.fb-customerchat')
        .prop('ref')
    ).toBe('<REF>');
  });

  it('render minimized to DOM element', () => {
    const wrapper = mount(
      <MessengerCustomerChat pageId="<PAGE_ID>" appId="<APP_ID>" minimized />
    );
    expect(
      wrapper
        .render()
        .find('.fb-customerchat')
        .prop('minimized')
    ).toBe('true');
  });

  it('render theme_color, logged_in_greeting and logged_out_greeting to DOM element', () => {
    const wrapper = mount(
      <MessengerCustomerChat
        pageId="<PAGE_ID>"
        appId="<APP_ID>"
        minimized
        themeColor="#0084FF"
        loggedInGreeting="this is a logged_in_greeting"
        loggedOutGreeting="this is a logged_out_greeting"
      />
    );

    expect(
      wrapper
        .render()
        .find('.fb-customerchat')
        .prop('theme_color')
    ).toBe('#0084FF');
    expect(
      wrapper
        .render()
        .find('.fb-customerchat')
        .prop('logged_in_greeting')
    ).toBe('this is a logged_in_greeting');
    expect(
      wrapper
        .render()
        .find('.fb-customerchat')
        .prop('logged_out_greeting')
    ).toBe('this is a logged_out_greeting');
  });

  it('define fbAsyncInit and call loadSdkAsynchronously when facebook-jssdk does not exist', () => {
    mount(<MessengerCustomerChat pageId="<PAGE_ID>" appId="<APP_ID>" />);

    expect(global.fbAsyncInit).toBeDefined();
    expect(MessengerCustomerChat.prototype.loadSdkAsynchronously).toBeCalled();
  });

  it('should not call loadSdkAsynchronously when facebook-jssdk exists', () => {
    const div = global.document.createElement('div');
    div.id = 'facebook-jssdk';
    global.document.body.appendChild(div);

    mount(<MessengerCustomerChat pageId="<PAGE_ID>" appId="<APP_ID>" />);

    expect(
      MessengerCustomerChat.prototype.loadSdkAsynchronously
    ).not.toBeCalled();
  });

  it('define fbAsyncInit and call loadSdkAsynchronously when facebook-jssdk does not exist', () => {
    global.FB = {
      init: jest.fn(),
    };

    mount(
      <MessengerCustomerChat
        pageId="<PAGE_ID>"
        appId="<APP_ID>"
        autoLogAppEvents
        xfbml
        version="2.11"
      />
    );

    global.fbAsyncInit();

    expect(global.FB.init).toBeCalledWith({
      appId: '<APP_ID>',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v2.11',
    });
  });
});
