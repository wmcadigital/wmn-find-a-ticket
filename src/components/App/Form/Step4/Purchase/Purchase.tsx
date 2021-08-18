import Button from 'components/shared/Button/Button';
import { Ticket } from 'components/App/Form/types/Tickets.types';

const Purchase = ({ ticket }: { ticket: Ticket }) => {
  console.log(ticket);
  return (
    <div className="wmnds-col-1 wmnds-col-md-1-3">
      <div className="bg-white wmnds-p-md">
        <h2>Buy online</h2>
        <p>You can add this ticket to your Swift photocard online.</p>
        <p>The next part of the process takes around 10 minutes. </p>
        <Button
          text="Apply for Direct Debit"
          btnClass="wmnds-col-1"
          iconRight="general-chevron-right"
        />
      </div>
    </div>
  );
};

export default Purchase;
