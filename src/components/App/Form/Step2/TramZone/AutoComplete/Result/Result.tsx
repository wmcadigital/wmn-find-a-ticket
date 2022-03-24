import React, { useContext } from 'react';
// Import contexts
import { AutoCompleteContext } from '../AutoCompleteContext';

const Result = ({ recommendedOption }: { recommendedOption: { text: string } }) => {
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const { selectedStations } = autoCompleteState;

  // Get selected stations that have an id
  const stations = selectedStations.filter((item: any) => item.id !== null);

  const zones = [...stations.map((stn: any) => stn.metroZone)];
  const minZone = Math.min(...zones);

  interface IStations {
    id: string;
    stationName: string;
    metroZone: number;
    metroZoneSecond: number;
  }
  return (
    <>
      {stations.length > 0 && (
        <div className="wmnds-m-b-lg wmnds-inset-text">
          {stations.map(({ id, stationName, metroZone, metroZoneSecond }: IStations, i: number) => (
            <p
              key={id}
              className={stations.length === i + 1 && stations.length === 1 ? 'wmnds-m-b-none' : ''}
            >
              {stationName} is{' '}
              {metroZone < 5 && (
                <>
                  in
                  <strong>
                    &nbsp;Zone&nbsp;
                    {metroZone}
                    {metroZoneSecond && <>&nbsp;&amp; {metroZoneSecond}</>}
                  </strong>
                </>
              )}
              .
            </p>
          ))}
          {stations.length > 1 && (
            <>
              <p className={minZone >= 2 ? '' : 'wmnds-m-b-none'}>
                To travel between these stations, you&rsquo;ll need a{' '}
                <strong>{recommendedOption && recommendedOption.text.toLowerCase()}</strong> ticket.
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Result;
