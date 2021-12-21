/* eslint-disable jsx-a11y/label-has-associated-control */
import dompurify from 'dompurify';

// Import contexts
import { useFormContext, TForm } from 'globalState';

import s from './Radio.module.scss';

const { sanitize } = dompurify;

export type RadioProps = TForm.QuestionOptions & {
  name: keyof TForm.TicketInfo;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Radio = ({ name, onChange, text, value, info }: RadioProps) => {
  const [formState] = useFormContext(); // Get the state/dispatch of form data from FormContext
  const defaultChecked = formState.ticketInfo[name];

  return (
    <>
      <label className={`${s.radioContainer} wmnds-fe-radios__container`}>
        <div className={s.text} dangerouslySetInnerHTML={{ __html: sanitize(text) }} />
        <input
          className={`${s.radio} wmnds-fe-radios__input`}
          value={value}
          name={name}
          type="radio"
          onChange={onChange}
          defaultChecked={defaultChecked === value}
        />
        {info && (
          <div
            className={`${s.insetText} wmnds-inset-text wmnds-m-t-xs`}
            dangerouslySetInnerHTML={{ __html: sanitize(info, { ADD_ATTR: ['target'] }) }}
          />
        )}
        <span className="wmnds-fe-radios__checkmark" />
      </label>
    </>
  );
};

export default Radio;
