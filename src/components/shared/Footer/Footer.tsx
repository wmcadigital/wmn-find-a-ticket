import Icon from 'components/shared/Icon/Icon';

const Footer = () => {
  return (
    <footer className="wmnds-footer wmnds-footer--v2">
      <div className="wmnds-container wmnds-grid">
        <div className="wmnds-col-1 wmnds-col-lg-1-3 wmnds-footer__updates-col">
          <h3 className="wmnds-footer__heading">Stay up to date</h3>
          <p>
            Don’t miss out on vital information, subscribe today and be in the know at all times.
          </p>
          <a
            href="https://confirmsubscription.com/h/d/3D13A23E4E88FD0D"
            className="wmnds-btn wmnds-footer__btn wmnds-footer__btn--block"
          >
            Sign up to updates
          </a>
        </div>
        <div className="wmnds-col-1 wmnds-col-lg-1-3">
          <h3 className="wmnds-footer__heading">Social media</h3>
          <ul className="wmnds-footer__social-media">
            <li>
              <a href="https://www.facebook.com/westmidlandsnetwork/" title="Facebook">
                <Icon iconName="social-facebook" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/WMNetwork" title="Twitter">
                <Icon iconName="social-twitter" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/wmnetwork/" title="Instagram">
                <Icon iconName="social-instagram" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="wmnds-container">
        <div className="wmnds-footer__bottom wmnds-grid">
          <div className="wmnds-col-1 wmnds-col-md-1-2">
            <p className="wmnds-footer__copyright">&copy; West Midlands Combined Authority 2021</p>
          </div>
          <div className="wmnds-col-1 wmnds-col-md-1-2">
            <ul className="wmnds-footer__bottom-menu">
              <li>
                <a
                  className="wmnds-footer__link"
                  href="//www.wmnetwork.co.uk/privacy-cookies-policy/"
                  title="Privacy and cookies policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy &amp; Cookies Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
