import { useFormContext } from 'globalState';
import s from './QuestionCard.module.scss';
import Button from '../Button/Button';

type QuestionCardProps = {
  children: React.ReactNode;
  handleContinue?: () => void;
  showChangeBtn?: boolean;
};

const ChangeAnswers = () => {
  const [, formDispatch] = useFormContext();
  const handleChange = () => {
    formDispatch({ type: 'TOGGLE_SHOW_ANSWERS', payload: true });
  };
  return (
    <Button
      btnClass="wmnds-col-1 wmnds-col-sm-auto wmnds-btn--secondary"
      text="Change my answers"
      onClick={handleChange}
    />
  );
};

const QuestionCard = ({ children, handleContinue, showChangeBtn }: QuestionCardProps) => {
  return (
    <div className={`${s.card} bg-white wmnds-m-b-lg`}>
      {children}
      {handleContinue && (
        <Button btnClass="wmnds-col-1 wmnds-col-sm-auto" text="Continue" onClick={handleContinue} />
      )}
      {showChangeBtn && (
        <div className="wmnds-hide-desktop wmnds-p-t-md">
          <ChangeAnswers />
        </div>
      )}
    </div>
  );
};

export { ChangeAnswers };

export default QuestionCard;
