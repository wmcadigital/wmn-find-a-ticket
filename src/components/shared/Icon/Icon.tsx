import React from 'react';

// Due to weird Protocol errors with external SVGs the svg use doesn't work well with production builds
// So we Ajax the SVG in with a snippet at the bottom of public/index.html

// Icons can be found at: https://designsystem.wmnetwork.co.uk/styles/icons/

interface IconProps {
  iconName: string;
  className?: string;
  title?: string;
}

const Icon = ({ className, iconName, title }: IconProps) => {
  return (
    <svg className={className}>
      {title && <title>{title}</title>}
      <use xlinkHref={`#wmnds-${iconName}`} href={`#wmnds-${iconName}`} />
    </svg>
  );
};

Icon.defaultProps = {
  className: null,
  title: null,
};

export default Icon;
