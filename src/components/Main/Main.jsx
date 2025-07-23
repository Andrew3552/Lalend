// import { useState, useEffect } from "react";
// import questions from "./questions";
// import { intermediateText1, intermediateText2, introText } from "./Text";
// import { fetchSpeech } from "../../api/elevenLabs";
// import AudioSphereVisualizer from "../AudioSphereVisualizer/AudioSphereVisualizer";
// import Button from "../Button/Button";
// import Loading from "../Loading/Loading";
// import "./Main.scss";

// function Main() {
//   const [step, setStep] = useState(-3); // -3: старт, -2/-1: промежуточные, >=0: вопросы
//   const [displayedText, setDisplayedText] = useState("");
//   const [showAnswers, setShowAnswers] = useState(false);
//   const [showSphere, setShowSphere] = useState(false);
//   const [volume, setVolume] = useState(0);
//   const [isTypingDone, setIsTypingDone] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (step >= questions.length || step === -3) return;

//     let textToSpeak =
//       step === -2
//         ? intermediateText1
//         : step === -1
//         ? intermediateText2
//         : questions[step].question;

//     let index = 0;
//     let interval;
//     let audio;

//     const startTyping = (duration) => {
//       const delay = duration / textToSpeak.length;

//       interval = setInterval(() => {
//         setDisplayedText((prev) => prev + (textToSpeak[index] || ""));
//         index++;
//         if (index >= textToSpeak.length) {
//           clearInterval(interval);
//           setIsTypingDone(true);
//           if (step >= 0) {
//             setTimeout(() => setShowAnswers(true), 500);
//           }
//         }
//       }, delay);
//     };

//     const speakAndType = async () => {
//       try {
//         const audioUrl = await fetchSpeech(textToSpeak);
//         audio = new Audio(audioUrl);

//         audio.addEventListener("loadedmetadata", () => {
//           startTyping(audio.duration * 1000);
//           audio.play();

//           const context = new AudioContext();
//           const source = context.createMediaElementSource(audio);
//           const analyser = context.createAnalyser();
//           source.connect(analyser);
//           analyser.connect(context.destination);

//           analyser.fftSize = 256;
//           const bufferLength = analyser.frequencyBinCount;
//           const dataArray = new Uint8Array(bufferLength);

//           const updateVolume = () => {
//             analyser.getByteFrequencyData(dataArray);
//             const average = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
//             setVolume(average);
//             requestAnimationFrame(updateVolume);
//           };

//           updateVolume();
//         });
//       } catch (err) {
//         console.error("Ошибка при получении аудио:", err);
//         startTyping(3000);
//       }
//     };

//     setDisplayedText("");
//     setShowAnswers(false);
//     setIsTypingDone(false);
//     speakAndType();

//     return () => {
//       clearInterval(interval);
//       if (audio) audio.pause();
//     };
//   }, [step]);

//   const handleStart = () => {
//     setShowSphere(true);
//     setStep(-2); // идём на первый промежуточный экран
//   };

//   const handleIntermediateNext = () => {
//     if (step === -2) {
//       setStep(-1); // второй промежуточный экран
//     } else if (step === -1) {
//       setStep(0); // к вопросам
//     }
//   };

//   const handleAnswer = () => {
//     if (step === 2) {
//       // Показать "расчёт"
//       setIsLoading(true);
//       setShowAnswers(false);

//       setTimeout(() => {
//         setIsLoading(false);
//         setStep((prev) => prev + 1);
//       }, 3000); // 3 секунды "загрузки"
//     } else {
//       setStep((prev) => prev + 1);
//     }
//   };

//   return (
//     <main className="main">
//       {step === -3 ? (
//         <div className="intro-screen">
//           <h1 className="intro-title">{introText}</h1>
//           <Button onClick={handleStart}>НАЧАТЬ</Button>
//         </div>
//       ) : (
//         <>
//           <div className="question-box">
//             {showSphere && <AudioSphereVisualizer audioLevel={volume} />}

//             {(step < 0 || step >= 0) && (
//               <>
//                 {step < 0 && <h1 className="intro-title">{introText}</h1>}
//                 <h2>{displayedText}</h2>
//               </>
//             )}

//             {step < 0 && isTypingDone && (
//               <Button onClick={handleIntermediateNext}>Продолжить</Button>
//             )}

