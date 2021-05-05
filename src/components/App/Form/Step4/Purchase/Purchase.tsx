import dompurify from 'dompurify';
import { useFormContext } from 'globalState';
import QuestionCard from 'components/shared/QuestionCard/QuestionCard';
import Icon from 'components/shared/Icon/Icon';
import Button from 'components/shared/Button/Button';
// import { useFormContext } from 'globalState';
import { getSearchParam } from 'globalState/helpers/URLSearchParams';
import s from './Purchase.module.scss';
import useTicketingAPI from '../../customHooks/useTicketingAPI';
import { TApiTicket } from './Puchase.types';

const { sanitize } = dompurify;

// Purchase Journey (TO DO)
const Purchase = () => {
  const [, formDispatch] = useFormContext();

  const { results } = useTicketingAPI(`/ticketing/v2/tickets/${getSearchParam('ticketId')}`, true);
  const ticket: TApiTicket = results.data;
  // eslint-disable-next-line no-console
  console.log(ticket);

  const editStep = () => {
    formDispatch({
      type: 'UPDATE_STEP',
      payload: 3,
    });
    formDispatch({
      type: 'EDIT_MODE',
      payload: 'ticketDuration',
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

  const getModeIcons = (ticketData: any): string[] => {
    const icons = [];
    if (ticketData?.allowBus) icons.push('bus');
    if (ticketData?.allowTrain) icons.push('train');
    if (ticketData?.allowMetro) icons.push('metro');
    return icons;
  };

  return (
    <div className="wmnds-grid wmnds-grid--spacing-md-2-md">
      <div className="wmnds-col-1-1 wmnds-col-md-2-3">
        <QuestionCard>
          <div className="wmnds-grid wmnds-grid--spacing-md-2-md">
            <div className="wmnds-col-2-3">
              {ticket && Object.entries(ticket).length && (
                <>
                  <h2 className={s.heading}>{ticket.name}</h2>
                  <div className={s.icons}>
                    {getModeIcons(ticket).map((mode: any) => (
                      <Icon
                        key={`icon-${mode}`}
                        iconName={`modes-isolated-${iconText(mode)}`}
                        className={`${s.modeIcon} ${s[mode]}`}
                      />
                    ))}
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: sanitize(ticket.description) }} />
                  <div dangerouslySetInnerHTML={{ __html: sanitize(ticket.summary) }} />
                </>
              )}
              <h3>£64.00 per month</h3>
            </div>
            <div className="wmnds-col-1-3">
              <Button
                text="Change your ticket"
                onClick={editStep}
                btnClass="wmnds-btn wmnds-btn--secondary wmnds-col-1"
              />
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
