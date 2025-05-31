console.log("MINE SOME STUFF!!")

let cheese = 0;
let minePower = 1;
let autoMinePower = 0;


let cheeseDisplay = document.getElementById("cheese-display")
let autoMinePowerDisplay = document.getElementById("auto-mine-power")
let minePowerDisplay = document.getElementById("mine-power")


const planets = [
  {
    name: 'moon',
    price: 0
  },
  {
    name: "secret-moon",
    price: 50000,
  }
]

const clickUpgrades = [
  {
    name: 'stone-pickaxe',
    price: 10,
    quantity: 0,
    bonus: 1,
    emoji: "⛏️"
  },

  {
    name: 'copper-pickaxe',
    price: 50,
    quantity: 0,
    bonus: 2,
    emoji: "🪓"
  },

  {
    name: 'iron-pickaxe',
    price: 150,
    quantity: 0,
    bonus: 3
  },
];

const automaticUpgrades = [
  {
    name: "cheap-miner",
    price: 300,
    quantity: 0,
    bonus: 10,
    emoji: "👷"
  },
  {
    name: "mediocre-miner",
    price: 500,
    quantity: 0,
    bonus: 20,
    emoji: "👷‍♂️"
  },
  {
    name: "craftsman-miner",
    price: 1000,
    quantity: 0,
    bonus: 30
  },
  {
    name: "Rover",
    price: 10000,
    quantity: 0,
    bonus: 250
  }
];

const speedUpgrades = [
  {
    name: "speed",
    value: 3000,
    price: 5000,
    quantity: 0,
  }
]

//#region LOGIC STUFF ⚙️

function buyPickaxe(typeOfAxe) {
  //use the find method for arrays
  const foundAxe = clickUpgrades.find((clickUpgrade) => clickUpgrade.name == typeOfAxe)

  if (cheese >= foundAxe.price) {
    cheese -= foundAxe.price
    minePower += foundAxe.bonus
    foundAxe.quantity++
    drawCheese()
    drawMinePower()
    document.getElementById("number-of-" + typeOfAxe).innerText = `${foundAxe.quantity}  ${foundAxe.emoji}`
    document.getElementById(typeOfAxe + "-bonus").innerText = `➡️ ${foundAxe.bonus * foundAxe.quantity}`
    foundAxe.price = Math.round(foundAxe.price * 1.08)
    drawNewAxePurchasePrice(foundAxe.name)
  }
  else {
    window.alert("You dont got the CHEEEESSEEEEE!!!!")
  }
}


function buyMiner(qualityMiner) {
  const foundMiner = automaticUpgrades.find((autoUpgrade) => autoUpgrade.name == qualityMiner)

  if (cheese >= foundMiner.price) {
    cheese -= foundMiner.price
    autoMinePower += foundMiner.bonus
    foundMiner.quantity++
    drawCheese()
    drawAutoMinePower()
    document.getElementById("number-of-" + qualityMiner).innerText = `${foundMiner.quantity} ${foundMiner.emoji}`
    document.getElementById(qualityMiner + "-bonus").innerText = `⏱️ ${foundMiner.bonus * foundMiner.quantity}`
    foundMiner.price = Math.round(foundMiner.price * 1.2)
    drawNewMinerPurchasePrice(foundMiner.name)

  }
  else {
    window.alert("Go Click on the moon, I hear you can get CHEEEEESEE there.")
  }
}

let intervalValue = 3000
let intervalId = setInterval(collectAutomaticUpgrades, intervalValue);
let speedObject = speedUpgrades[0]

function decreaseIntervalTime() {
  if (cheese >= speedObject.price) {
    cheese -= speedObject.price
    clearInterval(intervalId)
    intervalValue = Math.round(intervalValue * .8)
    speedObject.price = Math.round(speedObject.price * 1.2)
    intervalId = setInterval(collectAutomaticUpgrades, intervalValue)

    speedObject.quantity++
    drawCheese()

    document.getElementById("speed-button").innerHTML = `${speedObject.price} 🧀`
    document.getElementById("speed-level").innerHTML = `${speedObject.quantity} ⏩`
    document.getElementById("speed-value").innerHTML = `➡️${intervalValue} ms`
  } else {
    window.alert("Not Enough Cheese to Pay the Miners to Go Faster")
  }

}




function collectAutomaticUpgrades() {

  let totalUpgradeBonus = 0;
  automaticUpgrades.forEach((autoUpgrade) => {
    totalUpgradeBonus += autoUpgrade.bonus * autoUpgrade.quantity
  })
  cheese += totalUpgradeBonus
  document.getElementById("auto-mine-power").innerText = `⏱️ ${totalUpgradeBonus}`
  drawCheese()
}




//endregion
let secretMoon = planets[1]
function secretUnlock() {
  if (cheese >= secretMoon.price)
    document.getElementById("secret-moon").setAttribute("style", "display: inline")
  document.getElementById("secret-moon-x3").setAttribute("style", "display: inline")
  cheese -= secretMoon.price
  drawCheese()
}

function mine() {
  cheese += minePower
  drawCheese()
}

function mine2() {
  cheese += Math.round(minePower * 5)
  drawCheese()
}

// #region Drawing Things
function drawCheese() {
  cheeseDisplay.innerHTML = `🧀 ${cheese} 🧀`
}

function drawAutoMinePower() {
  autoMinePowerDisplay.innerHTML = `⏱️  ${autoMinePower}`
}

function drawMinePower() {
  minePowerDisplay.innerHTML = `${minePower} 👆`
}

// function drawStonePickaxe() {
//   document.getElementById("number-of-stone-pickaxe").innerText = `${foundAxe.quantity}`
// }

function drawNewMinerPurchasePrice(minerName) {
  const foundMiner = automaticUpgrades.find((autoUpgrade) => autoUpgrade.name == minerName)

  document.getElementById(minerName).innerText = `${foundMiner.price} 🧀`
}

function drawNewAxePurchasePrice(pickaxeName) {
  const foundPickaxe = clickUpgrades.find((pickaxe) => pickaxe.name == pickaxeName)
  document.getElementById(pickaxeName).innerText = `${foundPickaxe.price} 🧀`
}


//#endregion


//#region Start Your Engines 🏎️
drawAutoMinePower()
drawMinePower()
drawCheese()




//#endregion 