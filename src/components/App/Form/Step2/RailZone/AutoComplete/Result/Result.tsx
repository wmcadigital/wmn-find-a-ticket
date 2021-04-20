import React, { useContext } from 'react';
// Import contexts
import { AutoCompleteContext } from '../AutoCompleteContext';

const Result = () => {
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const { selectedStations } = autoCompleteState;

  // Get selected stations that have an id
  const stations = selectedStations.filter((item: any) => item.id !== null);

  const zones = [...stations.map((stn: any) => stn.railZone)];
  const minZone = Math.min(...zones);
  const maxZone = Math.max(...zones);

  interface IStations {
    id: string;
    stationName: string;
    railZone: number;
  }

  return (
    <>
      {stations.length > 0 && (
        <div className="wmnds-m-b-lg wmnds-inset-text">
          {stations.map(({ id, stationName, railZone }: IStations, i: number) => (
            <p
              key={id}
              className={stations.length === i + 1 && stations.length === 1 ? 'wmnds-m-b-none' : ''}
            >
              {stationName} is{' '}
              {railZone < 6 && (
                <>
                  in <strong>Zone {railZone}</strong>
                </>
              )}
              {railZone === 6 && (
                <>
                  in <strong>nTrain Zone 5</strong>
                </>
              )}
              {railZone === 7 && <strong>Out of County</strong>}.
            </p>
          ))}
          {stations.length > 1 && (
            <>
              <p className={minZone >= 2 ? '' : 'wmnds-m-b-none'}>
                To travel between these stations, you&rsquo;ll need a{' '}
                <strong>zone 1 to {maxZone > 5 ? 5 : maxZone}</strong> ticket.
              </p>
              {minZone >= 2 && (
                <p className="wmnds-m-b-none">
                  If you do not need to travel through Birmingham City Centre, you can get a{' '}
                  <strong>zone 2 to 5</strong> ticket.
                </p>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Result;
