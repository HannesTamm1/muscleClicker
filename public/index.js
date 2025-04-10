let count = 0;
    let clickPower = 1;
    let autoClickers = 0;
    let clickUpgradeCost = 10;
    let autoClickerCost = 50;

    const countDisplay = document.getElementById('count');
    const clickImg = document.getElementById('cookie');
    const clickUpgradeCostDisplay = document.getElementById('clickUpgradeCost');
    const autoClickerCostDisplay = document.getElementById('autoClickerCost');

    clickImg.addEventListener('click', () => {
      count += clickPower;
      updateDisplay();
    });

    function buyClickUpgrade() {
      if (count >= clickUpgradeCost) {
        count -= clickUpgradeCost;
        clickPower += 1;
        clickUpgradeCost = Math.floor(clickUpgradeCost * 1.5);
        updateDisplay();
      }
    }

    function buyAutoClicker() {
      if (count >= autoClickerCost) {
        count -= autoClickerCost;
        autoClickers += 1;
        autoClickerCost = Math.floor(autoClickerCost * 1.7);
        updateDisplay();
      }
    }

    function updateDisplay() {
      countDisplay.textContent = count;
      clickUpgradeCostDisplay.textContent = clickUpgradeCost;
      autoClickerCostDisplay.textContent = autoClickerCost;
    }

    // Auto-click every second
    setInterval(() => {
      count += autoClickers;
      updateDisplay();
    }, 1000);