//             {step >= 0 && (
//               <>
//                 {isLoading ? (
//                   <Loading />
//                 ) : (
//                   showAnswers && (
//                     <div className="answers">
//                       {questions[step].answers.map((text, i) => (
//                         <button key={i} onClick={handleAnswer}>
//                           {text}
//                         </button>
//                       ))}
//                     </div>
//                   )
//                 )}
//               </>
//             )}
//           </div>

//           {step >= 0 && (
//             <div className="progress-bar">
//               {questions.map((_, i) => (
//                 <div className="progress-item" key={i}>
//                   <div className={`line ${i < step ? "filled" : ""}`}></div>
//                   <span className="label">{i + 1}</span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       )}
//     </main>
//   );
// }

// export default Main;

// import { useState, useEffect } from "react";
// import questions from "./questions";
// import speakTexts from "./speakTexts";
// import { intermediateText1, intermediateText2, introText } from "./Text";
// import { fetchSpeech } from "../../api/elevenLabs";
// import AudioSphereVisualizer from "../AudioSphereVisualizer/AudioSphereVisualizer";
// import Button from "../Button/Button";
// import RegistrationForm from "../Form/RegistrationForm";
// import Loading from "../Loading/Loading";
// import "./Main.scss";

// function Main() {
//   const [step, setStep] = useState(-3); // -3: старт, -2/-1: промежуточные, >=0: вопросы
//   const [displayedText, setDisplayedText] = useState("");
//   const [showAnswers, setShowAnswers] = useState(false);
//   const [showSphere, setShowSphere] = useState(false);
//   const [volume, setVolume] = useState(0);
//   const [isTypingDone, setIsTypingDone] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isFormVisible, setIsFormVisible] = useState(false);

//   useEffect(() => {
//     if (step >= questions.length || step === -3) return;

//     const textToDisplay =
//       step === -2
//         ? intermediateText1
//         : step === -1
//         ? intermediateText2
//         : questions[step].question;

//     const textToSpeak = step < 0 ? textToDisplay : speakTexts[step];

//     let index = 0;
//     let interval;
//     let audio;

//     const startTyping = () => {
//       interval = setInterval(() => {
//         setDisplayedText((prev) => prev + (textToDisplay[index] || ""));
//         index++;
//         if (index >= textToDisplay.length) {
//           clearInterval(interval);
//           setIsTypingDone(true);
//           if (step >= 0) {
//             setTimeout(() => setShowAnswers(true), 500);
//           }
//         }
//       }, 45); // фиксированная задержка
//     };

//     const startSpeaking = async () => {
//       try {
//         const audioUrl = await fetchSpeech(textToSpeak);
//         audio = new Audio(audioUrl);

//         audio.addEventListener("loadedmetadata", () => {
//           audio.play();

//           const context = new AudioContext();
//           const source = context.createMediaElementSource(audio);
//           const analyser = context.createAnalyser();
//           source.connect(analyser);
//           analyser.connect(context.destination);

//           analyser.fftSize = 256;
//           const bufferLength = analyser.frequencyBinCount;
//           const dataArray = new Uint8Array(bufferLength);

//           const updateVolume = () => {
//             analyser.getByteFrequencyData(dataArray);
//             const average = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
//             setVolume(average);
//             requestAnimationFrame(updateVolume);
//           };

//           updateVolume();
//         });
//       } catch (err) {
//         console.error("Ошибка при получении озвучки:", err);
//       }
//     };

//     setDisplayedText("");
//     setShowAnswers(false);
//     setIsTypingDone(false);
//     startTyping();
//     startSpeaking();

//     return () => {
//       clearInterval(interval);
//       if (audio) audio.pause();
//     };
//   }, [step]);

//   const handleStart = () => {
//     setShowSphere(true);
//     setStep(-2);
//   };

//   const handleIntermediateNext = () => {
//     if (step === -2) {
//       setStep(-1);
//     } else if (step === -1) {
//       setStep(0);
//     }
//   };

//   const handleAnswer = () => {
//     if (step === questions.length - 1) {
//       setIsFormVisible(true); // показать форму
//     } else if (step === 2) {
//       // "загрузка"
//       setIsLoading(true);
//       setShowAnswers(false);
//       setTimeout(() => {
//         setIsLoading(false);
//         setStep((prev) => prev + 1);
//       }, 3000);
//     } else {
//       setStep((prev) => prev + 1);
//     }
//   };

