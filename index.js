let count = 1;
let clickPower = 1;
let autoClickers = 0;
let clickUpgradeCost = 10;
let autoClickerCost = 50;
let multiplierCost = 500;
let multiplier = 1;

const countDisplay = document.getElementById('count');
const clickImg = document.getElementById('cookie');
const clickUpgradeCostDisplay = document.getElementById('clickUpgradeCost');
const autoClickerCostDisplay = document.getElementById('autoClickerCost');
const multiplierBtn = document.getElementById('multiplier-btn');
const autoBtn = document.getElementById('auto-btn');

clickImg.addEventListener('click', () => {
  count += clickPower;
  updateDisplay();
  unlockPages();
});

function buyClickUpgrade() {
  if (count >= clickUpgradeCost) {
    count -= clickUpgradeCost;
    clickPower += 1;
    clickUpgradeCost = Math.floor(clickUpgradeCost * 1.5);
    updateDisplay();
  } else {
    alert("you are poor, grind a bit and return");
  }
}

function buyAutoClicker() {
  if (count >= autoClickerCost) {
    count -= autoClickerCost;
    autoClickers += 1;

    autoBtn.disabled = true;
    autoBtn.textContent += " ✔";
    autoBtn.style.opacity = "0.6";
    autoBtn.style.cursor = "not-allowed";
    updateDisplay();
  } else {
    alert("you are poor, grind a bit and return");
  }
}

function buyMultyplier() {
  if (count >= multiplierCost) {
    count -= multiplierCost;
    multiplier *= 2;
    clickPower *= multiplier;

    multiplierBtn.disabled = true;
    multiplierBtn.textContent += " ✔";
    multiplierBtn.style.opacity = "0.6";
    multiplierBtn.style.cursor = "not-allowed";

    updateDisplay();
  } else {
    alert("you are poor, grind a bit and return");
  }
}

function updateDisplay() {
  countDisplay.textContent = count;
  clickUpgradeCostDisplay.textContent = clickUpgradeCost;
  autoClickerCostDisplay.textContent = autoClickerCost;
}

setInterval(() => {
  count += autoClickers;
  updateDisplay();
}, 1000);

function saveGame() {
  const saveData = {
    count,
    clickPower,
    autoClickers,
    clickUpgradeCost,
    autoClickerCost,
    multiplierCost,
    multiplier,
    purchasedSponsors: Array.from(purchasedSponsors)
  };
  localStorage.setItem('strengthClickerSave', JSON.stringify(saveData));
}

function loadGame() {
  const saved = localStorage.getItem('strengthClickerSave');
  if (saved) {
    const saveData = JSON.parse(saved);
    count = saveData.count || 0;
    clickPower = saveData.clickPower || 1;
    autoClickers = saveData.autoClickers || 0;
    clickUpgradeCost = saveData.clickUpgradeCost || 10;
    autoClickerCost = saveData.autoClickerCost || 50;
    multiplierCost = saveData.multiplierCost || 500;
    multiplier = saveData.multiplier || 1;

    if (saveData.purchasedSponsors) {
      saveData.purchasedSponsors.forEach(id => {
        purchasedSponsors.add(id);
        const img = document.getElementById(id);
        if (img) img.style.display = "inline-block";

        document.querySelectorAll(".sponsor-btn").forEach(btn => {
          if (btn.textContent.trim().startsWith(getSponsorNameById(id))) {
            btn.disabled = true;
            btn.textContent += " ✔";
            btn.style.opacity = "0.6";
            btn.style.cursor = "not-allowed";
          }
        });
      });
    }

    updateDisplay();
    unlockPages();
  }
}

function resetClicks() {
  count = 0;
  updateDisplay();
}

function resetUpgrades() {
  count = 0;
  clickPower = 1;
  autoClickers = 0;
  clickUpgradeCost = 10;
  autoClickerCost = 50;
  multiplierCost = 500;
  multiplier = 1;

  localStorage.removeItem('strengthClickerSave');
  updateDisplay();

  // Reset buttons
  autoBtn.disabled = false;
  autoBtn.textContent = "Buy AutoClicker (Cost: 50)";
  autoBtn.style.opacity = "1";
  autoBtn.style.cursor = "pointer";

  multiplierBtn.disabled = false;
  multiplierBtn.textContent = "Buy Multiplier (cost: 500)";
  multiplierBtn.style.opacity = "1";
  multiplierBtn.style.cursor = "pointer";
}

function resetSponsors() {
  sponsorButtons.forEach(button => {
    button.disabled = false;
    const name = button.textContent.split("✔")[0].trim();
    button.textContent = name;
    button.style.opacity = "1";
    button.style.cursor = "pointer";
  });

  Object.values(sponsorImages).forEach(imgId => {
    const img = document.getElementById(imgId);
    if (img) img.style.display = "none";
  });

  purchasedSponsors.clear();
}

function unlockPages() {
  const staminaLink = document.getElementById("stamina-link");
  const benchLink = document.getElementById("bench");
  const squatLink = document.getElementById("squat-link");

  if (count >= 1000) {
    unlockLink(staminaLink);
  }
  if (count >= 2000) {
    unlockLink(benchLink);
  }
  if (count >= 3000) {
    unlockLink(squatLink);
  }
}

function unlockLink(link) {
  if (link) {
    link.classList.remove("disabled-link");
    link.style.pointerEvents = "auto";
    link.style.color = "";
    link.style.opacity = "";
  }
}

document.querySelectorAll('nav a').forEach(link => {
  const href = link.getAttribute('href');
  if (["bench.html", "squat.html", "stamina.html"].includes(href)) {
    link.addEventListener('click', () => {
      localStorage.removeItem('strengthClickerSave');
    });
  }
});

// Sponsor logic
const sponsorButtons = document.querySelectorAll(".sponsor-btn");
const sponsorImages = {
  "myFitness": "myfitness",
  "fitness24/7": "fitness24",
  "HC Gym": "hcgym",
  "gymshark": "gymshark",
  "siberia": "siberia",
  "monster": "monster"
};
let purchasedSponsors = new Set();

sponsorButtons.forEach(button => {
  button.addEventListener("click", () => {
    const sponsorName = button.textContent.split("✔")[0].trim();
    const imgId = sponsorImages[sponsorName];

    if (!imgId || purchasedSponsors.has(imgId)) return;

    if (count >= 250) {
      count -= 250;
      purchasedSponsors.add(imgId);

      const img = document.getElementById(imgId);
      if (img) img.style.display = "inline-block";

      button.disabled = true;
      button.textContent = sponsorName + " ✔";
      button.style.opacity = "0.6";
      button.style.cursor = "not-allowed";

      updateDisplay();
    } else {
      alert("Not enough clicks! (Need 250)");
    }
  });
});

function getSponsorNameById(id) {
  for (let name in sponsorImages) {
    if (sponsorImages[name] === id) return name;
  }
  return "";
}

window.addEventListener('beforeunload', saveGame);
window.addEventListener('load', loadGame);
setInterval(saveGame, 5000);
