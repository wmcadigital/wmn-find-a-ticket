import React from 'react';
import Icon from 'components/shared/Icon/Icon';

import s from './CloseButton.module.scss';

const CloseButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button type="button" className={s.closeButton} onClick={onClick}>
      <Icon iconName="general-cross" className={`general-cross ${s.closeIcon}`} title="Close" />
    </button>
  );
};

export default CloseButton;
