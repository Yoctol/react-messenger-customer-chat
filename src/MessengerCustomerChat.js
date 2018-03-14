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
    autoLogAppEvents: true,
    xfbml: true,
    version: '2.11',
    language: 'en_US',
    debug: false,
  };

  componentDidMount() {
    if (document.getElementById('facebook-jssdk')) {
      return;
    }
    this.setFbAsyncInit();
    this.loadSdkAsynchronously();
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

  loadSdkAsynchronously() {
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

  createMarkup() {
    const {
      pageId,
      htmlRef,
      minimized,
      themeColor,
      loggedInGreeting,
      loggedOutGreeting,
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

    return {
      __html: `<div
        class="fb-customerchat"
        page_id="${pageId}"
        ${refAttribute}
        ${minimizedAttribute}
        ${themeColorAttribute}
        ${loggedInGreetingAttribute}
        ${loggedOutGreetingAttribute}
      ></div>`,
    };
  }

  render() {
    return <div dangerouslySetInnerHTML={this.createMarkup()} />;
  }
}
