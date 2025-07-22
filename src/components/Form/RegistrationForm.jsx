// // src/components/RegistrationFormSection/RegistrationFormSection.jsx
// import { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { getCountryCallingCode } from "../../api/GetGeoCode";
// import AudioSphereVisualizer from "../AudioSphereVisualizer/AudioSphereVisualizer";
// import Button from "../Button/Button";
// // import "./RegistrationFormSection.scss";

// const introText = "У меня для вас отличные новости! Вы можете начать зарабатывать уже сегодня, используя этого бота. Ваш предполагаемый ежедневный доход составит примерно 35 000 тенге, и со временем эта сумма может стать ещё больше.";

// export default function RegistrationFormSection() {
//   const [displayedText, setDisplayedText] = useState("");
//   const [isTypingDone, setIsTypingDone] = useState(false);
//   const [showSphere, setShowSphere] = useState(true);
//   const [volume, setVolume] = useState(0);
//   const [countryCode, setCountryCode] = useState("+1");

//   useEffect(() => {
//     const fetchCode = async () => {
//       const code = await getCountryCallingCode();
//       setCountryCode(code);
//     };
//     fetchCode();
//   }, []);

//   useEffect(() => {
//     let index = 0;
//     const delay = 40;
//     const interval = setInterval(() => {
//       setDisplayedText((prev) => prev + introText[index]);
//       index++;
//       if (index >= introText.length) {
//         clearInterval(interval);
//         setIsTypingDone(true);
//       }
//     }, delay);

//     return () => clearInterval(interval);
//   }, []);

//   const formik = useFormik({
//     initialValues: {
//       firstName: "",
//       lastName: "",
//       phone: "",
//     },
//     validationSchema: Yup.object({
//       firstName: Yup.string().required("Обязательное поле"),
//       lastName: Yup.string().required("Обязательное поле"),
//       phone: Yup.string().required("Обязательное поле"),
//     }),
//     onSubmit: (values) => {
//       console.log("Form submitted:", values);
//     },
//   });

//   return (
//     <div className="registration-section">
//       {showSphere && <AudioSphereVisualizer audioLevel={volume} />}
//       <h2 className="typed-text">{displayedText}</h2>

//       {isTypingDone && (
//         <form className="form" onSubmit={formik.handleSubmit}>
//           <input
//             type="text"
//             name="firstName"
//             placeholder="Имя"
//             onChange={formik.handleChange}
//             value={formik.values.firstName}
//           />
//           {formik.touched.firstName && formik.errors.firstName && (
//             <div className="error">{formik.errors.firstName}</div>
//           )}

//           <input
//             type="text"
//             name="lastName"
//             placeholder="Фамилия"
//             onChange={formik.handleChange}
//             value={formik.values.lastName}
//           />
//           {formik.touched.lastName && formik.errors.lastName && (
//             <div className="error">{formik.errors.lastName}</div>
//           )}

//           <div className="phone-group">
//             <span className="prefix">{countryCode}</span>
//             <input
//               type="tel"
//               name="phone"
//               placeholder="50 123 4567"
//               onChange={formik.handleChange}
//               value={formik.values.phone}
//             />
//           </div>
//           {formik.touched.phone && formik.errors.phone && (
//             <div className="error">{formik.errors.phone}</div>
//           )}

//           <Button type="submit">ЗАРЕГИСТРИРОВАТЬСЯ</Button>
//         </form>
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import AudioSphereVisualizer from "../AudioSphereVisualizer/AudioSphereVisualizer";
import Button from "../Button/Button";
import useTypedText from "../../hooks/useTypedText";
import "./RegistrationForm.scss";

const introText =
  "У меня для вас отличные новости! Вы можете начать зарабатывать уже сегодня, используя этого бота. Ваш предполагаемый ежедневный доход составит примерно тридцать пять тысяч тенге, и со временем эта сумма может стать ещё больше.";

export default function RegistrationFormSection() {
  const [showSphere, setShowSphere] = useState(true);
  const [volume, setVolume] = useState(0);
  const [typedText, isTypingDone] = useTypedText(introText, 40);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Обязательное поле"),
      lastName: Yup.string().required("Обязательное поле"),
      phone: Yup.string().required("Обязательное поле"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  return (
    <div className="registration-section">
      {showSphere && <AudioSphereVisualizer audioLevel={volume} />}
      <h2 className="typed-text">{typedText}</h2>

      {isTypingDone && (
        <form className="form" onSubmit={formik.handleSubmit}>
          <div className="phone-field-wrapper">
            <input
              type="text"
              name="firstName"
              placeholder="Имя"
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
            <div
              className={`error-message ${
                formik.touched.firstName && formik.errors.firstName
                  ? "visible"
                  : ""
              }`}
            >
              {formik.touched.firstName && formik.errors.firstName}
            </div>
          </div>

          <div className="phone-field-wrapper">
            <input
              type="text"
              name="lastName"
              placeholder="Фамилия"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
            <div
              className={`error-message ${
                formik.touched.lastName && formik.errors.lastName
                  ? "visible"
                  : ""
              }`}
            >
              {formik.touched.lastName && formik.errors.lastName}
            </div>
          </div>

          <div className="phone-field-wrapper">
            <PhoneInput
              country={"kz"}
              value={formik.values.phone}
              onChange={(value) => formik.setFieldValue("phone", value)}
              onBlur={formik.handleBlur("phone")}
              containerClass="custom-phone-input-container"
              inputClass="form-control"
            />
            <div
              className={`error-message ${
                formik.touched.phone && formik.errors.phone ? "visible" : ""
              }`}
            >
              {formik.touched.phone && formik.errors.phone}
            </div>
          </div>

          <Button type="submit">ЗАРЕГИСТРИРОВАТЬСЯ</Button>
        </form>
      )}
    </div>
  );
}
