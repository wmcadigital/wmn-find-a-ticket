import React, { useContext } from 'react';
// Import components
import Button from 'components/shared/Button/Button';
import Icon from 'components/shared/Icon/Icon';
// Import context
import { AutoCompleteContext } from './AutoCompleteContext';
import Result from './Result/Result';
import TrainAutoComplete from './TrainAutoComplete/TrainAutocomplete';
import s from './AutoComplete.module.scss';

const AutoComplete = () => {
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext);
  const { selectedStations } = autoCompleteState;

  const addStation = () => {
    autoCompleteDispatch({ type: 'ADD_STATION' });
  };

  const selectedStationIds = [...selectedStations.map((stn: any) => stn.id)];

  let linkParams = '';
  selectedStationIds.forEach((id, i) => {
    if (id) {
      linkParams += `&selectedStation${i}=${id}`;
    }
  });

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
              {selectedStations.slice(2).map((station: any, i: number) => (
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
          <a
            href={`https://deploy-preview-46--wmn-find-rail-zones.netlify.app/?ticketSearch=true${linkParams}`}
            className={`wmnds-btn--link ${s.btnLinkIconLeft}`}
          >
            <Icon className="wmnds-btn__icon" iconName="general-location-pin" />
            View rail zones on a map
          </a>
        </div>
        <div className="wmnds-col-1 wmnds-col-md-1-2">
          <a
            href={`https://deploy-preview-46--wmn-find-rail-zones.netlify.app/?ticketSearch=true${linkParams}&mapView=false`}
            className={`wmnds-btn--link ${s.btnLinkIconLeft}`}
          >
            <Icon className="wmnds-btn__icon" iconName="general-list" />
            View rail zones in a list
          </a>
        </div>
      </div>
    </>
  );
};

export default AutoComplete;
