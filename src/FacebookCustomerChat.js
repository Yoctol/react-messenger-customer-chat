import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FacebookCustomerChat extends Component {
  static propTypes = {
    pageId: PropTypes.string.isRequired,
    ref: PropTypes.string,
    minimized: PropTypes.bool,

    autoLoad: PropTypes.bool,
    appId: PropTypes.string.isRequired,
    autoLogAppEvents: PropTypes.bool,
    xfbml: PropTypes.bool,
    version: PropTypes.string,
    language: PropTypes.string,
  };

  static defaultProps = {
    autoLoad: false,
    autoLogAppEvents: true,
    xfbml: true,
    version: '2.11',
    language: 'en_US',
  };

  state = {
    isSdkLoaded: false,
  };

  componentDidMount() {
    this._isMounted = true;
    if (document.getElementById('facebook-jssdk')) {
      this.sdkLoaded();
      return;
    }
    this.setFbAsyncInit();
    this.loadSdkAsynchronously();
    let fbRoot = document.getElementById('fb-root');
    if (!fbRoot) {
      fbRoot = document.createElement('div');
      fbRoot.id = 'fb-root';
      document.body.appendChild(fbRoot);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setStateIfMounted(state) {
    if (this._isMounted) {
      this.setState(state);
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
      this.setStateIfMounted({ isSdkLoaded: true });
    };
  }

  sdkLoaded() {
    this.setState({ isSdkLoaded: true });
  }

  loadSdkAsynchronously() {
    const { language } = this.props;
    /* eslint-disable */
    (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = `https://connect.facebook.net/${language}/sdk.js`;
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
   /* eslint-enable */
  }

  render() {
    const options = {};
    if (this.props.ref !== undefined) {
      options.ref = this.props.ref;
    }

    if (this.props.minimized !== undefined) {
      options.minimized = this.props.minimized;
    }
    return (
      <div
        className="fb-customerchat"
        page_id={this.props.pageId}
        {...options}
      />
    );
  }
}
