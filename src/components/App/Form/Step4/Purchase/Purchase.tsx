import dompurify from 'dompurify';
import { useFormContext } from 'globalState';
import QuestionCard from 'components/shared/QuestionCard/QuestionCard';
import Icon from 'components/shared/Icon/Icon';
import { ReplaceTextWithIcon } from 'components/shared/Icon/NIcon';
import Button from 'components/shared/Button/Button';
import s from './Purchase.module.scss';
import { Ticket } from '../../types/Tickets.types';

const { sanitize } = dompurify;

// Purchase Journey (TO DO)
const Purchase = () => {
  const [formState, formDispatch] = useFormContext();

  const ticket: Ticket | null =
    formState.apiResults?.find((t) => formState.ticketId === `${t.id}`) || null;

  const editStep = () => {
    formDispatch({
      type: 'UPDATE_STEP',
      payload: 3,
    });
    formDispatch({
      type: 'EDIT_MODE',
      payload: 'ticketDuration',
    });
    formDispatch({
      type: 'REMOVE_TICKET_INFO',
      payload: { name: 'ticketDuration' },
    });
    formDispatch({
      type: 'UPDATE_TICKET_ID',
      payload: null,
    });
    window.scrollTo(0, 0);
  };

  const iconText = (mode: string) => {
    let icon = mode;
    if (mode === 'tram') {
      icon = 'metro';
    } else if (mode === 'train') {
      icon = 'rail';
    }
    return icon;
  };

  const getModeIcons = (ticketData: Ticket): string[] => {
    const icons = [];
    if (ticketData?.allowBus) icons.push('bus');
    if (ticketData?.allowTrain) icons.push('train');
    if (ticketData?.allowMetro) icons.push('metro');
    return icons;
  };

  return (
    <div className="wmnds-grid wmnds-grid--spacing-md-2-md">
      {ticket ? (
        <>
          <div className="wmnds-col-1-1 wmnds-col-md-2-3">
            <QuestionCard>
              <div className="wmnds-grid wmnds-grid--spacing-md-2-md">
                <div className="wmnds-col-2-3">
                  {ticket && Object.entries(ticket).length > 0 && (
                    <>
                      <h2 className={s.heading}>
                        <ReplaceTextWithIcon htmlElement={ticket.name} />
                      </h2>
                      <div className={s.icons}>
                        {getModeIcons(ticket).map((mode: any) => (
                          <Icon
                            key={`icon-${mode}`}
                            iconName={`modes-isolated-${iconText(mode)}`}
                            className={`${s.modeIcon} ${s[mode]}`}
                          />
                        ))}
                      </div>
                      <ReplaceTextWithIcon htmlElement={ticket.description} />
                      <div
                        dangerouslySetInnerHTML={{
                          __html: sanitize(ticket.description),
                        }}
                      />
                      <div dangerouslySetInnerHTML={{ __html: sanitize(ticket.summary) }} />
                    </>
                  )}
                  <h3>
                    £{ticket.ticketCurrentAmount?.toFixed(2)} for {ticket.validity}
                  </h3>
                </div>
                <div className="wmnds-col-1-3">
                  {!formState.skippedToResult ? (
                    <Button
                      text="Change your ticket"
                      onClick={editStep}
                      btnClass="wmnds-btn--secondary wmnds-col-1"
                    />
                  ) : (
                    <a href="/" className="wmnds-btn wmnds-btn--secondary wmnds-col-1">
                      Change your ticket
                    </a>
                  )}
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
        </>
      ) : (
        <div className="wmnds-col-1-1 wmnds-col-md-2-3">
          <QuestionCard>
            <h2>No ticket found</h2>
            <a href="/">Start a new search</a>
          </QuestionCard>
        </div>
      )}
    </div>
  );
};

export default Purchase;
