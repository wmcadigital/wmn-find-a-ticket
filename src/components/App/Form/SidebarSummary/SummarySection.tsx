import React from 'react';
import Button from '../../../shared/Button/Button';
import s from './SidebarSummary.module.scss';

const SummarySection = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className={s.summary}>
      <div className="wmnds-grid wmnds-grid--justify-between wmnds-m-b-xsm">
        <strong className="wmnds-col-2-3">{title}</strong>
        <div className="wmnds-col-1-3 wmnds-text-align-right">
          <Button text="Change" btnClass="wmnds-btn--link" />
        </div>
      </div>
      <div>{value}</div>
    </div>
  );
};

export default SummarySection;
