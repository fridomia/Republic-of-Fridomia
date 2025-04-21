function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('hidden');
}
function toggleAccordion(button) {
  const content = button.nextElementSibling;
  content.style.display = (content.style.display === 'block') ? 'none' : 'block';
}
function generateID() {
  const name = document.getElementById('fullName').value.trim();
  const dob = document.getElementById('dob').value;
  const sex = document.getElementById('sex').value;
  const today = document.getElementById('today').value;
  const country = document.getElementById('country').value.trim();

  if (!name || !dob || !sex || !today || !country) {
    alert("Please fill in all fields to generate your ID.");
    return;
  }

  const initials = name.split(' ').map(word => word[0].toUpperCase()).join('');
  const birthDate = dob.replace(/-/g, '');

  const sexCodes = {
    male: ["901", "902", "903", "904", "905"],
    female: ["701", "702", "703", "704", "705"]
  };
  const sexCode = sexCodes[sex][Math.floor(Math.random() * sexCodes[sex].length)];

  const month = new Date(today).getMonth() + 1;
  const paddedMonth = month.toString().padStart(2, '0');

  const countryInitial = country[0].toUpperCase();

  // Use suffix from full suffix list (loaded from suffixes.js)
  const used = JSON.parse(localStorage.getItem("usedSuffixes")) || [];
  const availableSuffixes = suffixes.filter(s => !used.includes(s));
  if (availableSuffixes.length === 0) {
    alert("All suffixes have been used.");
    return;
  }

  const suffix = availableSuffixes[Math.floor(Math.random() * availableSuffixes.length)];
  used.push(suffix);
  localStorage.setItem("usedSuffixes", JSON.stringify(used));

  const fullID = `1-${sexCode}-${paddedMonth}-${countryInitial}-${initials}-${birthDate}${suffix}`;

  document.getElementById('generatedID').innerHTML = `
    <strong>Your Citizen ID:</strong> ${fullID}<br>
    <small>Please copy and paste this into the form when prompted. You are allowed to do it once.</small>
  `;

  const formBaseURL = "https://docs.google.com/forms/d/1xr69Q0Mb6dzXmSFteXJbW7UNBev8KTlLTDl83dg0UXA/viewform";

  document.getElementById('formLink').innerHTML = `
    <a href="${formBaseURL}" class="btn" target="_blank">Submit My Application</a>`;
}
// Signature canvas logic
const signCanvas = document.getElementById("signCanvas");
const signCtx = signCanvas.getContext("2d");
let drawing = false;

signCanvas.addEventListener("mousedown", startDraw);
signCanvas.addEventListener("mouseup", stopDraw);
signCanvas.addEventListener("mouseleave", stopDraw);
signCanvas.addEventListener("mousemove", draw);

signCanvas.addEventListener("touchstart", startDraw);
signCanvas.addEventListener("touchend", stopDraw);
signCanvas.addEventListener("touchcancel", stopDraw);
signCanvas.addEventListener("touchmove", draw);

function startDraw(e) {
  e.preventDefault();
  drawing = true;
}

function stopDraw(e) {
  e.preventDefault();
  drawing = false;
  signCtx.beginPath();
}

function draw(e) {
  if (!drawing) return;
  e.preventDefault();
  const rect = signCanvas.getBoundingClientRect();
  const x = (e.clientX || e.touches[0].clientX) - rect.left;
  const y = (e.clientY || e.touches[0].clientY) - rect.top;

  signCtx.lineWidth = 2;
  signCtx.lineCap = "round";
  signCtx.strokeStyle = "#000";
  signCtx.lineTo(x, y);
  signCtx.stroke();
  signCtx.beginPath();
  signCtx.moveTo(x, y);
}

function drawSignature(e) {
  if (!drawing) return;
  const rect = signCanvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  signCtx.lineWidth = 2;
  signCtx.lineCap = "round";
  signCtx.strokeStyle = "#000";
  signCtx.lineTo(x, y);
  signCtx.stroke();
}

