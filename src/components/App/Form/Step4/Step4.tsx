/* eslint-disable prettier/prettier */
import { Helmet } from 'react-helmet';
import { useFormContext } from 'globalState';
import QuestionCard from 'components/shared/QuestionCard/QuestionCard';
import Icon from 'components/shared/Icon/Icon';
import { ReplaceTextWithIcon } from 'components/shared/Icon/NIcon';
import Button from 'components/shared/Button/Button';
import s from './Step4.module.scss';
import { Ticket } from '../types/Tickets.types';
import createLdJson from './helpers/createLdJson';
import useConvertDescription from './customHooks/useConvertDescription';
import Purchase from './Purchase/Purchase';

// Purchase Journey (TO DO)
const Step4 = () => {
  const [formState, formDispatch] = useFormContext();
  const { convertDescription } = useConvertDescription();

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

  const getValidityInfo = (text: string) => {
    switch (text) {
      case '1':
        return '1 day';
      case '7':
        return '1 week';
      case '14':
        return '14 days';
      case '28':
        return '28 days';
      case '30':
      case '31':
        return '1 month';
      case '91':
        return '13 weeks';
      case '115':
      case '122':
        return '1 term';
      case '244':
        return '2 terms';
      case '344':
      case '365':
        return '52 weeks';
      default:
        return text;
    }
  };

  const directives: any = {};
  const paymentDirectives: any = [];
  if (ticket && ticket.directives) {
    ticket.directives.forEach((directive) => {
      const qualifier = directive.qualifier.length ? directive.qualifier : null;
      const { category } = directive;
      if (qualifier) {
        if (directives[qualifier]) {
          directives[qualifier] = [...directives[qualifier], directive];
        } else {
          directives[qualifier] = [directive];
        }
      } else if (directive.category === 'Swift card') {
        if (directives[category]) {
          directives[category] = [...directives[category], directive];
        } else {
          directives[category] = [directive];
        }
      } else {
        paymentDirectives.push(directive);
      }
    });
  }

  return (
    <div className="wmnds-grid wmnds-grid--spacing-md-2-md">
      {ticket ? (
        <>
          <Helmet>
            <title>Find a ticket - {ticket.name}</title>
            <script type="application/ld+json">{JSON.stringify(createLdJson(ticket))}</script>
          </Helmet>
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
                        <a href="/" className="wmnds-btn wmnds-btn--secondary wmnds-col-1">
                          Change your ticket
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="h3 wmnds-m-t-none wmnds-m-b-lg">
                    £{ticket.ticketCurrentAmount?.toFixed(2)} for{' '}
                    {getValidityInfo(ticket.validity).toLowerCase()}
                  </p>
                  {directives['You can'] && (
                    <div className="wmnds-ticket-summary-msg wmnds-ticket-summary-msg--you-can wmnds-m-b-md">
                      <div className="wmnds-ticket-summary-msg__header">
                        <Icon
                          iconName="general-checkmark"
                          className="wmnds-ticket-summary-msg__icon"
                        />
                        <h3 className="wmnds-ticket-summary-msg__title">You can</h3>
                      </div>
                      <div className="wmnds-ticket-summary-msg__info">
                        <ul className="wmnds-ticket-summary-msg__list">
                          {directives['You can'].map((directive: any) => (
                            <li key={directive.id}>
                              <ReplaceTextWithIcon
                                htmlElement={convertDescription(directive.description, ticket)}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  {directives["You can't"] && (
                    <div className="wmnds-ticket-summary-msg wmnds-ticket-summary-msg--you-cannot wmnds-m-b-md">
                      <div className="wmnds-ticket-summary-msg__header">
                        <Icon iconName="general-cross" className="wmnds-ticket-summary-msg__icon" />
                        <h3 className="wmnds-ticket-summary-msg__title">You can&rsquo;t</h3>
                      </div>
                      <div className="wmnds-ticket-summary-msg__info">
                        <ul className="wmnds-ticket-summary-msg__list">
                          {directives["You can't"].map((directive: any) => (
                            <li key={directive.id}>
                              <ReplaceTextWithIcon
                                htmlElement={convertDescription(directive.description, ticket)}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  {directives['You must'] && (
                    <div className="wmnds-ticket-summary-msg wmnds-ticket-summary-msg--you-must wmnds-m-b-md">
                      <div className="wmnds-ticket-summary-msg__header">
                        <Icon
                          iconName="general-warning-circle"
                          className="wmnds-ticket-summary-msg__icon"
                        />
                        <h3 className="wmnds-ticket-summary-msg__title">You must</h3>
                      </div>
                      <div className="wmnds-ticket-summary-msg__info">
                        <ul className="wmnds-ticket-summary-msg__list">
                          {directives['You must'].map((directive: any) => (
                            <li key={directive.id}>
                              <ReplaceTextWithIcon
                                htmlElement={convertDescription(directive.description, ticket)}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  {directives['Swift card'] && (
                    <div className="wmnds-ticket-summary-msg wmnds-ticket-summary-msg--swift wmnds-m-b-md">
                      <div className="wmnds-ticket-summary-msg__header">
                        <Icon
                          iconName="swift-full-logo"
                          className="wmnds-ticket-summary-msg__icon"
                        />
                        <h3 className="wmnds-ticket-summary-msg__title">photocard</h3>
                      </div>
                      <div className="wmnds-ticket-summary-msg__info">
                        <ul className="wmnds-ticket-summary-msg__list">
                          {directives['Swift card'].map((directive: any) => (
                            <li key={directive.id}>
                              <ReplaceTextWithIcon
                                htmlElement={convertDescription(directive.description, ticket)}
                              />
                            </li>
                          ))}
                        </ul>
                        <a
                          href="https://www.tfwm.org.uk/terms-and-conditions/swift-card/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Read the full terms and conditions
                        </a>
                      </div>
                    </div>
                  )}
                </>
              )}
            </QuestionCard>
          </div>
          <Purchase ticket={ticket} paymentDirectives={paymentDirectives} />
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

export default Step4;
