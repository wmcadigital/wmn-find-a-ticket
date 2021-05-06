import { useFormContext, TForm } from 'globalState';
import Icon from 'components/shared/Icon/Icon';
import questions from '../questions';
import SummarySection from './SummarySection';
import s from './SidebarSummary.module.scss';

// helpers
const capitalize = (str: string) => {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
};

const arrayToSentence = (array: string[]) => {
  let sentence: string;
  if (array.length > 2) {
    sentence = `${array.slice(0, array.length - 1).join(', ')} and ${array.slice(-1)}`;
  } else if (array.length === 2) {
    sentence = `${array[0]} and ${array[1]}`;
  } else {
    [sentence] = array;
  }
  return sentence;
};

const SidebarSummary = () => {
  const [formState, formDispatch] = useFormContext();
  const { ticketInfo } = formState;

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
        onChange={() => editStep(0, 'modes')}
      />
      {(ticketInfo.busCompany || ticketInfo.ticketType === 'nBus') && (
        <>
          <SummarySection
            title="Bus company"
            value={
              ticketInfo.busCompany ? getOptionText('busCompany', ticketInfo.busCompany) : 'nBus'
            }
            onChange={() => editStep(1, 'busCompany')}
          />
        </>
      )}
      {ticketInfo.traveller && (
        <>
          <SummarySection
            title="Traveller"
            value={getOptionText('traveller', ticketInfo.traveller)}
            onChange={() => editStep(1, 'traveller')}
          />
        </>
      )}
      {ticketInfo.busArea && (
        <>
          <SummarySection
            title="Bus area"
            value={ticketInfo.busArea}
            onChange={() => editStep(2, 'busArea')}
          />
        </>
      )}
      {ticketInfo.railZones && (
        <>
          <SummarySection
            title="Rail zones"
            value={<RailZoneSummary railZones={ticketInfo.railZones} />}
            onChange={() => editStep(2, 'railZones')}
          />
        </>
      )}
      {ticketInfo.travelTime && (
        <>
          <SummarySection
            title="Travel time"
            value={getOptionText('travelTime', ticketInfo.travelTime)}
            onChange={() => editStep(2, 'travelTime')}
          />
        </>
      )}
      {ticketInfo.firstClass && (
        <>
          <SummarySection
            title="First class"
            value={getOptionText('firstClass', ticketInfo.firstClass)}
            onChange={() => editStep(3, 'firstClass')}
          />
        </>
      )}
      {ticketInfo.ticketDuration && (
        <>
          <SummarySection
            title="Ticket duration"
            value={ticketInfo.ticketDuration}
            onChange={() => editStep(3, 'ticketDuration')}
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
          />
        </>
      )}
    </div>
  );
};

export default SidebarSummary;
