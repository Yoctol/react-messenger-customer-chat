import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MessengerCustomerChat extends Component {
  static propTypes = {
    pageId: PropTypes.string.isRequired,
    appId: PropTypes.string.isRequired,

    shouldShowPlugin: PropTypes.bool,
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
    onCustomerChatShow: PropTypes.func,
    onCustomerChatHide: PropTypes.func,
    onCustomerChatDialogShow: PropTypes.func,
    onCustomerChatDialogHide: PropTypes.func,
  };

  static defaultProps = {
    shouldShowPlugin: true,
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
    onCustomerChatShow: undefined,
    onCustomerChatHide: undefined,
    onCustomerChatDialogShow: undefined,
    onCustomerChatDialogHide: undefined,
  };

  state = {
    fbLoaded: false,
  };

  componentDidMount() {
    this.setFbAsyncInit();
    this.reloadSDKAsynchronously();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.pageId !== this.props.pageId ||
      prevProps.appId !== this.props.appId ||
      prevProps.shouldShowPlugin !== this.props.shouldShowPlugin ||
      prevProps.shouldShowDialog !== this.props.shouldShowDialog ||
      prevProps.htmlRef !== this.props.htmlRef ||
      prevProps.minimized !== this.props.minimized ||
      prevProps.themeColor !== this.props.themeColor ||
      prevProps.loggedInGreeting !== this.props.loggedInGreeting ||
      prevProps.loggedOutGreeting !== this.props.loggedOutGreeting ||
      prevProps.greetingDialogDisplay !== this.props.greetingDialogDisplay ||
      prevProps.greetingDialogDelay !== this.props.greetingDialogDelay ||
      prevProps.autoLogAppEvents !== this.props.autoLogAppEvents ||
      prevProps.xfbml !== this.props.xfbml ||
      prevProps.version !== this.props.version ||
      prevProps.language !== this.props.language ||
      prevProps.debug !== this.props.debug
    ) {
      this.setFbAsyncInit();
      this.reloadSDKAsynchronously();
    }
  }

  setFbAsyncInit() {
    const { appId, autoLogAppEvents, xfbml, version } = this.props;

    window.fbAsyncInit = () => {
      window.FB.init({
        appId,
        autoLogAppEvents,
        xfbml,
        version: `v${version}`,
      });

      this.setState({ fbLoaded: true });
    };
  }

  loadSDKAsynchronously() {
    const { language, debug } = this.props;
    /* eslint-disable */
    (function(d, s, ids) {
      var js, customerChatJs;
      if (d.getElementById(ids[0]) && d.getElementById(ids[1])) {
        return;
      }
      js = d.createElement(s);
      customerChatJs = d.createElement(s);
      js.id = ids[0];
      customerChatJs.id = ids[1];
      js.src = `https://connect.facebook.net/${language}/sdk${
        debug ? '/debug' : ''
      }.js`;
      customerChatJs.src =
        '//connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
      d.body.prepend(js);
      d.body.prepend(customerChatJs);
    })(document, 'script', ['facebook-jssdk', 'facebook-customer-chat-sdk']);
    /* eslint-enable */
  }

  removeFacebookSDK() {
    const removeElementByIds = ids => {
      ids.forEach(id => {
        const element = document.getElementById(id);
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
    };

    removeElementByIds(['facebook-jssdk', 'fb-root']);

    delete window.FB;
  }

  reloadSDKAsynchronously() {
    this.removeFacebookSDK();
    this.loadSDKAsynchronously();
  }

  controlsPlugin() {
    const { shouldShowPlugin, shouldShowDialog } = this.props;

    window.FB.CustomerChat.show(shouldShowPlugin);

    if (shouldShowDialog) {
      window.FB.CustomerChat.showDialog();
    } else {
      window.FB.CustomerChat.hideDialog();
    }
  }

  subscribeEvents() {
    const {
      onCustomerChatShow,
      onCustomerChatHide,
      onCustomerChatDialogShow,
      onCustomerChatDialogHide,
    } = this.props;

    if (onCustomerChatShow) {
      window.FB.Event.subscribe('customerchat.show', onCustomerChatShow);
    }
    if (onCustomerChatHide) {
      window.FB.Event.subscribe('customerchat.hide', onCustomerChatHide);
    }
    if (onCustomerChatDialogShow) {
      window.FB.Event.subscribe(
        'customerchat.dialogShow',
        onCustomerChatDialogShow
      );
    }
    if (onCustomerChatDialogHide) {
      window.FB.Event.subscribe(
        'customerchat.dialogHide',
        onCustomerChatDialogHide
      );
    }
  }

  createMarkup() {
    const {
      pageId,
      htmlRef,
      minimized,
      themeColor,
      loggedInGreeting,
      loggedOutGreeting,
      greetingDialogDisplay,
      greetingDialogDelay,
    } = this.props;

    const refAttribute = htmlRef !== undefined ? `ref="${htmlRef}"` : '';
    const minimizedAttribute =
      minimized !== undefined ? `minimized="${minimized}"` : '';
    const themeColorAttribute =
      themeColor !== undefined ? `theme_color="${themeColor}"` : '';
    const loggedInGreetingAttribute =
      loggedInGreeting !== undefined
        ? `logged_in_greeting="${loggedInGreeting}"`
        : '';
    const loggedOutGreetingAttribute =
      loggedOutGreeting !== undefined
        ? `logged_out_greeting="${loggedOutGreeting}"`
        : '';
    const greetingDialogDisplayAttribute =
      greetingDialogDisplay !== undefined
        ? `greeting_dialog_display="${greetingDialogDisplay}"`
        : '';
    const greetingDialogDelayAttribute =
      greetingDialogDelay !== undefined
        ? `greeting_dialog_delay="${greetingDialogDelay}"`
        : '';

    return {
      __html: `<div
        class="fb-customerchat"
        page_id="${pageId}"
        ${refAttribute}
        ${minimizedAttribute}
        ${themeColorAttribute}
        ${loggedInGreetingAttribute}
        ${loggedOutGreetingAttribute}
        ${greetingDialogDisplayAttribute}
        ${greetingDialogDelayAttribute}
      ></div>`,
    };
  }

  render() {
    const { fbLoaded } = this.state;

    if (fbLoaded) {
      this.controlsPlugin();
      this.subscribeEvents();
    }
    // Add a random key to rerender. Reference:
    // https://stackoverflow.com/questions/30242530/dangerouslysetinnerhtml-doesnt-update-during-render
    return <div key={Date()} dangerouslySetInnerHTML={this.createMarkup()} />;
  }
}
