const Loader = ({ text }: { text?: string }) => {
  return (
    <div className="wmnds-col-1">
      <div className="wmnds-loader" role="alert" aria-live="assertive">
        <p className="wmnds-loader__content">Content is loading...</p>
      </div>
      {text && <p className="h4 wmnds-text-align-center">{text}</p>}
    </div>
  );
};

export default Loader;
