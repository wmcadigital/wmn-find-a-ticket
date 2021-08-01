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

  const userAgent = navigator.userAgent.toLowerCase();
  const isAndroid = userAgent.indexOf('android') > -1;

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
            <QuestionCard showChangeBtn={false}>
              {Object.entries(ticket).length > 0 && (
                <>
                  <div className={`wmnds-grid wmnds-grid--spacing-md-2-md ${s.ticketHeader}`}>
                    <h2 className={`wmnds-col-1 wmnds-col-md-2-3 ${s.heading}`}>
                      <ReplaceTextWithIcon htmlElement={ticket.name} />
                      <div className={s.icons}>
                        {getModeIcons(ticket).map((mode: any) => (
                          <Icon
                            key={`icon-${mode}`}
                            iconName={`modes-isolated-${iconText(mode)}`}
                            className={`${s.modeIcon} ${s[mode]}`}
                          />
                        ))}
                      </div>
                    </h2>
                    <div className="wmnds-col-1-2 wmnds-col-md-1-3 wmnds-m-b-sm">
                      {!formState.skippedToResult ? (
                        <Button
                          text="Change your ticket"
                          onClick={editStep}
                          btnClass="wmnds-btn--secondary wmnds-col-1"
                        />
                      ) : (
                        <a
                          href={`/${formState.isSwiftApp ? '?swiftApp=true' : ''}`}
                          className="wmnds-btn wmnds-btn--secondary wmnds-col-1"
                        >
                          Change your ticket
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="h3 wmnds-m-t-none wmnds-m-b-lg">
                    £{ticket.ticketCurrentAmount?.toFixed(2)} for {ticket.validity}
                  </p>
                  <div
                    className={`wmnds-ticket-summary-msg wmnds-ticket-summary-msg--you-can wmnds-m-b-md ${s.description}`}
                  >
                    <div className="wmnds-ticket-summary-msg__header">
                      <h3 className="wmnds-ticket-summary-msg__title">Summary</h3>
                    </div>
                    <div className="wmnds-ticket-summary-msg__info">
                      <div dangerouslySetInnerHTML={{ __html: sanitize(ticket.summary) }} />
                    </div>
                  </div>
                  <div
                    className={`wmnds-ticket-summary-msg wmnds-ticket-summary-msg--you-must ${s.description}`}
                  >
                    <div className="wmnds-ticket-summary-msg__header">
                      <h3 className="wmnds-ticket-summary-msg__title">Description</h3>
                    </div>
                    <div className="wmnds-ticket-summary-msg__info">
                      <ReplaceTextWithIcon htmlElement={ticket.description} />
                    </div>
                  </div>
                </>
              )}
            </QuestionCard>
          </div>
          <div className="wmnds-col-1 wmnds-col-md-1-3">
            <div className="bg-white wmnds-p-md">
              <h2>Buy online</h2>
              {isAndroid && formState.isSwiftApp ? (
                <a href="#0" className="wmnds-btn wmnds-col-1">
                  Buy on Google Pay
                  <Icon
                    className="wmnds-btn__icon wmnds-btn__icon--right"
                    iconName="general-chevron-right"
                  />
                </a>
              ) : (
                <a
                  href={ticket.buyTicketUrl ? ticket.buyTicketUrl : '#0'}
                  className="wmnds-btn wmnds-col-1"
                >
                  Apply for Direct Debit
                  <Icon
                    className="wmnds-btn__icon wmnds-btn__icon--right"
                    iconName="general-chevron-right"
                  />
                </a>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="wmnds-col-1 wmnds-col-md-2-3">
          <QuestionCard>
            <h2>Ticket not found</h2>
            <div className="wmnds-warning-text wmnds-m-b-md">
              <Icon iconName="general-warning-circle" className="wmnds-warning-text__icon" />
              Sorry, there were no results found for your search. <br />
              <a href="/">Start a new search</a>
            </div>
          </QuestionCard>
        </div>
      )}
    </div>
  );
};

export default Purchase;
