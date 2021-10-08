import { Ticket } from 'components/App/Form/types/Tickets.types';
import Icon from 'components/shared/Icon/Icon';
import Accordion from 'components/shared/Accordion/Accordion';
import s from './Purchase.module.scss';

const Purchase = ({ ticket, paymentDirectives }: { ticket: Ticket; paymentDirectives: any }) => {
  const buttonLink = () => {
    let linkToShow = ticket.buyTicketUrl;
    const replaceLink = (url: string) =>
      url.replace(
        'https://natex-ssp.unicard-uk.com/ssp/swift/',
        'https://my.swiftcard.org.uk/ssp/swift/',
      );
    // More Information - no online buy link
    const showMoreInfo = !ticket.buyTicketUrl && !ticket.isPayAsYouGo && !ticket.swiftCurrentAmount;

    // Buy Swift PAYG credit - if product is swift payg or ticket can only be brought on swift payg
    const swiftPAYG = ticket.isPayAsYouGo && ticket.swiftCurrentAmount && ticket.id !== 811;

    // Buy on Google Pay - if product can be brought on GPay
    const gPay = ticket.validityId === 45093000 && ticket.purchaseLocations.swiftOnMobile;

    // Buy button (buy button for all other tickets apart from swift payg)
    const buyButton = !ticket.isPayAsYouGo && ticket.swiftCurrentAmount;

    const getInTouch = ticket.purchaseLocations.tic && !ticket.hasOnlinePurchaseChannel;

    if (gPay || swiftPAYG) {
      linkToShow = ticket.buyTicketUrl;
    }
    if (buyButton) {
      linkToShow =
        'https://my.swiftcard.org.uk/ssp/swift/dnr_importBasket.jsp?[{matrixId:%27AAC001%27}]';
    }
    if (getInTouch) {
      linkToShow = 'https://www.wmnetwork.co.uk/get-in-touch/travel-centres/';
    }
    if (showMoreInfo) {
      return null;
    }
    return replaceLink(linkToShow);
  };

  const buttonText = () => {
    if (ticket.buyOnDirectDebit) {
      return 'Apply for Direct Debit';
    }
    if (ticket.buyOnSwift || ticket.swiftCurrentAmount) {
      return 'Buy on Swift';
    }
    if (ticket.hasOnlinePurchaseChannel) {
      return 'Buy now';
    }
    if (ticket.purchaseLocations.tic) {
      return 'Buy at travel centre';
    }
    return 'Buy now';
  };

  const groupedDirectives = paymentDirectives.reduce((arr: any, dir: any) => {
    const array = arr;
    array[dir.category] = [...(arr[dir.category] || []), dir];
    return array;
  }, {});
  console.log(groupedDirectives);

  const inPerson =
    groupedDirectives.Tram?.length > 0 ||
    groupedDirectives.Payzone?.length > 0 ||
    groupedDirectives['On-bus']?.length > 0 ||
    groupedDirectives['Train station']?.length > 0 ||
    groupedDirectives['Travel centre']?.length > 0 ||
    groupedDirectives['Travel centre - No National Express']?.length > 0;
  const inApp = groupedDirectives['Swift go']?.length > 0;

  return (
    <div className="wmnds-col-1 wmnds-col-md-1-3">
      {buttonLink() && (
        <div className="bg-white wmnds-p-md wmnds-m-b-md">
          <h2>Buy online</h2>
          {groupedDirectives['Direct Debit'] &&
            groupedDirectives['Direct Debit'].map((directive: any) => (
              <p key={directive.id}>{directive.description}</p>
            ))}
          {groupedDirectives['Swift go'] &&
            groupedDirectives['Swift go'].map((directive: any) => (
              <p key={directive.id}>{directive.description}</p>
            ))}
          <a href={buttonLink()!} className="wmnds-btn wmnds-btn--align-left wmnds-col-1">
            {buttonText()}{' '}
            <Icon
              iconName="general-chevron-right"
              className="wmnds-btn__icon wmnds-btn__icon--right"
            />
          </a>
        </div>
      )}
      {inApp && (
        <div className="bg-white wmnds-p-md wmnds-m-b-md">
          <h2>Buy through the app</h2>
          <div className={s.accordionContainer}>
            {groupedDirectives['Swift go'] && (
              <Accordion id="swiftAppAccordion" title="Swift app" info="£64.00 per month">
                {groupedDirectives['Swift go'].map((directive: any) => (
                  <p key={directive.id}>{directive.description}</p>
                ))}
              </Accordion>
            )}
          </div>
        </div>
      )}
      {inPerson && (
        <div className="bg-white wmnds-p-md wmnds-m-b-md">
          <h2>Buy in person</h2>
          <div className={s.accordionContainer}>
            {groupedDirectives['Train station'] && (
              <Accordion id="swiftAppAccordion" title="Train station" info="£64.00 per month">
                {groupedDirectives['Train station'].map((directive: any) => (
                  <p key={directive.id}>{directive.description}</p>
                ))}
              </Accordion>
            )}
            {groupedDirectives['Travel centre - No National Express'] && (
              <Accordion id="travelNoNXAccordion" title="Travel centre" info="£64.00 per month">
                {groupedDirectives['Travel centre - No National Express'].map((directive: any) => (
                  <p key={directive.id}>{directive.description}</p>
                ))}
              </Accordion>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Purchase;
