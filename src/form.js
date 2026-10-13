// Живой ввод телефона: оставляем только цифры и символы маски
export function initPhoneInput() {
  document.addEventListener("input", (e) => {
    if (e.target.name === "phone")
      e.target.value = e.target.value.replace(/[^\d+()\s-]/g, "");
  });
}
