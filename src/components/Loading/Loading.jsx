import "./Loading.scss"

function Loading() {
  return (
    <div className="loading-wrapper">
                    <p className="loading-text">
                      Идет расчет
                      <div className="loading-animation">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                      </div>
                    </p>
                  </div>
  )
}

export default Loading