//   return (
//     <main className="main">
//       {isFormVisible ? (
//         <RegistrationForm />
//       ) : step === -3 ? (
//         <div className="intro-screen">
//           <h1 className="intro-title">{introText}</h1>
//           <Button onClick={handleStart}>НАЧАТЬ</Button>
//         </div>
//       ) : (
//         <>
//           <div className="question-box">
//             {showSphere && <AudioSphereVisualizer audioLevel={volume} />}

//             {(step < 0 || step >= 0) && (
//               <>
//                 {step < 0 && <h1 className="intro-title">{introText}</h1>}
//                 <h2>{displayedText}</h2>
//               </>
//             )}

//             {step < 0 && isTypingDone && (
//               <Button onClick={handleIntermediateNext}>Продолжить</Button>
//             )}

//             {step >= 0 && (
//               <>
//                 {isLoading ? (
//                   <Loading />
//                 ) : (
//                   showAnswers && (
//                     <div className="answers">
//                       {questions[step].answers.map((text, i) => (
//                         <Button key={i} onClick={handleAnswer}>
//                           {text}
//                         </Button>
//                       ))}
//                     </div>
//                   )
//                 )}
//               </>
//             )}
//           </div>

//           {step >= 0 && (
//             <div className="progress-bar">
//               {questions.map((_, i) => (
//                 <div className="progress-item" key={i}>
//                   <div className={`line ${i < step ? "filled" : ""}`}></div>
//                   <span className="label">{i + 1}</span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       )}
//     </main>
//   );
// }

// export default Main;


// import { useState, useEffect } from "react";
// import questions from "./questions";
// import speakTexts from "./speakTexts";
// import { intermediateText1, intermediateText2, introText } from "./Text";
// import { fetchSpeech } from "../../api/elevenLabs";
// import AudioSphereVisualizer from "../AudioSphereVisualizer/AudioSphereVisualizer";
// import Button from "../Button/Button";
// import RegistrationForm from "../Form/RegistrationForm";
// import Loading from "../Loading/Loading";
// import useTypedText from "../../hooks/useTypedText";
// import "./Main.scss";

// function Main() {
//   const [step, setStep] = useState(-3); // -3: старт, -2/-1: промежуточные, >=0: вопросы
//   const [showAnswers, setShowAnswers] = useState(false);
//   const [showSphere, setShowSphere] = useState(false);
//   const [volume, setVolume] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isFormVisible, setIsFormVisible] = useState(false);

//   const textToDisplay =
//     step === -2
//       ? intermediateText1
//       : step === -1
//       ? intermediateText2
//       : questions[step]?.question || "";

//   const textToSpeak = step < 0 ? textToDisplay : speakTexts[step] || "";

//   const [typedText, isTypingDone] = useTypedText(textToDisplay, 40);

//   useEffect(() => {
//     if (step >= questions.length || step === -3) return;

//     let audio;

//     const speak = async () => {
//       try {
//         const audioUrl = await fetchSpeech(textToSpeak);
//         audio = new Audio(audioUrl);

//         audio.addEventListener("loadedmetadata", () => {
//           audio.play();

//           const context = new AudioContext();
//           const source = context.createMediaElementSource(audio);
//           const analyser = context.createAnalyser();
//           source.connect(analyser);
//           analyser.connect(context.destination);

//           analyser.fftSize = 256;
//           const bufferLength = analyser.frequencyBinCount;
//           const dataArray = new Uint8Array(bufferLength);

//           const updateVolume = () => {
//             analyser.getByteFrequencyData(dataArray);
//             const average = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
//             setVolume(average);
//             requestAnimationFrame(updateVolume);
//           };

//           updateVolume();
//         });
//       } catch (err) {
//         console.error("Ошибка при озвучке:", err);
//       }
//     };

//     speak();

//     if (step >= 0) {
//       setShowAnswers(false);
//       setTimeout(() => {
//         setShowAnswers(true);
//       }, textToDisplay.length * 40 + 500);
//     }

//     return () => {
//       if (audio) audio.pause();
//     };
//   }, [step]);

//   const handleStart = () => {
//     setShowSphere(true);
//     setStep(-2);
//   };

//   const handleIntermediateNext = () => {
//     if (step === -2) {
//       setStep(-1);
//     } else if (step === -1) {
//       setStep(0);
//     }
//   };

//   const handleAnswer = () => {
//     if (step === questions.length - 1) {
//       setIsFormVisible(true); // показать форму
//     } else if (step === 2) {
//       setIsLoading(true);
//       setShowAnswers(false);
//       setTimeout(() => {
//         setIsLoading(false);
//         setStep((prev) => prev + 1);
//       }, 3000);
//     } else {
//       setStep((prev) => prev + 1);
//     }
//   };

