document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("checkout-form");
  const successMessage = document.getElementById("success-message");

  const cardNumberInput = document.getElementById("cardNumber");
  cardNumberInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 0) {
      value = value.match(new RegExp(".{1,4}", "g")).join(" ");
    }

    e.target.value = value;
  });

  const expiryDateInput = document.getElementById("expiryDate");
  expiryDateInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }

    e.target.value = value;
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    resetValidationState();

    if (validateForm()) {
      form.style.display = "none";
      successMessage.style.display = "block";
      successMessage.classList.add("fade-in");

      setTimeout(function () {
        form.reset();
        successMessage.style.display = "none";
        form.style.display = "block";
        resetValidationState();
      }, 5000);
    }
  });

  function resetValidationState() {
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => {
      input.classList.remove("is-invalid");
      input.classList.remove("animate-shake");
    });
  }

  function validateForm() {
    let isValid = true;

    const fullName = document.getElementById("fullName");
    if (!fullName.value.trim() || !/^[A-Za-z ]+$/.test(fullName.value)) {
      markInvalid(fullName);
      isValid = false;
    }

    const email = document.getElementById("email");
    if (
      !email.value.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
    ) {
      markInvalid(email);
      isValid = false;
    }

    const phone = document.getElementById("phone");
    if (!phone.value.trim() || !/^[0-9]{10,15}$/.test(phone.value)) {
      markInvalid(phone);
      isValid = false;
    }

    const address = document.getElementById("address");
    if (!address.value.trim()) {
      markInvalid(address);
      isValid = false;
    }

    const city = document.getElementById("city");
    if (!city.value.trim()) {
      markInvalid(city);
      isValid = false;
    }

    const state = document.getElementById("state");
    if (!state.value.trim()) {
      markInvalid(state);
      isValid = false;
    }

    const zip = document.getElementById("zip");
    if (!zip.value.trim() || !/^[0-9]{5,6}$/.test(zip.value)) {
      markInvalid(zip);
      isValid = false;
    }

    const cardName = document.getElementById("cardName");
    if (!cardName.value.trim() || !/^[A-Za-z ]+$/.test(cardName.value)) {
      markInvalid(cardName);
      isValid = false;
    }

    if (
      !cardNumberInput.value.trim() ||
      cardNumberInput.value.replace(/\s/g, "").length !== 16
    ) {
      markInvalid(cardNumberInput);
      isValid = false;
    }

    if (!validateExpiryDate(expiryDateInput.value)) {
      markInvalid(expiryDateInput);
      isValid = false;
    }

    const cvv = document.getElementById("cvv");
    if (!cvv.value.trim() || !/^[0-9]{3}$/.test(cvv.value)) {
      markInvalid(cvv);
      isValid = false;
    }

    const terms = document.getElementById("terms");
    if (!terms.checked) {
      terms.classList.add("is-invalid");
      isValid = false;
    }

    return isValid;
  }

  function validateExpiryDate(value) {
    if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(value)) {
      return false;
    }

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear() % 100;

    const parts = value.split("/");
    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[1], 10);

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return false;
    }

    return true;
  }

  function markInvalid(input) {
    input.classList.add("is-invalid");
    input.classList.add("animate-shake");

    if (document.querySelector(".is-invalid") === input) {
      input.focus();
    }
  }

  const inputs = form.querySelectorAll("input[required]");
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      this.classList.remove("animate-shake");

      switch (this.id) {
        case "fullName":
        case "cardName":
          if (!this.value.trim() || !/^[A-Za-z ]+$/.test(this.value)) {
            this.classList.add("is-invalid");
          } else {
            this.classList.remove("is-invalid");
          }
          break;

        case "email":
          if (
            !this.value.trim() ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value)
          ) {
            this.classList.add("is-invalid");
          } else {
            this.classList.remove("is-invalid");
          }
          break;

        case "phone":
          if (!this.value.trim() || !/^[0-9]{10,15}$/.test(this.value)) {
            this.classList.add("is-invalid");
          } else {
            this.classList.remove("is-invalid");
          }
          break;

        case "zip":
          if (!this.value.trim() || !/^[0-9]{5,6}$/.test(this.value)) {
            this.classList.add("is-invalid");
          } else {
            this.classList.remove("is-invalid");
          }
          break;

        case "cardNumber":
          if (
            !this.value.trim() ||
            this.value.replace(/\s/g, "").length !== 16
          ) {
            this.classList.add("is-invalid");
          } else {
            this.classList.remove("is-invalid");
          }
          break;

        case "expiryDate":
          if (!validateExpiryDate(this.value)) {
            this.classList.add("is-invalid");
          } else {
            this.classList.remove("is-invalid");
          }
          break;

        case "cvv":
          if (!this.value.trim() || !/^[0-9]{3}$/.test(this.value)) {
            this.classList.add("is-invalid");
          } else {
            this.classList.remove("is-invalid");
          }
          break;

        default:
          if (!this.value.trim()) {
            this.classList.add("is-invalid");
          } else {
            this.classList.remove("is-invalid");
          }
      }
    });
  });
});
