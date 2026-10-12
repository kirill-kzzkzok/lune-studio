export function initPhoneInput() {
  document.addEventListener("input", (e) => {
    if (e.target.name === "phone")
      e.target.value = e.target.value.replace(/[^\d+()\s-]/g, "");
  });
}
