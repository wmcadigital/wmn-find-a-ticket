// Import global state
import { useFormContext, TForm } from 'globalState';
// Import helper fns
import arrayToSentence from 'components/App/Form/helpers/arrayToSentence';
// Import components
import Icon from 'components/shared/Icon/Icon';
import NIcon from 'components/shared/Icon/NIcon';
import questions from '../questions';
import SummarySection from './SummarySection';
import s from './SidebarSummary.module.scss';

// helpers
const capitalize = (str: string) => {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
};

const SidebarSummary = () => {
  const [formState, formDispatch] = useFormContext();
  const { ticketInfo, editMode } = formState;

  const capitalizedModes = ticketInfo.modes?.map((m) => capitalize(m!));

  const getOptionText = (key: TForm.QuestionKeys, val: string) => {
    const o = questions[key].options.find(
      (option: any) => option.value.toLowerCase() === val.toLowerCase(),
    );
    return o ? o.text : '';
  };

  const handleClose = () => {
    formDispatch({ type: 'TOGGLE_SHOW_ANSWERS', payload: false });
  };

  // Function for setting the step of the form
  const editStep = (step: number, page: TForm.Pages) => {
    formDispatch({
      type: 'UPDATE_STEP',
      payload: step,
    });
    formDispatch({
      type: 'EDIT_MODE',
      payload: page,
    });
    formDispatch({
      type: 'REMOVE_TICKET_INFO',
      payload: { name: 'ticketDuration' },
    });
    handleClose();
    window.scrollTo(0, 0);
  };

  const RailZoneSummary = ({ railZones }: { railZones: number[] }) => {
    return (
      <>
        {railZones.length > 1 ? (
          <p className="wmnds-m-b-md">
            Zones {Math.min(...railZones)}-{Math.max(...railZones)}
          </p>
        ) : (
          <p className="wmnds-m-b-md">Zone {railZones[0]}</p>
        )}
        {ticketInfo.stations && arrayToSentence(ticketInfo.stations?.split(','))}
      </>
    );
  };

  return (
    <div className={`${s.sidebarSummary} bg-white wmnds-p-md`}>
      <div className={`${s.mobileHeader} wmnds-hide-desktop wmnds-m-b-md wmnds-grid`}>
        <h3 className="wmnds-col-auto wmnds-m-none">Change my answers</h3>
        <button className={`${s.closeBtn} wmnds-col-auto`} type="button" onClick={handleClose}>
          <Icon iconName="general-cross" />
        </button>
      </div>
      <SummarySection
        title="Mode of travel"
        value={arrayToSentence(capitalizedModes!)}
        onChange={editMode !== 'modes' ? () => editStep(0, 'modes') : null}
      />
      {(ticketInfo.busCompany || ticketInfo.ticketType === 'nBus') && (
        <>
          <SummarySection
            title="Bus company"
            value={ticketInfo.busCompany ? ticketInfo.busCompany : <NIcon str="Bus" />}
            onChange={editMode !== 'busCompany' ? () => editStep(1, 'busCompany') : null}
          />
        </>
      )}
      {ticketInfo.traveller && (
        <>
          <SummarySection
            title="Traveller"
            value={getOptionText('traveller', ticketInfo.traveller)}
            onChange={editMode !== 'traveller' ? () => editStep(1, 'traveller') : null}
            disabled={!!formState.autoAnswered.traveller}
          />
        </>
      )}
      {ticketInfo.busArea && (
        <>
          <SummarySection
            title="Bus area"
            value={ticketInfo.busArea}
            onChange={editMode !== 'busArea' ? () => editStep(2, 'busArea') : null}
            disabled={!!formState.autoAnswered.busArea}
          />
        </>
      )}
      {ticketInfo.railZones && (
        <>
          <SummarySection
            title="Rail zones"
            value={<RailZoneSummary railZones={ticketInfo.railZones} />}
            onChange={editMode !== 'railZones' ? () => editStep(2, 'railZones') : null}
            disabled={!!formState.autoAnswered.railZones}
          />
        </>
      )}
      {ticketInfo.travelTime && ticketInfo.travelTime !== 'any' && (
        <>
          <SummarySection
            title="Travel time"
            value={getOptionText('travelTime', ticketInfo.travelTime)}
            onChange={editMode !== 'travelTime' ? () => editStep(2, 'travelTime') : null}
            disabled={!!formState.autoAnswered.travelTime}
          />
        </>
      )}
      {ticketInfo.firstClass && (
        <>
          <SummarySection
            title="First class"
            value={getOptionText('firstClass', ticketInfo.firstClass)}
            onChange={editMode !== 'firstClass' ? () => editStep(3, 'firstClass') : null}
            disabled={!!formState.autoAnswered.firstClass}
          />
        </>
      )}
      {ticketInfo.ticketDuration && (
        <>
          <SummarySection
            title="Ticket duration"
            value={ticketInfo.ticketDuration}
            onChange={editMode !== 'ticketDuration' ? () => editStep(3, 'ticketDuration') : null}
            disabled={!!formState.autoAnswered.ticketDuration}
          />
        </>
      )}
      {ticketInfo.isMultiDay && (
        <>
          <SummarySection
            title="Multi-day tickets"
            value={ticketInfo.isMultiDay}
            onChange={() =>
              formDispatch({ type: 'REMOVE_TICKET_INFO', payload: { name: 'isMultiDay' } })
            }
            disabled={!!formState.autoAnswered.isMultiDay}
          />
        </>
      )}
    </div>
  );
};

export default SidebarSummary;
