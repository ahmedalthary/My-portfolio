document.addEventListener("DOMContentLoaded", function () {
  //  ================ initialization swiper library ================

  const swiper = new Swiper(".swiper", {
    cssMode: true,

    // Optional parameters
    direction: "horizontal",
    loop: true,

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  //  ================ Dark/Light Mode ================
  let darkLightMode = document.querySelector(".dark-light-mode");
  if (localStorage.getItem("icon")) {
    let currentIcon = localStorage.getItem("icon");
    darkLightMode.firstElementChild.className = "uli";
    darkLightMode.firstElementChild.classList.add(currentIcon);
    if (currentIcon === "uil-sun") {
      document.body.classList.add("dark-them");
    } else {
      document.body.classList.remove("dark-them");
    }
  }
  darkLightMode.addEventListener("click", () => {
    if (darkLightMode.firstElementChild.classList.contains("uil-moon")) {
      localStorage.setItem("icon", "uil-sun");

      darkLightMode.firstElementChild.classList.remove("uil-moon");
      darkLightMode.firstElementChild.classList.add("uil-sun");
      document.body.classList.add("dark-them");
    } else {
      localStorage.setItem("icon", "uil-moon");
      darkLightMode.firstElementChild.classList.remove("uil-sun");
      darkLightMode.firstElementChild.classList.add("uil-moon");
      document.body.classList.remove("dark-them");
    }
    // if (darkLightMode.firstElementChild.classList.contains("uil-sun")) {
    //   document.body.style.setProperty("--bg-color", "#222831");
    //   document.documentElement.style.setProperty("--title-color", "#fff");
    // } else {
    //   document.body.style.removeProperty("--bg-color");
    //   document.documentElement.style.removeProperty("--title-color");
    // }
  });
  //  ================ Header Stick on Scroll ================
  let header = document.querySelector(".scrolling-header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });
  //  ================ Toggle Menu ================
  let toggleButton = document.querySelector(".toggle-button");
  toggleButton.addEventListener("click", () => {
    toggleButton.nextElementSibling.classList.toggle("collapsed");
  });
  //  ================ Scroll Down ================
  let scrollDown = document.querySelector(".scroll-down");
  let aboutSection = document.getElementById("about");
  scrollDown.addEventListener("click", () => {
    window.scrollTo({ top: aboutSection.offsetTop - 100, behavior: "smooth" });
  });
  //  ================ Skills Tooltip ================
  let skills = document.querySelectorAll(".skills span");
  let skillToolTip;
  let showToolTip;

  skills.forEach((skill) => {
    skill.addEventListener("mouseenter", () => {
      showToolTip = setTimeout(() => {
        skillToolTip = document.createElement("div");
        skillToolTip.classList.add("skills-tooltip");
        skillToolTip.textContent = skill.dataset.skill;
        skill.appendChild(skillToolTip);
        setTimeout(() => {
          skillToolTip.classList.add("show");
        }, 20);
      }, 700);
    });

    skill.addEventListener("mouseleave", () => {
      clearTimeout(showToolTip);
      skillToolTip = skill.querySelector(".skills-tooltip");
      if (skillToolTip) {
        skillToolTip.classList.remove("show");
        setTimeout(() => {
          skillToolTip.remove();
        }, 800);
      }
    });
  });

  //  ================ Contact Input Form Validation ================
  // Get the form and input elements

  let userName = document.getElementById("name");
  let email = document.getElementById("email");
  let message = document.getElementById("message");
  let validationMsg = document.querySelectorAll(".validation-msg");
  // Regular expressions for validation
  let userNameReg =
    /^[\u0621-\u064A\u0660-\u0669a-z]+[\u0621-\u064A\u0660-\u0669\w\s]*$/i;
  let emailReg = /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,10})$/i;

  // Input Status Check
  let userNameValidation, emailValidation, messageValidation;
  // Blur event handler for input fields
  userName.onblur = () => {
    userNameValidation = validateInput(
      userName,
      userNameReg,
      0,
      `Please enter the name correctly,
    1) It is not allowed to start with a number or space
    2) special character not allowed`
    );
  };
  email.onblur = () => {
    emailValidation = validateInput(
      email,
      emailReg,
      1,
      `Please enter the email correctly, 
   1) It is not allowed to start with a special character
   2) The part after @ cannot contain a special character except the hyphen
   3) The mail must be in English letters`
    );
  };

  message.onblur = () => {
    messageValidation = validateInput(message, null, 2, null);
  };
  function validateInput(
    inputField,
    regExp,
    validationMsgIndex,
    customErrorMsg
  ) {
    customErrorMsg = customErrorMsg || null;
    let inputValue = inputField.value.trim();
    if (inputValue === "") {
      validationMsg[
        validationMsgIndex
      ].textContent = `This field cannot be empty, Please enter a value for ${inputField.getAttribute(
        "placeholder"
      )}`;
      inputField.getAttribute("placeholder") + ".";
      validationMsg[validationMsgIndex].style.display = "block";
      return false;
    }

    if (regExp && !regExp.test(inputValue)) {
      validationMsg[validationMsgIndex].textContent = customErrorMsg;
      validationMsg[validationMsgIndex].style.display = "block";
      return false;
    } else {
      validationMsg[validationMsgIndex].style.display = "none";
      return true;
    }
  }
  //  ================ Contact Submit Form Validation ================

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbwc8eKZc0f09JCAX6a-fuotX7iimP20obNe5TE7lQW7UcVjLLBVzGpzUxfegob9FPqC4g/exec";
  const form = document.forms["submit-to-google-sheet"];

  function displayToast(id) {
    let formValidationMsg = document.querySelector(".form-validation-msg");
    let toastDetails = {
      Success: {
        icon: "uil-check-circle",
        text: "Your message has been sent successfully!",
        color: "success",
      },
      Error: {
        icon: "uil-times-circle",
        text: "Please fill out all required fields before submitting the form",
        color: "error",
      },
      error: {
        icon: "uil-times-circle",
        text: "Please check the information you entered and make sure it is correct",
        color: "error",
      },
      Failed: {
        icon: "uil-info-circle",
        text: "Message send failed. Please check your connection and try again later.",
        color: "failed",
      },
    };
    let { icon, text, color } = toastDetails[id];
    formValidationMsg.className = "form-validation-msg";
    formValidationMsg.firstElementChild.className = "uil";
    formValidationMsg.firstElementChild.classList.add(icon);
    formValidationMsg.lastElementChild.firstElementChild.textContent = id;
    formValidationMsg.lastElementChild.lastElementChild.textContent = text;
    formValidationMsg.classList.add("show-toast", color);
    setTimeout(function () {
      formValidationMsg.classList.remove("show-toast");
    }, 4000);
  }
  form.addEventListener("submit", submitFormValidation);
  function submitFormValidation(event) {
    if (
      userName.value.length === 0 ||
      email.value.length === 0 ||
      message.value.length === 0
    ) {
      displayToast("Error");
    } else {
      if (!userNameValidation || !emailValidation || !messageValidation) {
        // if (
        //   userName.value.length === 0 ||
        //   email.value.length === 0 ||
        //   message.value.length === 0
        // ) {
        //   displayToast("Error");
        // } else {
        displayToast("error");
        // }
      } else {
        fetch(scriptURL, { method: "POST", body: new FormData(form) })
          .then(() => {
            form.reset();
            displayToast("Success");
          })
          .catch(() => {
            displayToast("Failed");
          });
      }
    }
    event.preventDefault();
  }
});

//  ================ Navbar Item Active ================

let NavbarItems = document.querySelectorAll(".navBar-item");
let homeSection = document.getElementById("home");
let aboutSection = document.getElementById("about");
let worksSection = document.getElementById("works");
let contactSection = document.getElementById("contact");
function resetActiveClass(navbarItemIndex) {
  NavbarItems.forEach((NavbarItem) => {
    NavbarItem.classList.remove("active");
  });
  NavbarItems[navbarItemIndex].classList.add("active");
}
function navbarActiveOnScroll() {
  if (
    scrollY >= homeSection.offsetTop &&
    scrollY < aboutSection.offsetTop - 100
  ) {
    resetActiveClass(0);
  } else if (
    scrollY >= aboutSection.offsetTop - 100 &&
    scrollY < worksSection.offsetTop - 100
  ) {
    resetActiveClass(1);
  } else if (
    scrollY >= worksSection.offsetTop - 100 &&
    scrollY < contactSection.offsetTop - 100
  ) {
    resetActiveClass(2);
  } else {
    resetActiveClass(3);
  }
}
window.addEventListener("scroll", navbarActiveOnScroll);
//  ================ Scroll To Up ================
let scrollUpIcon = document.querySelector(".scroll-to-up");
window.addEventListener("scroll", () => {
  scrollY >= 600
    ? (scrollUpIcon.style.display = "block")
    : (scrollUpIcon.style.display = "none");
});
scrollUpIcon.addEventListener("click", () => {
  scrollTo({
    top: 0,
  });
});
//  ================ Dynamically Copy Right Year ================
let year = document.querySelector(".year");
year.textContent = new Date().getFullYear();
