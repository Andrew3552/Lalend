export async function sendLead(data, showModal, setSubmitting) {
  try {
    const response = await fetch("./send.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      showModal("Ошибка отправки формы. Попробуйте позже");
      return;
    }

    const result = await response.json();
    console.log("Ответ от CRM:", result);

    const duplicateErrorEmail = "4207";
    const duplicateErrorPhone = "4206";
    const incorrectEmail = "4204";

    if (result.saved === "true") {
      const redirectUrl = result.redirect_url || "./thanks/thanks/index.php";
      window.location.href = redirectUrl;
      return;
    }

    if (result.saved === "false" && result.errors) {
      if (
        result.errors.includes(duplicateErrorPhone) &&
        result.errors.includes(duplicateErrorEmail)
      ) {
        showModal(
          `Вы уже зарегистрированы на номер и почту. Зарегистрируйтесь с другими данными.`
        );
        return;
      }

      if (result.errors.includes(duplicateErrorEmail)) {
        showModal(`Вы уже зарегистрированы на эту почту. Попробуйте другую.`);
        return;
      }

      if (result.errors.includes(duplicateErrorPhone)) {
        showModal(`Вы уже зарегистрированы на этот номер. Попробуйте другой.`);
        return;
      }

      if (result.errors.includes(incorrectEmail)) {
        showModal(`Вы ввели некорректную почту.`);
        return;
      }
    }

    showModal("Ошибка отправки. Попробуйте позже.");
  } catch (err) {
    console.error("Ошибка при отправке данных:", err);
    showModal("Сервер не отвечает. Попробуйте позже.");
  } finally {
    if (typeof setSubmitting === "function") {
      setSubmitting(false);
    }
  }
}
