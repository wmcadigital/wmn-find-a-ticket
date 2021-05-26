import Button from 'components/shared/Button/Button';
import s from './SidebarSummary.module.scss';

type SummarySectionProps = {
  title: string;
  value: React.ReactNode;
  onChange?: () => void;
  disabled?: boolean;
};

const SummarySection = ({ title, value, onChange, disabled }: SummarySectionProps) => {
  return (
    <div className={s.summary}>
      <div className="wmnds-grid wmnds-grid--justify-between wmnds-m-b-xsm">
        <strong className="wmnds-col-2-3">{title}</strong>
        {onChange && (
          <div className="wmnds-col-1-3 wmnds-text-align-right">
            <Button
              text="Change"
              onClick={onChange}
              disabled={disabled}
              btnClass={`wmnds-btn--link ${disabled ? s.disabledBtn : ''}`}
            />
          </div>
        )}
      </div>
      <div>{value}</div>
    </div>
  );
};

export default SummarySection;
