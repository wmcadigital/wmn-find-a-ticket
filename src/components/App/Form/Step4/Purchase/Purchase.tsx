import QuestionCard from 'components/shared/QuestionCard/QuestionCard';
import Icon from 'components/shared/Icon/Icon';
import Button from 'components/shared/Button/Button';
import { useFormContext } from 'globalState';
import s from './Purchase.module.scss';

// Purchase Journey (TO DO)
const Purchase = () => {
  const [formState] = useFormContext();
  const { ticketInfo } = formState;

  const iconText = (mode: string) => {
    let icon = mode;
    if (mode === 'tram') {
      icon = 'metro';
    } else if (mode === 'train') {
      icon = 'rail';
    }
    return icon;
  };
  return (
    <div className="wmnds-grid wmnds-grid--spacing-md-2-md">
      <div className="wmnds-col-1-1 wmnds-col-md-2-3">
        <QuestionCard>
          <div className="wmnds-grid wmnds-grid--spacing-md-2-md">
            <div className="wmnds-col-2-3">
              <h2 className={s.heading}>Monthly Direct Debit nBus West Midlands</h2>
              <div className={s.icons}>
                {ticketInfo.modes?.map((mode: any) => (
                  <Icon
                    key={`icon-${mode}`}
                    iconName={`modes-isolated-${iconText(mode)}`}
                    className={`${s.modeIcon} ${s[mode]}`}
                  />
                ))}
              </div>
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
