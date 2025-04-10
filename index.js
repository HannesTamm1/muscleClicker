// script.js

// Initialize cookies and upgrade cost
let cookies = 0;
let cookiesPerClick = 1;
let upgradeCost = 10;

// Get DOM elements
const cookieCountElement = document.getElementById('cookieCount');
const clickButton = document.getElementById('clickButton');
const upgradeButton = document.getElementById('upgradeButton');
const upgradeCostElement = document.getElementById('upgradeCost');

// Update the cookie count on the screen
function updateCookieCount() {
    cookieCountElement.textContent = cookies;
}

// Click button logic
clickButton.addEventListener('click', () => {
    cookies += cookiesPerClick;
    updateCookieCount();
});

// Upgrade button logic
upgradeButton.addEventListener('click', () => {
    if (cookies >= upgradeCost) {
        cookies -= upgradeCost;
        cookiesPerClick += 1; // Increase cookies per click
        upgradeCost = Math.floor(upgradeCost * 1.5); // Increase upgrade cost
        upgradeCostElement.textContent = upgradeCost;
        updateCookieCount();
    } else {
        alert('Not enough cookies!');
    }
});

// Initialize the game
updateCookieCount();
