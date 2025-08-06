import { useState, useEffect, useRef } from "react";
import questions from "./questions";
import { intermediateText1, introText } from "./Text";
import AudioSphereVisualizer from "../AudioSphereVisualizer/AudioSphereVisualizer";
import Button from "../Button/Button";
import RegistrationForm from "../Form/RegistrationForm";
import Loading from "../Loading/Loading";
import useTypedText from "../../hooks/useTypedText";
import { audioFiles } from "../../../public/audio/audioFiles";
import "./Main.scss";

function Main() {
  const [step, setStep] = useState(-3); // -3: старт, -2: промежуточный, >=0: вопросы
  const [showAnswers, setShowAnswers] = useState(false);
  const [volume, setVolume] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [typingStarted, setTypingStarted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const audioRef = useRef(null);

  const textToDisplay =
    step === -2 ? intermediateText1 : questions[step]?.question || "";

  const [typedText, isTypingDone] = useTypedText(
    textToDisplay,
    70,
    typingStarted
  );

  useEffect(() => {
    if (step >= questions.length || step === -3) return;

    const audioUrl = audioFiles[step];
    if (!audioUrl) return;

    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.addEventListener("loadedmetadata", () => {
      audio.play();

      const context = new AudioContext();
      const source = context.createMediaElementSource(audio);
      const analyser = context.createAnalyser();
      source.connect(analyser);
      analyser.connect(context.destination);

      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
        setVolume(average);
        requestAnimationFrame(updateVolume);
      };

      updateVolume();
      setTypingStarted(true); // ⏱ Начать печать синхронно со звуком
    });

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [step]);

  useEffect(() => {
    if (step >= 0) {
      setShowAnswers(false);
      const timeout = setTimeout(() => {
        setShowAnswers(true);
      }, textToDisplay.length * 70 + 500);
      return () => clearTimeout(timeout);
    }
  }, [step, textToDisplay]);

  const handleStart = () => {
    setStep(-2);
    setTypingStarted(true);
  };
  const handleIntermediateNext = () => {
    setTypingStarted(false);
    if (step === -2) {
      setStep(0); // сразу к вопросам
    }
  };

 const handleAnswer = (answer) => {
  setUserAnswers((prev) => [...prev, answer]);

  if (step === questions.length - 1) {
    setIsFormVisible(true);
  } else if (step === 1) {
    setIsLoading(true);
    setShowAnswers(false);
    setTimeout(() => {
      setIsLoading(false);
      setStep((prev) => prev + 1);
    }, 3000);
  } else {
    setStep((prev) => prev + 1);
  }
};

  useEffect(() => {
    if (!isFormVisible) return;

    const audio = new Audio("./audio/FinalText.mp3");
    audioRef.current = audio;

    audio.addEventListener("loadedmetadata", () => {
      audio.play();

      const context = new AudioContext();
      const source = context.createMediaElementSource(audio);
      const analyser = context.createAnalyser();
      source.connect(analyser);
      analyser.connect(context.destination);

      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
        setVolume(average);
        requestAnimationFrame(updateVolume);
      };

      updateVolume();
    });

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [isFormVisible]);

  return (
    <main className="main">
      <AudioSphereVisualizer audioLevel={volume} />

      {isFormVisible ? (
        <RegistrationForm userAnswers={userAnswers} />
      ) : step === -3 ? (
        <div className="intro-screen">
          <h1 className="intro-title">
            {introText.split("\n").map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </h1>
          <Button type="button" onClick={handleStart}>НАЧАТЬ</Button>
        </div>
      ) : (
        <>
          <div className="question-box">
            <h2>{typedText}</h2>

            {step < 0 && isTypingDone && (
              <Button  onClick={handleIntermediateNext}>Продолжить</Button>
            )}

            {step >= 0 && (
              <>
                {isLoading ? (
                  <Loading />
                ) : (
                  showAnswers && (
                    <div className="answers">
                      {questions[step].answers.map((text, i) => (
                        <Button type="button" key={i} onClick={() => handleAnswer(text)}>
                          {text}
                        </Button>
                      ))}
                    </div>
                  )
                )}
              </>
            )}
          </div>

          {step >= 0 && (
            <div className="progress-bar">
              {questions.map((_, i) => (
                <div className="progress-item" key={i}>
                  <div className={`line ${i < step ? "filled" : ""}`}></div>
                  <span className="label">{i + 1}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default Main;
