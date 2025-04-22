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
      else{
        alert("you are poor, grind a bit and return")
      }
    }

    function buyAutoClicker() {
      if (count >= autoClickerCost) {
        count -= autoClickerCost;
        autoClickers += 1;
        autoClickerCost = Math.floor(autoClickerCost * 1.7);
        updateDisplay();
      }else{
        alert("you are poor, grind a bit and return")
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

    function saveGame() {
      const saveData = {
        count,
        clickPower,
        autoClickers,
        clickUpgradeCost,
        autoClickerCost
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
        updateDisplay();
      }
    }
    
    // Auto-save every 5 seconds
    setInterval(saveGame, 5000);
    
    // Save on window close
    window.addEventListener('beforeunload', saveGame);
    
    // Load on page load
    window.addEventListener('load', loadGame);
    