import QuestionCard from 'components/shared/QuestionCard/QuestionCard';
import Icon from 'components/shared/Icon/Icon';
import Button from 'components/shared/Button/Button';
import s from './Purchase.module.scss';

// Purchase Journey (TO DO)
const Purchase = () => {
  return (
    <div className="wmnds-grid wmnds-grid--spacing-md-2-md">
      <div className="wmnds-col-1-1 wmnds-col-md-2-3">
        <QuestionCard>
          <div className="wmnds-grid wmnds-grid--spacing-md-2-md">
            <div className="wmnds-col-2-3">
              <h2>
                Monthly Direct Debit nBus West Midlands
                <Icon iconName="modes-isolated-bus" className={`${s.modeIcon} ${s.bus}`} />
              </h2>
              <h3>£64.00 per month</h3>
            </div>
            <div className="wmnds-col-1-3">
              <a href="/" className="wmnds-btn wmnds-btn--secondary wmnds-col-1">
                Change your ticket
              </a>
            </div>
          </div>
        </QuestionCard>
      </div>
      <div className="wmnds-col-1-1 wmnds-col-md-1-3">
        <div className="bg-white wmnds-p-md">
          <h2>Buy online</h2>
          <Button
            text="Apply for Direct Debit"
            btnClass="wmnds-col-1"
            iconRight="general-chevron-right"
          />
        </div>
      </div>
    </div>
  );
};

export default Purchase;
