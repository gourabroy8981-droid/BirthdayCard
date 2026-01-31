// ---------- MUSIC ----------
const song = document.getElementById("song");
song.volume = 0.6;

// ---------- DARK MODE ----------
function toggleMode() {
  document.body.classList.toggle("dark");
}

// ---------------- TAP FLIP + AUTO TYPING + START MUSIC ----------------
const card = document.getElementById("card");
let flipped = false;
let musicStarted = false;

card.addEventListener("click", (e) => {
  e.stopPropagation();

  if (!musicStarted) {
    song.play().catch(() => {});
    musicStarted = true;
  }

  flipped = !flipped;
  card.style.transform = flipped
    ? "rotateY(180deg) scale(1.05)"
    : "rotateY(0deg) scale(1)";

  if (flipped) {
    resetTyping();
    setTimeout(() => typing(), 400);
  }
});

card.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", e => e.stopPropagation());
});

// ---------------- FIREWORKS ----------------
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;

  for (let i = 0; i < 60; i++) {
    particles.push({
      x, y,
      vx: Math.random() * 5 - 2.5,
      vy: Math.random() * 5 - 2.5,
      life: 120,
      size: Math.random() * 3 + 1
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life--;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,${Math.random()*255},${Math.random()*255},0.9)`;
    ctx.fill();

    if (p.life <= 0) particles.splice(i, 1);
  }

  requestAnimationFrame(animate);
}

setInterval(createFirework, 1000);
animate();

// ---------------- TYPING EFFECT ----------------
const text = `You are my strength, my smile, and my biggest blessing.
Your love guides me every day.
May your life be filled with health, happiness and peace.
I love you forever ❤️`;

let i = 0;
let typingTimer;
const typeBox = document.getElementById("typeText");

function resetTyping() {
  clearTimeout(typingTimer);
  i = 0;
  typeBox.innerHTML = "";
}

function typing() {
  if (i < text.length) {
    if (text.charAt(i) === "\n") typeBox.innerHTML += "<br>";
    else typeBox.innerHTML += text.charAt(i);
    i++;
    typingTimer = setTimeout(typing, 40);
  }
}

// ---------------- AUTO GALLERY ----------------
const photos = ["maa1.jpg", "maa2.jpg", "maa3.jpg"];
let index = 0;
const mainPhoto = document.getElementById("mainPhoto");

setInterval(() => {
  index = (index + 1) % photos.length;
  mainPhoto.style.opacity = 0;
  setTimeout(() => {
    mainPhoto.src = photos[index];
    mainPhoto.style.opacity = 1;
  }, 300);
}, 2500);

// ---------------- HEART EXPLOSION ----------------
document.addEventListener("click", e => {
  for (let i = 0; i < 8; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = "❤️";
    heart.style.left = e.clientX + "px";
    heart.style.top = e.clientY + "px";
    heart.style.setProperty("--x", `${Math.random()*200-100}px`);
    heart.style.setProperty("--y", `${Math.random()*200-100}px`);
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  }
});

// ---------------- CONFETTI ----------------
function createConfetti() {
  const confetti = document.createElement("div");
  confetti.className = "confetti";
  confetti.style.left = Math.random() * 100 + "vw";
  confetti.style.background = `hsl(${Math.random()*360},100%,70%)`;
  confetti.style.animationDuration = 3 + Math.random()*3 + "s";
  document.body.appendChild(confetti);
  setTimeout(() => confetti.remove(), 6000);
}

setInterval(createConfetti, 200);

// ---------------- WHATSAPP SHARE ----------------
function shareWhatsApp() {
  const msg = `Happy Birthday Maataashree ❤️ Days have passed, and every year I wait for this special day—the birthday of the one who means everything to me, because of whom I am who I am today.
Even though I’m not present with you this time, my heart is always by your side. 💕
From the depths of my heart, I wish you a very beautiful and happy birthday.`;

  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`);
}
