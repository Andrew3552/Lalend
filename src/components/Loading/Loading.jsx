import "./Loading.scss";

function Loading() {
  return (
    <div className="loading-wrapper">
      <div className="loading-text">
        Идет расчет
        <div className="loading-animation">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </div>
  );
}

export default Loading;
