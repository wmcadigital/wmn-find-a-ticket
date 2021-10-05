import { Ticket } from 'components/App/Form/types/Tickets.types';

const Purchase = ({ ticket, paymentDirectives }: { ticket: Ticket; paymentDirectives: any }) => {
  const buttonLink = () => {
    let linkToShow = ticket.buyTicketUrl;
    const replaceLink = (url: string) =>
      url.replace(
        'https://natex-ssp.unicard-uk.com/ssp/swift/',
        'https://my.swiftcard.org.uk/ssp/swift/',
      );
    // More Information - no online buy link
    const showMoreInfo = !ticket.buyTicketUrl && !ticket.isPayAsYouGo && ticket.swiftCurrentAmount;

    // Buy Swift PAYG credit - if product is swift payg or ticket can only be brought on swift payg
    const swiftPAYG = ticket.isPayAsYouGo && ticket.swiftCurrentAmount && ticket.id !== 811;

    // Buy on Google Pay - if product can be brought on GPay
    const gPay = ticket.validityId === 45093000 && ticket.purchaseLocations.swiftOnMobile;

    // Buy button (buy button for all other tickets apart from swift payg)
    const buyButton = !ticket.isPayAsYouGo && ticket.swiftCurrentAmount;

    const getInTouch = ticket.purchaseLocations.tic && !ticket.hasOnlinePurchaseChannel;

    if (gPay || swiftPAYG || buyButton) {
      linkToShow = ticket.buyTicketUrl;
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
    if (ticket.buyOnSwift) {
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

  return (
    <div className="wmnds-col-1 wmnds-col-md-1-3">
      <div className="bg-white wmnds-p-md">
        <h2>{buttonText()}</h2>
        {paymentDirectives.map((directive: any) => (
          <p key={directive.id}>{directive.description}</p>
        ))}
        {buttonLink() && (
          <a href={buttonLink()!} className="wmnds-btn wmnds-col-1">
            {buttonText()}
          </a>
        )}
      </div>
    </div>
  );
};

export default Purchase;
