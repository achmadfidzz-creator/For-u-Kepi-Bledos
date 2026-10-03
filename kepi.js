const bgMusic = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-control-btn");

function playAudio() {
  if (bgMusic && bgMusic.paused) {
    bgMusic
      .play()
      .then(() => {
        if (musicBtn) musicBtn.innerHTML = "🎵";
      })
      .catch((error) => {
        console.log(
          "Autoplay diblokir browser, klik layar untuk memutar musik.",
        );
      });
  }
}

function toggleMusic() {
  if (!bgMusic || !musicBtn) return;
  if (bgMusic.paused) {
    bgMusic.play();
    musicBtn.innerHTML = "🎵";
  } else {
    bgMusic.pause();
    musicBtn.innerHTML = "🔇";
  }
}

window.addEventListener("DOMContentLoaded", playAudio);
document.addEventListener(
  "click",
  function startOnInteraction() {
    playAudio();
    document.removeEventListener("click", startOnInteraction);
  },
  { once: true },
);

const petalsContainer = document.getElementById("petals-container");
const symbols = ["🌸", "🌸", "🌸", "🤍", "✨"];
for (let i = 0; i < 14; i++) {
  const petal = document.createElement("div");
  petal.className = "petal";
  petal.style.background = "transparent";
  petal.style.boxShadow = "none";
  petal.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.fontSize = Math.random() * 14 + 10 + "px";
  petal.style.animationDuration = Math.random() * 6 + 6 + "s";
  petal.style.animationDelay = Math.random() * 5 + "s";
  petalsContainer.appendChild(petal);
}

let currentStep = 1;

function nextStep(stepNumber) {
  currentStep = stepNumber;
  updateStepVisibility();
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    updateStepVisibility();
  }
}

function updateStepVisibility() {
  document
    .querySelectorAll(".step")
    .forEach((el) => el.classList.remove("active"));
  const targetEl = document.getElementById(`step-${currentStep}`);
  if (targetEl) targetEl.classList.add("active");

  const backBtn = document.getElementById("global-back-btn");
  if (currentStep > 1 && currentStep < 10) {
    backBtn.style.display = "flex";
  } else {
    backBtn.style.display = "none";
  }

  if (currentStep === 3) {
    const flap = document.getElementById("flap");
    if (flap) flap.style.transform = "rotateX(0deg)";
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

const text1 = "I made this, just for you";
const text2 = '"Zahra"';
let i1 = 0,
  i2 = 0;

function typeWriter1() {
  if (i1 < text1.length) {
    document.getElementById("typed-1").innerHTML += text1.charAt(i1);
    i1++;
    setTimeout(typeWriter1, 60);
  } else {
    setTimeout(typeWriter2, 400);
  }
}

function typeWriter2() {
  if (i2 < text2.length) {
    document.getElementById("typed-2").innerHTML += text2.charAt(i2);
    i2++;
    setTimeout(typeWriter2, 100);
  }
}
window.onload = () => setTimeout(typeWriter1, 600);

const CORRECT_PIN = "010521";
let enteredPin = "";

function pressKey(num) {
  if (enteredPin.length < 6) {
    enteredPin += num;
    updateDots();
    if (enteredPin.length === 6) {
      setTimeout(checkPin, 250);
    }
  }
}

function deletePin() {
  if (enteredPin.length > 0) {
    enteredPin = enteredPin.slice(0, -1);
    updateDots();
  }
}

function clearPin() {
  enteredPin = "";
  updateDots();
}

function updateDots() {
  for (let i = 0; i < 6; i++) {
    const dot = document.getElementById(`dot-${i}`);
    if (dot) {
      if (i < enteredPin.length) dot.classList.add("filled");
      else dot.classList.remove("filled");
    }
  }
}

function checkPin() {
  if (enteredPin === CORRECT_PIN || enteredPin === "110526") {
    clearPin();
    nextStep(3);
  } else {
    document.getElementById("wrong-pin-popup").style.display = "flex";
  }
}

function closePopup() {
  document.getElementById("wrong-pin-popup").style.display = "none";
  clearPin();
}

function openEnvelope() {
  document.getElementById("flap").style.transform = "rotateX(180deg)";
  setTimeout(() => nextStep(4), 800);
}

const photos = [
  {
    url: "./images/kepi1.jpeg",
    caption: "Pertama Kali Banget Nih?",
  },
  {
    url: "./images/kepi2.jpeg",
    caption: "OMG Udah Lucu Ya Kita",
  },
  {
    url: "./images/kepi3.jpeg",
    caption: "Informatika x Akuntansi",
  },
];
let photoIndex = 0;

function updatePhoto() {
  const img = document.getElementById("polaroid-img");
  img.style.opacity = "0";
  setTimeout(() => {
    img.src = photos[photoIndex].url;
    document.getElementById("polaroid-cap").innerText =
      photos[photoIndex].caption;
    img.style.opacity = "1";
  }, 200);

  for (let i = 0; i < 3; i++) {
    const dot = document.getElementById(`cdot-${i}`);
    if (dot) {
      if (i === photoIndex) dot.classList.add("active");
      else dot.classList.remove("active");
    }
  }
}

function nextPhoto() {
  photoIndex = (photoIndex + 1) % photos.length;
  updatePhoto();
}

function prevPhoto() {
  photoIndex = (photoIndex - 1 + photos.length) % photos.length;
  updatePhoto();
}

function runawayNo() {
  const btn = document.getElementById("btn-no");
  const containerWidth = window.innerWidth - btn.offsetWidth - 40;
  const containerHeight = window.innerHeight - btn.offsetHeight - 40;

  const randomX =
    Math.floor(Math.random() * containerWidth) - containerWidth / 2;
  const randomY =
    Math.floor(Math.random() * containerHeight) - containerHeight / 2;

  btn.style.position = "absolute";
  btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

function showYesModal() {
  document.getElementById("yes-modal").style.display = "flex";

  let duration = 3 * 1000;
  let end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#ff4081", "#ffb6c1", "#ffffff"],
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#ff4081", "#ffb6c1", "#ffffff"],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

function nextStepFromYes() {
  document.getElementById("yes-modal").style.display = "none";
  nextStep(8);
}
