// ================= GLOBAL STATE =================
let notificationsEnabled = true;

// ================= AUTH =================
function register() {
  const name = document.getElementById("rname")?.value.trim();
  const email = document.getElementById("remail")?.value.trim();
  const pass = document.getElementById("rpass")?.value.trim();

  if (!name || !email || pass.length < 6) {
    alert("❌ Please enter valid details (password must be at least 6 characters)");
    return;
  }

  localStorage.setItem("user", JSON.stringify({ name, email, pass }));
  alert("✅ Registration successful!");
  window.location.href = "login.html";
}

function login() {
  const email = document.getElementById("lemail")?.value.trim();
  const pass = document.getElementById("lpass")?.value.trim();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || email !== user.email || pass !== user.pass) {
    alert("❌ Invalid login credentials");
    return;
  }

  alert("🌿 Welcome to SynWaste!");
  window.location.href = "dashboard.html";
}

function logout() {
  alert("👋 Logged out successfully");
  window.location.href = "login.html";
}

// ================= NOTIFICATIONS =================
function toggleNotifications() {
  notificationsEnabled = !notificationsEnabled;
  alert(
    notificationsEnabled
      ? "🔔 Notifications Enabled"
      : "🔕 Notifications Disabled"
  );
}

// ================= SETTINGS =================
function openSettings() {
  alert(
    "⚙️ Settings Panel\n\n• Alert control\n• Bin monitoring\n• Theme customization\n\n(Backend integration pending)"
  );
}

// ================= AI FEATURE =================
function aiPredict(location) {
  alert(
    `🤖 AI Prediction\n\nLocation: ${location}\nRisk: Overflow likely\nAction: Schedule collection within 2 hours`
  );
}

// ================= BIN DATA =================
const bins = [
  { location: "Sector 12", level: 40 },
  { location: "Park Area", level: 25 },
  { location: "Bus Stand", level: 70 },
  { location: "Main Market", level: 90 }
];

// ================= MOVE BIN =================
function moveBin(card, status) {
  const green = document.querySelector(".group-title.green + .bins");
  const yellow = document.querySelector(".group-title.yellow + .bins");
  const red = document.querySelector(".group-title.red + .bins");

  if (!green || !yellow || !red) return;

  if (status === "ok") green.appendChild(card);
  if (status === "warn") yellow.appendChild(card);
  if (status === "danger") red.appendChild(card);
}

// ================= LIVE SIMULATION =================
function simulateBins() {
  const cards = document.querySelectorAll(".bin");

  cards.forEach((card, i) => {
    if (!bins[i]) return;

    // Increase fill level slowly
    bins[i].level += Math.floor(Math.random() * 4);
    if (bins[i].level > 100) bins[i].level = 100;

    card.querySelector("p").innerText = `Fill Level: ${bins[i].level}%`;

    card.classList.remove("ok", "warn", "danger");

    if (bins[i].level < 60) {
      card.classList.add("ok");
      card.querySelector("span").innerText = "Status: Safe";
      moveBin(card, "ok");

    } else if (bins[i].level < 85) {
      card.classList.add("warn");
      card.querySelector("span").innerText = "Status: Warning";
      moveBin(card, "warn");

    } else {
      card.classList.add("danger");
      card.querySelector("span").innerText = "Status: Critical";
      moveBin(card, "danger");

      if (notificationsEnabled) {
        alert(
          `🚨 CRITICAL ALERT!\n\nBin Location: ${bins[i].location}\nImmediate collection required.`
        );
      }
    }
  });
}

// ================= START SIMULATION =================
if (document.querySelector(".bins")) {
  setInterval(simulateBins, 7000);
}