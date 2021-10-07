import { useState } from 'react';
import Icon from 'components/shared/Icon/Icon';
import s from './Accordion.module.scss';

const Accordion = ({
  id,
  title,
  info,
  children,
}: {
  id: string;
  title: string;
  info?: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`wmnds-accordion ${isOpen ? 'wmnds-is--open' : ''}`}>
      <button
        className={`${s.summary} wmnds-accordion__summary-wrapper`}
        type="button"
        aria-controls={id}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="wmnds-accordion__summary">
          <h4 className="wmnds-m-none">{title}</h4>
          <p className="wmnds-m-none">{info}</p>
        </div>
        <div className="wmnds-col-auto">
          <Icon
            iconName="general-chevron-right"
            className={`${s.icon} wmnds-accordion__icon ${isOpen ? s.iconActive : ''}`}
          />
        </div>
      </button>
      <div className="wmnds-accordion__content wmnds-p-t-xsm" id={id}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
