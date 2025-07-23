import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Button from "../Button/Button";
import useTypedText from "../../hooks/useTypedText";
import "./RegistrationForm.scss";

const introText =
  "У меня для вас отличные новости! Вы можете начать зарабатывать уже сегодня, эту платформу. Ваш предполагаемый ежедневный доход составит примерно 120 000, и со временем эта сумма может стать ещё больше.";

export default function RegistrationFormSection() {
  const [typedText, isTypingDone] = useTypedText(introText, 70);

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
