import { useFormContext } from 'globalState';

const NoResultsCard = ({
  title = 'We could not find any tickets',
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="wmnds-col-1">
      <div className="wmnds-p-lg bg-white wmnds-m-b-lg">
        <h2>{title}</h2>
        {children || (
          <>
            <p>
              You’ll need to change your traveller type or travel time to find tickets for your
              journey.
            </p>
            <p className="wmnds-m-b-none">
              If you need help finding a ticket, you can{' '}
              <a
                href="https://www.tfwm.org.uk/get-help/contact-us/"
                rel="noreferrer"
                target="_blank"
              >
                contact us
              </a>
              .
            </p>
          </>
        )}
      </div>
    </div>
  );
};

const NoResults = () => {
  const [{ ticketInfo }] = useFormContext();
  if (ticketInfo.traveller === 'concessionary' || ticketInfo.traveller === 'disabled') {
    return (
      <NoResultsCard title="Free travel in the West Midlands">
        <p>
          If you have a Disabled person’s pass or an Older person’s pass you can travel off-peak on
          the bus across the UK. You can also travel off-peak on the train and tram in the{' '}
          <a href="https://find-rail-zones.wmnetwork.co.uk/" rel="noreferrer" target="_blank">
            Transport for West Midlands area
          </a>
          .
        </p>
        <p>Off-peak times are:</p>
        <ul>
          <li>Between 9.30am and 11pm, Monday to Friday </li>
          <li>all day at weekends and on public holidays.</li>
        </ul>
        <p className="wmnds-m-none">
          You can find more information on travel times and eligibility criteria for a{' '}
          <a
            href="https://www.tfwm.org.uk/swift-and-tickets/discounts-and-free-travel-passes/get-a-disabled-person-s-pass/"
            rel="noreferrer"
            target="_blank"
          >
            Disabled person&rsquo;s pass
          </a>{' '}
          or{' '}
          <a
            href="https://www.tfwm.org.uk/swift-and-tickets/discounts-and-free-travel-passes/get-an-older-person-s-travel-pass/"
            rel="noreferrer"
            target="_blank"
          >
            Older person&rsquo;s pass
          </a>{' '}
          on our website.
        </p>
      </NoResultsCard>
    );
  }
  return <NoResultsCard />;
};

export default NoResults;
