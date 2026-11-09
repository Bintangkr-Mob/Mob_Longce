const form = document.querySelector("#lead-form");
const statusMessage = document.querySelector("#form-status");
const paymentChoices = document.querySelectorAll(".payment-choice");

document.querySelector("#year").textContent = String(new Date().getFullYear());

paymentChoices.forEach((choice) => {
  choice.addEventListener("click", () => {
    paymentChoices.forEach((option) => {
      const selected = option === choice;
      option.setAttribute("aria-pressed", String(selected));
      document.querySelector(`#${option.getAttribute("aria-controls")}`).hidden =
        !selected;
    });
  });
});

const countdownElement = document.querySelector("#countdown");
let secondsRemaining = (5 * 60 * 60) + (30 * 60) + 42;

function updateCountdown() {
  const hours = Math.floor(secondsRemaining / 3600);
  const minutes = Math.floor((secondsRemaining % 3600) / 60);
  const seconds = secondsRemaining % 60;
  countdownElement.textContent = [hours, minutes, seconds]
    .map((part) => String(part).padStart(2, "0"))
    .join(":");
  secondsRemaining = secondsRemaining > 0 ? secondsRemaining - 1 : 0;
}

updateCountdown();
window.setInterval(updateCountdown, 1000);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const formData = new FormData(form);
  const message = [
    "Halo VoltGo, saya ingin klaim pre-order/informasi.",
    `Nama: ${formData.get("name")}`,
    `Nomor WhatsApp saya: ${formData.get("phone")}`,
    `Kota: ${formData.get("city")}`,
    `Informasi yang saya butuhkan: ${formData.get("interest")}`,
  ].join("\n");
  const whatsappUrl = new URL("https://wa.me/6289637760930");
  whatsappUrl.searchParams.set("text", message);

  window.location.assign(whatsappUrl);
});
