// Import packages
import React from 'react';
import Icon from '../Icon/Icon';

interface ButtonProps {
  btnClass?: string;
  disabled?: boolean;
  iconLeft?: string;
  iconRight?: string;
  isActive?: boolean;
  isFetching?: boolean;
  onClick?: () => void;
  text?: string;
  title?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button = ({
  btnClass,
  disabled,
  iconLeft,
  iconRight,
  isActive,
  isFetching,
  onClick,
  text,
  title,
  type,
}: ButtonProps) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      title={title}
      className={`wmnds-btn ${btnClass} ${isActive ? 'wmnds-is--active' : ''} ${
        disabled ? 'wmnds-btn--disabled' : ''
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {/* If icon left is set then call icon component and inject correct svg */}
      {iconLeft ? <Icon className="wmnds-btn__icon" iconName={iconLeft} /> : null}

      {/* button text will go here, if any */}
      {text}

      {/* If API is fetching show spinner on button */}
      {isFetching ? (
        <div
          className="wmnds-loader wmnds-loader--btn wmnds-btn__icon wmnds-btn__icon--right"
          role="alert"
          aria-live="assertive"
        >
          <p className="wmnds-loader__content">Content is loading...</p>
        </div>
      ) : (
        /* If icon right is set then call icon component and inject correct svg */
        iconRight && (
          <Icon className="wmnds-btn__icon wmnds-btn__icon--right" iconName={iconRight} />
        )
      )}
    </button>
  );
};

Button.defaultProps = {
  btnClass: '',
  disabled: false,
  iconLeft: null,
  iconRight: null,
  isActive: false,
  isFetching: false,
  onClick: null,
  text: null,
  title: null,
  type: 'button',
};

export default Button;
