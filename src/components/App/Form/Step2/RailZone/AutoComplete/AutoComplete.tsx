import { useContext } from 'react';
import { useFormContext } from 'globalState';
// Import components
import Button from 'components/shared/Button/Button';
// Import context
import { AutoCompleteContext } from './AutoCompleteContext';
import Result from './Result/Result';
import TrainAutoComplete from './TrainAutoComplete/TrainAutocomplete';
import s from './AutoComplete.module.scss';

const AutoComplete = () => {
  const [{ selectedStations }, autoCompleteDispatch] = useContext(AutoCompleteContext);
  const addStation = () => {
    autoCompleteDispatch({ type: 'ADD_STATION' });
  };
  const [, formDispatch] = useFormContext();

  const selectedStationIds = [...selectedStations.map((stn: any) => stn.id)];

  let linkParams = '';
  selectedStationIds.forEach((id, i) => {
    if (id) {
      linkParams += `&selectedStation${i}=${id}`;
    }
  });

  const findRailZones = (url: string) => {
    formDispatch({
      type: 'REMOVE_TICKET_INFO',
      payload: { name: 'railZones' },
    });
    window.location.href = url;
  };
  return (
    <>
      <div className={`${s.traySearchContainer}`}>
        <div className="wmnds-m-b-md">
          <TrainAutoComplete label="From:" id="autocomplete_from" queryId={0} />
        </div>
        <div className="wmnds-m-b-md">
          <TrainAutoComplete label="To:" id="autocomplete_to" queryId={1} />
        </div>
        {selectedStations.length > 2 && (
          <div className="wmnds-p-b-md">
            <div className={`wmnds-inset-text wmnds-m-b-sm wmnds-p-r-none ${s.addStation}`}>
              <div className="wmnds-fe-label">Add another train station you travel to</div>
              {selectedStations.slice(2).map((_station: any, i: number) => (
                <TrainAutoComplete
                  id={`autocomplete_add${i + 2}`}
                  key={`autocomplete_add${i + 2}`}
                  queryId={i + 2}
                />
              ))}
            </div>
          </div>
        )}
        <Button
          btnClass={`wmnds-btn--primary wmnds-m-b-lg ${s.addBtn}`}
          iconRight="general-expand"
          text="Add another station"
          onClick={addStation}
          disabled={selectedStations.length >= 12}
        />
      </div>
      <Result />
      <div className="wmnds-grid wmnds-grid--spacing-md-2-md">
        <div className="wmnds-col-1 wmnds-col-md-1-2">
          <Button
            btnClass={`wmnds-btn--link ${s.btnLinkIconLeft}`}
            text="View rail zones on a map"
            iconLeft="general-location-pin"
            onClick={() =>
              findRailZones(`https://find-rail-zones.tfwm.org.uk/?ticketSearch=true${linkParams}`)
            }
          />
        </div>
        <div className="wmnds-col-1 wmnds-col-md-1-2">
          <Button
            btnClass={`wmnds-btn--link ${s.btnLinkIconLeft}`}
            text="View rail zones in a list"
            iconLeft="general-list"
            onClick={() =>
              findRailZones(
                `https://find-rail-zones.tfwm.org.uk/?ticketSearch=true${linkParams}&mapView=false`,
              )
            }
          />
        </div>
      </div>
    </>
  );
};

export default AutoComplete;