function clearSignature() {
  signCtx.clearRect(0, 0, signCanvas.width, signCanvas.height);
}

function generateCard() {
  const canvas = document.getElementById('idCanvas');
  const ctx = canvas.getContext('2d');

  const name = document.getElementById('name').value;
  const idNumber = document.getElementById('idNumber').value;
  const dob = document.getElementById('dob').value;
  const assuranceDate = document.getElementById('date').value;
  const photoFile = document.getElementById('photo').files[0];

  if (!name || !idNumber || !dob || !assuranceDate || !photoFile) {
    alert("Please fill in all fields and upload your photo.");
    return;
  }

  const photoReader = new FileReader();

  photoReader.onload = function (e1) {
    const photo = new Image();
    photo.src = e1.target.result;

    photo.onload = () => {
      const flag = new Image();
      flag.src = 'Flag.png';

      flag.onload = () => {
        const coat = new Image();
        coat.src = 'Coat.png';

        coat.onload = () => {
          const presidentSignature = new Image();
          presidentSignature.src = 'signature.png';

          presidentSignature.onload = () => {
            // Draw background
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(flag, 0, 0, canvas.width, canvas.height);

            // Coat of Arms
            ctx.drawImage(coat, canvas.width - 90, 10, 70, 70);

            // Circular profile photo
            ctx.save();
            ctx.beginPath();
            ctx.arc(60, 60, 30, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(photo, 30, 30, 60, 60);
            ctx.restore();

            // Text
            ctx.fillStyle = "#000";
            ctx.textAlign = "center";
            ctx.font = "bold 16px Arial";
            // Move "Republic of Fridomia" higher
ctx.font = "bold 16px Arial";
ctx.fillText("Republic of Fridomia", canvas.width / 2, 80);

// Underline "Citizen Card"
ctx.font = "14px Arial";
ctx.fillText("Citizen Card", canvas.width / 2, 100);

// Draw underline under "Citizen Card"
const underlineWidth = ctx.measureText("Citizen Card").width;
ctx.beginPath();
ctx.moveTo((canvas.width / 2) - (underlineWidth / 2), 105);
ctx.lineTo((canvas.width / 2) + (underlineWidth / 2), 105);
ctx.strokeStyle = "#000";
ctx.lineWidth = 1;
ctx.stroke();
            ctx.textAlign = "left";
            ctx.font = "12px Arial";
            ctx.fillText("Name: " + name, 20, 150);
            ctx.fillText("Citizen ID: " + idNumber, 20, 170);
            ctx.fillText("Birth Date: " + dob, 20, 190);
            ctx.fillText("Assurance Date: " + assuranceDate, 20, 210);

            // Draw user's signature from signCanvas
            ctx.drawImage(signCanvas, 30, 240, 80, 40);
            ctx.drawImage(presidentSignature, canvas.width - 110, 240, 80, 40);
          };
        };
      };
    };
  };
  photoReader.readAsDataURL(photoFile);
}

function downloadCard() {
  const canvas = document.getElementById('idCanvas');
  const link = document.createElement('a');
  link.download = 'Fridomia-ID-Card.png';
  link.href = canvas.toDataURL();
  link.click();
}
canvas.style.opacity = 0;
canvas.style.transition = "opacity 0.6s ease";
setTimeout(() => {
  canvas.style.opacity = 1;
}, 50);
window.addEventListener("load", () => {
  setTimeout(() => {
    const intro = document.getElementById("intro-screen");
    intro.style.display = "none";
  }, 4000);
});
window.addEventListener("load", () => {
  setTimeout(() => {
    const intro = document.getElementById("intro-screen");
    if (intro) intro.style.display = "none";
  }, 4000); // fade out after 4 seconds
});
function toggleDeclaration() {
    const full = document.getElementById("fullDeclaration");
    full.style.display = full.style.display === "none" || full.style.display === "" ? "block" : "none";
  }

