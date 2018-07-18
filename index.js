const chalk = require("chalk");

const rngFish = () => {
	let random = Math.random()*100;
	if(random<=0.15) {
		return "rare";
	} else if(random<=10) {
		return "uncommon";
	} else if(random<=34.85) {
		return "common";
	} else {
		return "garbage";
	}
};

let c = {};
c.common = chalk.cyan("Common");
c.uncommon = chalk.yellow("Uncommon");
c.rare = chalk.red("Rare");
c.garbage = chalk.gray("Garbage");

let p = {};
p.common = 12;
p.uncommon = 20;
p.rare = 1250;
p.garbage = 6;

var delay = 50;
var sellDelay = 1000;
var credits = 1000;
var sellRare = true;
var inv = {common: 0, uncommon:0, rare: 0, garbage: 0};

let i = 0;

const logCatch = (str) => {
	console.log(`[#${i}] Got ${c[str]} (¥${p[str]}) [¥${credits} left]`);
};

const logInventory = () => {
	let res = [];

	Object.keys(inv).forEach(k => {
		res.push(`${c[k]}: ${inv[k]} (¥${inv[k]*p[k]})`);
	});

	console.log(`[${credits}] ` + res.join(", ") + "\n");
};

const invPrice = () => inv.common*p.common + inv.uncommon*p.uncommon + inv.garbage*p.garbage + (sellRare?inv.rare*p.rare:0);

const sellFish = () => {
	credits+=invPrice();
	inv.common=0;
	inv.uncommon=0;
	inv.garbage=0;
	sellRare?inv.rare=0:inv.rare=inv.rare;
};

const doFish = () => {
	if(credits<10) {
		if(invPrice()<10) {
			return console.log(chalk.redBright("Ran out of money! Restart the script lol"));
		} else {
			console.log(`\nRan out of money, selling fish... (¥${invPrice()} value)\n`);
			logInventory();
			setTimeout(() => {
				sellFish();
				doFish();
			}, sellDelay);
		}
		return;
	}

	credits-=10;
	i++;

	let caught = rngFish();
	logCatch(caught);
	inv[caught]++;
	setTimeout(doFish, delay);
};

doFish();