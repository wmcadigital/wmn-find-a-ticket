const Header = () => {
  const { REACT_APP_TITLE } = process.env;
  return (
    <>
      <a
        href="#wmnds-main-content"
        title="Skip to main content"
        target="_self"
        className="wmnds-link wmnds-header__skip-link"
      >
        Skip to main content
      </a>
      <header>
        <div className="bg-white wmnds-p-t-md wmnds-p-b-md wmnds-cookies-banner">
          <div className="wmnds-container">
            <div className="wmnds-col-1 wmnds-col-md-3-4 wmnds-col-lg-2-3">
              <h3>Your privacy settings</h3>
              <p>
                We use cookies to help you with journey planning and relevant disruptions, remember
                your login and show you content you might be interested in. If you’re happy with the
                use of cookies by West Midlands Combined Authority and our selected partners, click
                ‘Accept all cookies’. Or click ‘Manage cookies’ to learn more.
              </p>
              <div className="wmnds-grid wmnds-grid--justify-between wmnds-cookies-banner__group-buttons">
                <button
                  className="
                  wmnds-btn wmnds-col-1 wmnds-col-sm-1 wmnds-col-md-12-24
                  wmnds-cookies-banner__accept-all-cookies
                "
                  type="button"
                >
                  Accept all cookies
                </button>
                <a
                  href="/patterns/cookies/#cookies_manager"
                  title="link title"
                  target="_self"
                  className="wmnds-btn wmnds-btn wmnds-col-1 wmnds-col-sm-1 wmnds-col-md-12-24"
                >
                  Manage Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="wmnds-header">
          <div className="wmnds-container wmnds-grid wmnds-grid--align-center wmnds-grid--justify-between">
            <div className="wmnds-header__vertical-align wmnds-col-auto">
              {/* Logo */}
              <a
                className="wmnds-header__logo-link"
                href="//wmnetwork.co.uk"
                title="West Midlands Network Design System"
              >
                <img
                  className="wmnds-header__logo"
                  alt="West Midlands Network logo"
                  src="//wmnetwork.netlify.com/img/logo.svg"
                />
              </a>
            </div>
            {/* Header title */}
            <span className="wmnds-header__title h1 wmnds-col-auto wmnds-m-none">
              <strong>{REACT_APP_TITLE}</strong>
            </span>
          </div>
        </div>
        <div className="wmnds-container">
          {/* feedback form */}
          <div className="wmnds-banner-container">
            <div className="wmnds-col-1">
              <div className="wmnds-banner-container__phase-wrapper">
                <span className="wmnds-phase-indicator"> Beta </span>
              </div>
              <p className="wmnds-banner-container__text">
                This is a new service - your
                <a href="#0" target="_blank" className="wmnds-link" rel="noopener noreferrer">
                  feedback
                </a>
                will help us to improve it.
              </p>
            </div>
          </div>
          {/* End feedback form */}
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="wmnds-breadcrumb">
            <ol className="wmnds-breadcrumb__list">
              <li className="wmnds-breadcrumb__list-item">
                <a href="//wmnetwork.co.uk" className="wmnds-breadcrumb__link">
                  Home
                </a>
              </li>
              <li className="wmnds-breadcrumb__list-item">
                <a
                  href="/"
                  className="wmnds-breadcrumb__link wmnds-breadcrumb__link--current"
                  aria-current="page"
                >
                  {REACT_APP_TITLE}
                </a>
              </li>
            </ol>
          </nav>
          {/* End Breadcrumbs */}
        </div>
      </header>
    </>
  );
};

export default Header;
