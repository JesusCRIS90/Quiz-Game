function ProgressBar({ info }) {
  return (
    <progress
      className="progress-bar"
      max={info.MaxValue}
      value={info.Value}
    ></progress>
  );
}

export default ProgressBar;