//   return (
//     <main className="main">
//       {isFormVisible ? (
//         <RegistrationForm />
//       ) : step === -3 ? (
//         <div className="intro-screen">
//           <h1 className="intro-title">{introText}</h1>
//           <Button onClick={handleStart}>НАЧАТЬ</Button>
//         </div>
//       ) : (
//         <>
//           <div className="question-box">
//             {showSphere && <AudioSphereVisualizer audioLevel={volume} />}

//             {(step < 0 || step >= 0) && (
//               <>
//                 {step < 0 && <h1 className="intro-title">{introText}</h1>}
//                 <h2>{typedText}</h2>
//               </>
//             )}

//             {step < 0 && isTypingDone && (
//               <Button onClick={handleIntermediateNext}>Продолжить</Button>
//             )}

//             {step >= 0 && (
//               <>
//                 {isLoading ? (
//                   <Loading />
//                 ) : (
//                   showAnswers && (
//                     <div className="answers">
//                       {questions[step].answers.map((text, i) => (
//                         <Button key={i} onClick={handleAnswer}>
//                           {text}
//                         </Button>
//                       ))}
//                     </div>
//                   )
//                 )}
//               </>
//             )}
//           </div>

//           {step >= 0 && (
//             <div className="progress-bar">
//               {questions.map((_, i) => (
//                 <div className="progress-item" key={i}>
//                   <div className={`line ${i < step ? "filled" : ""}`}></div>
//                   <span className="label">{i + 1}</span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       )}
//     </main>
//   );
// }

// export default Main;


import { useState, useEffect } from "react";
import questions from "./questions";
import speakTexts from "./speakTexts";
import { intermediateText1, intermediateText2, introText } from "./Text";
import { fetchSpeech } from "../../api/elevenLabs";
import AudioSphereVisualizer from "../AudioSphereVisualizer/AudioSphereVisualizer";
import Button from "../Button/Button";
import RegistrationForm from "../Form/RegistrationForm";
import Loading from "../Loading/Loading";
import useTypedText from "../../hooks/useTypedText";
import "./Main.scss";

function Main() {
  const [step, setStep] = useState(-3); // -3: старт, -2/-1: промежуточные, >=0: вопросы
  const [showAnswers, setShowAnswers] = useState(false);
  const [volume, setVolume] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const textToDisplay =
    step === -2
      ? intermediateText1
      : step === -1
      ? intermediateText2
      : questions[step]?.question || "";

  const textToSpeak = step < 0 ? textToDisplay : speakTexts[step] || "";
  const [typedText, isTypingDone] = useTypedText(textToDisplay, 40);

  useEffect(() => {
    if (step >= questions.length || step === -3) return;

    let audio;

    const speak = async () => {
      try {
        const audioUrl = await fetchSpeech(textToSpeak);
        audio = new Audio(audioUrl);

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
      } catch (err) {
        console.error("Ошибка при озвучке:", err);
      }
    };

    speak();

    if (step >= 0) {
      setShowAnswers(false);
      setTimeout(() => {
        setShowAnswers(true);
      }, textToDisplay.length * 40 + 500);
    }

    return () => {
      if (audio) audio.pause();
    };
  }, [step]);

  const handleStart = () => {
    setStep(-2);
  };

  const handleIntermediateNext = () => {
    if (step === -2) {
      setStep(-1);
    } else if (step === -1) {
      setStep(0);
    }
  };

  const handleAnswer = () => {
    if (step === questions.length - 1) {
      setIsFormVisible(true); // показать форму
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

  return (
    <main className="main">
      <AudioSphereVisualizer audioLevel={volume} />

      {isFormVisible ? (
        <RegistrationForm />
      ) : step === -3 ? (
        <div className="intro-screen">
          <h1 className="intro-title">{introText}</h1>
          <Button onClick={handleStart}>НАЧАТЬ</Button>
        </div>
      ) : (
        <>
          <div className="question-box">
            <h2>{typedText}</h2>

            {step < 0 && isTypingDone && (
              <Button onClick={handleIntermediateNext}>Продолжить</Button>
            )}

            {step >= 0 && (
              <>
                {isLoading ? (
                  <Loading />
                ) : (
                  showAnswers && (
                    <div className="answers">
                      {questions[step].answers.map((text, i) => (
                        <Button key={i} onClick={handleAnswer}>
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
