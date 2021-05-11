import { useEffect, useState } from 'react';
import { TForm, useFormContext } from 'globalState';
import Loader from 'components/shared/Loader/Loader';
import Dropdown from 'components/shared/Dropdown/Dropdown';
import Button from 'components/shared/Button/Button';
import Icon from 'components/shared/Icon/Icon';
import QuestionCard from 'components/shared/QuestionCard/QuestionCard';
import questions from '../../questions';
import useHandleChange from '../../customHooks/useHandleChange';
import useTicketingAPI from '../../customHooks/useTicketingAPI';
import useGetValidOperators from '../../customHooks/useGetValidOperators';
import { Operator } from '../../customHooks/Operator.types';

const BusCompanyStep2 = () => {
  const name = 'busCompany';
  const [formState, formDispatch] = useFormContext();
  const { handleChange, value, genericError, error, setError } = useHandleChange(name);
  const { getAPIResults, results, loading } = useTicketingAPI('/ticketing/v2/operators', true);
  const { question, hint } = questions[name] as typeof questions[typeof name];
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(null);

  const modesUrlString = (formState.ticketInfo as TForm.TicketInfo).modes.join('+');

  const validBusOperators = useGetValidOperators(formState.apiResults);

  useEffect(() => {
    if (!results.length && !formState.operators.length) {
      getAPIResults();
    }
    if (results.length && !formState.operators.length) {
      const payload = results.filter((operator) => operator.type === 'Bus Operator');
      payload.sort((a, b) => (a.name > b.name ? 1 : -1));
      formDispatch({ type: 'ADD_OPERATORS', payload });
    }
  }, [getAPIResults, results, formState.operators, formDispatch]);

  useEffect(() => {
    if (value) {
      setSelectedOperator(formState.operators.find((operator) => operator.id === value));
    } else {
      setSelectedOperator(null);
    }
  }, [value, formState.operators]);

  const handleContinue = (nBus?: boolean) => {
    if (selectedOperator) {
      const payload = nBus ? 'nBus' : selectedOperator.name;
      formDispatch({ type: 'EDIT_MODE', payload: null });
      formDispatch({ type: 'UPDATE_TICKET_INFO', payload: { name, value: payload } });
    } else {
      setError({ message: 'Please select an answer' });
    }
  };

  const isSupportedOperator = selectedOperator && validBusOperators.includes(selectedOperator.name);
  const isNBusOperator = selectedOperator && (isSupportedOperator || selectedOperator.acceptnBus);

  const operatorOptions = formState.operators.map((option) => ({
    text: option.name,
    value: `${option.id}`,
  }));

  return (
    <>
      {genericError}
      <QuestionCard>
        {loading ? (
          <div className="wmnds-p-lg">
            <Loader />
          </div>
        ) : (
          <>
            <Dropdown
              label={question}
              hint={hint}
              name={name}
              error={error}
              options={operatorOptions}
              onChange={handleChange}
            />

            {/* If there is a value selected and the value has busInfo */}
            {selectedOperator ? (
              <div className="wmnds-inset-text wmnds-m-t-md wmnds-m-b-lg">
                {isSupportedOperator ? (
                  <>
                    <p>You can buy {selectedOperator.name} tickets on our website. </p>
                    <p>{selectedOperator.name} are also part of the nBus ticket scheme.</p>
                    <p className="wmnds-m-none">
                      You can catch {selectedOperator.name} buses, as well as buses from all other
                      companies in the West Midlands Network with a nBus ticket.
                    </p>
                  </>
                ) : (
                  <>
                    {selectedOperator.acceptnBus && (
                      <>
                        <p>{selectedOperator.name} are part of the nBus ticket scheme.</p>
                        <p>
                          You can catch {selectedOperator.name} buses, as well as buses from all
                          other companies in the West Midlands Network with an nBus ticket.
                        </p>
                      </>
                    )}
                    <p className="wmnds-m-none">
                      If you want a ticket that only works on {selectedOperator.name} buses, you’ll
                      need to buy one {selectedOperator.website && 'from their website'}
                      {selectedOperator.buyOnboard && selectedOperator.website && ' or '}
                      {selectedOperator.buyOnboard && 'on the bus'}.
                    </p>
                  </>
                )}
              </div>
            ) : (
              <></>
            )}
            <div className="wmnds-p-b-lg">
              <a
                className="wmnds-link"
                href={`https://find-bus-company.wmnetwork.co.uk//?ticketSearch=true&modes=${modesUrlString}`}
              >
                I don&rsquo;t know the bus company I travel with
              </a>
            </div>
            <div>
              {selectedOperator ? (
                <>
                  {isNBusOperator && (
                    <div className="wmnds-col-3-5">
                      <Button
                        text={`Continue with a ${
                          isSupportedOperator ? selectedOperator.name : 'nBus'
                        } ticket`}
                        onClick={() => handleContinue(!isSupportedOperator)}
                        iconRight="general-chevron-right"
                        btnClass="wmnds-col-1"
                      />
                    </div>
                  )}
                  {isSupportedOperator ? (
                    <div className="wmnds-col-3-5 wmnds-m-t-md">
                      <Button
                        text="Continue with a nBus ticket"
                        onClick={() => handleContinue(true)}
                        iconRight="general-chevron-right"
                        btnClass="wmnds-col-1 wmnds-btn--secondary"
                      />
                    </div>
                  ) : (
                    <>
                      {/* If the operator is not in bBus scheme and has no website */}
                      {!isNBusOperator && !selectedOperator.website ? (
                        <div className="wmnds-col-3-5">
                          <a
                            href={`tel:${selectedOperator.telephone}`}
                            className="wmnds-btn wmnds-btn--secondary wmnds-col-1"
                          >
                            Call {selectedOperator.name}
                            <Icon
                              iconName="general-chevron-right"
                              className="wmnds-btn__icon wmnds-btn__icon--right"
                            />
                          </a>
                        </div>
                      ) : (
                        <div className="wmnds-col-3-5 wmnds-m-t-md">
                          {/* else show visit website button */}
                          <a
                            href={selectedOperator.website}
                            className="wmnds-btn wmnds-btn--secondary wmnds-col-1"
                          >
                            Visit the {selectedOperator.name} website
                            <Icon
                              iconName="general-chevron-right"
                              className="wmnds-btn__icon wmnds-btn__icon--right"
                            />
                          </a>
                        </div>
                      )}
                    </>
                  )}
                </>
              ) : (
                <div className="wmnds-col-3-5">
                  <Button text="Continue" onClick={handleContinue} />
                </div>
              )}
            </div>
          </>
        )}
      </QuestionCard>
    </>
  );
};

export default BusCompanyStep2;
