import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MessengerCustomerChat extends Component {
  static propTypes = {
    pageId: PropTypes.string.isRequired,
    appId: PropTypes.string.isRequired,

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
  };

  static defaultProps = {
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
  };

  componentDidMount() {
    this.setFbAsyncInit();
    this.reloadSDKAsynchronously();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.pageId !== this.props.pageId ||
      prevProps.appId !== this.props.appId ||
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
    };
  }

  loadSDKAsynchronously() {
    const { language, debug } = this.props;
    /* eslint-disable */
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = `https://connect.facebook.net/${language}/sdk${
        debug ? '/debug' : ''
      }.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
    /* eslint-enable */
  }

  removeFacebookSDK() {
    const fbjssdk = document.getElementById('facebook-jssdk');
    if (fbjssdk && fbjssdk.parentNode) {
      fbjssdk.parentNode.removeChild(fbjssdk);
    }
    const fbroot = document.getElementById('fb-root');
    if (fbroot && fbroot.parentNode) {
      fbroot.parentNode.removeChild(fbroot);
    }
    delete window.FB;
  }

  reloadSDKAsynchronously() {
    this.removeFacebookSDK();
    this.loadSDKAsynchronously();
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
    // Add a random key to rerender. Reference:
    // https://stackoverflow.com/questions/30242530/dangerouslysetinnerhtml-doesnt-update-during-render
    return <div key={Date()} dangerouslySetInnerHTML={this.createMarkup()} />;
  }
}
