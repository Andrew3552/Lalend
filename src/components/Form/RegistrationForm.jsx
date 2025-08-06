import { useState } from "react";
import { useFormik } from "formik";
import { sendLead } from "../../utils/sendLead";
import { transliterateAndAppendRandom } from "../../utils/transliterateEmail";
import { getUrlParameter, getIpData, createEventID } from "../../utils/formHelpers";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import useTypedText from "../../hooks/useTypedText";
import "./RegistrationForm.scss";

// Настройки оффера
const offerCountry = "kz";
const offerName = "Kazatomprom";
const offerLang = "ru";

const introText =
  "У меня для вас отличные новости! Вы можете начать зарабатывать уже сегодня, используя эту платформу. Ваш предполагаемый ежедневный доход составит примерно 120 000, и со временем эта сумма может стать ещё больше.";

export default function RegistrationFormSection(props) {
  const [typedText, isTypingDone] = useTypedText(introText, 70);
  const [modalMessage, setModalMessage] = useState("");

  const showModal = (message) => {
    setModalMessage(message);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .matches(/^[\p{L}]+$/u, "Введите только буквы")
        .required("Поле обязательное"),
      lastName: Yup.string()
        .matches(/^[\p{L}]+$/u, "Введите только буквы")
        .required("Поле обязательное"),
      phone: Yup.string()
        .test(
          "is-kz-phone",
          "Введите корректный номер телефона Казахстана",
          (value) => {
            if (!value) return false;
            const digits = value.replace(/\D/g, ""); 
            return /^77\d{9}$/.test(digits);
          }
        )
        .required("Поле обязательное"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const safeAnswers = Array.isArray(props.userAnswers)
        ? props.userAnswers
        : [];
      const quiz = safeAnswers.join(" | ");

      const { ip, city } = await getIpData();
      const trafficSource = getUrlParameter("source") || "facebook";

      const data = {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: transliterateAndAppendRandom(values.firstName + values.lastName),
        phone: values.phone.replace(/\D/g, ""),
        country: offerCountry,
        offer: offerName,
        lang: offerLang,
        ip: ip || "111.111.111.111",
        source: trafficSource,
        buyer: getUrlParameter("buyer") || "",
        target: getUrlParameter("target") || "",
        creo: getUrlParameter("creo") || "",
        idpxl: getUrlParameter("idpxl") || "",
        quiz,
        clickId: getUrlParameter("sub_id") || "",
        fbclid: getUrlParameter("fbclid") || "",
        token: getUrlParameter("token") || "",
        eventID: createEventID(),
        city: city,
      };
     await sendLead(data, showModal, setSubmitting);
    },
  });

  return (
    <div className="registration-section">
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
              onlyCountries={["kz"]}
              disableCountryGuess
              value={formik.values.phone}
              onChange={(value) => formik.setFieldValue("phone", "+" + value)}
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

          <Button type="submit" disabled={formik.isSubmitting}>
            ЗАРЕГИСТРИРОВАТЬСЯ
          </Button>
        </form>
      )}
      {modalMessage && (
        <Modal message={modalMessage} onClose={() => setModalMessage("")} />
      )}
    </div>
  );
}
