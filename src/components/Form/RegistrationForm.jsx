// src/components/RegistrationFormSection/RegistrationFormSection.jsx
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getCountryCallingCode } from "../../api/GetGeoCode";
import AudioSphereVisualizer from "../AudioSphereVisualizer/AudioSphereVisualizer";
import Button from "../Button/Button";
// import "./RegistrationFormSection.scss";

const introText = "Пожалуйста, заполните форму ниже, чтобы завершить регистрацию и начать зарабатывать вместе с ИИ.";

export default function RegistrationFormSection() {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [showSphere, setShowSphere] = useState(true);
  const [volume, setVolume] = useState(0);
  const [countryCode, setCountryCode] = useState("+1");

  useEffect(() => {
    const fetchCode = async () => {
      const code = await getCountryCallingCode();
      setCountryCode(code);
    };
    fetchCode();
  }, []);

  useEffect(() => {
    let index = 0;
    const delay = 40;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + introText[index]);
      index++;
      if (index >= introText.length) {
        clearInterval(interval);
        setIsTypingDone(true);
      }
    }, delay);

    return () => clearInterval(interval);
  }, []);

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
      <h2 className="typed-text">{displayedText}</h2>

      {isTypingDone && (
        <form className="form" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="Имя"
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="error">{formik.errors.firstName}</div>
          )}

          <input
            type="text"
            name="lastName"
            placeholder="Фамилия"
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="error">{formik.errors.lastName}</div>
          )}

          <div className="phone-group">
            <span className="prefix">{countryCode}</span>
            <input
              type="tel"
              name="phone"
              placeholder="50 123 4567"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
          </div>
          {formik.touched.phone && formik.errors.phone && (
            <div className="error">{formik.errors.phone}</div>
          )}

          <Button type="submit">ЗАРЕГИСТРИРОВАТЬСЯ</Button>
        </form>
      )}
    </div>
  );
}
