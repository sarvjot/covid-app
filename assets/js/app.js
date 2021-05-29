// Navigation Menu Variables

var homeBtn = document.getElementById("home-btn");
var worldBtn = document.getElementById("world-btn");
var currentBtn = document.getElementById("current-btn");
var customBtn = document.getElementById("custom-btn");

var homePage = document.getElementById("home-page");
var worldPage = document.getElementById("world-page");
var currentPage = document.getElementById("current-page");
var customPage = document.getElementById("custom-page");

// Country Section Variables

var countryInput = document.getElementById("country-name");
var submitBtn = document.getElementById("custom-submit-btn");
var customText = document.getElementById("custom-text");
var customCaseAlert = document.getElementById("custom-case-alert");

// World Section Variables

var worldText = document.getElementById("world-text");

// Current Section Variables

var currentText = document.getElementById("current-text");
var currentBtn = document.getElementById("current-btn");
var currentCaseAlert = document.getElementById("current-case-alert");

// Navigation Menu

function hideAll() {
	homePage.classList.add("hidden-page");
	worldPage.classList.add("hidden-page");
	currentPage.classList.add("hidden-page");
	customPage.classList.add("hidden-page");
}

function allUnactive() {
	worldBtn.classList.remove("active");
	currentBtn.classList.remove("active");
	customBtn.classList.remove("active");
}

homeBtn.addEventListener("click", () => {
	hideAll();
	allUnactive();
	homePage.classList.remove("hidden-page");
});
worldBtn.addEventListener("click", () => {
	hideAll();
	allUnactive();
	worldBtn.classList.add("active");
	worldPage.classList.remove("hidden-page");
});
currentBtn.addEventListener("click", () => {
	hideAll();
	allUnactive();
	currentBtn.classList.add("active");
	currentPage.classList.remove("hidden-page");
});
customBtn.addEventListener("click", () => {
	hideAll();
	allUnactive();
	customBtn.classList.add("active");
	customPage.classList.remove("hidden-page");
});

// Country Section

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function removeAllAlerts(x) {
	x.classList.remove("hidden-alert");
	x.classList.remove("text-danger");
	x.classList.remove("text-warning");
	x.classList.remove("text-success");
}

function printCountryData(country, element) {
	function work(data) {
		var obj = data.response[0];
		if (obj == undefined) {
			element.innerText = "Sorry Data not Available for this Country";
			if (element == currentText) {
				removeAllAlerts(currentCaseAlert);
				currentCaseAlert.classList.add("hidden-alert");
			} else if (element == customText) {
				removeAllAlerts(customCaseAlert);
				customCaseAlert.classList.add("hidden-alert");
			}
			return;
		}

		var newCases = 0,
			totalCases = 0,
			activeCases = 0,
			recoveredCases = 0,
			newDeaths = 0,
			totalDeaths = 0;

		if (obj.cases.new != null) newCases += parseInt(obj.cases.new.replace("+", ""));
		if (obj.cases.total != null) totalCases += parseInt(obj.cases.total);
		if (obj.cases.active != null) activeCases += parseInt(obj.cases.active);
		if (obj.cases.recovered != null) recoveredCases += parseInt(obj.cases.recovered);

		if (obj.deaths.new != null) newDeaths += parseInt(obj.deaths.new.replace("+", ""));
		if (obj.deaths.total != null) totalDeaths += parseInt(obj.deaths.total);

		var str = "";
		str += "New Cases : " + numberWithCommas(newCases) + "\n";
		str += "New Deaths : " + numberWithCommas(newDeaths) + "\n";
		str += "Total Cases : " + numberWithCommas(totalCases) + "\n";
		str += "Total Deaths : " + numberWithCommas(totalDeaths) + "\n";
		str += "Active Cases : " + numberWithCommas(activeCases) + "\n";
		str += "Recovered Cases : " + numberWithCommas(recoveredCases) + "\n";

		element.innerText = str;

		// console.log(obj.population);
		var isRed = newCases / obj.population > 0.0001;
		var isYellow = newCases / obj.population > 0.00005;

		if (element == currentText) {
			removeAllAlerts(currentCaseAlert);
			if (isRed == true) {
				currentCaseAlert.classList.add("text-danger");
				currentCaseAlert.innerText = "RED ZONE";
			} else if (isYellow == true) {
				currentCaseAlert.classList.add("text-warning");
				currentCaseAlert.innerText = "YELLOW ZONE";
			} else {
				currentCaseAlert.classList.add("text-success");
				currentCaseAlert.innerText = "GREEN ZONE";
			}
		} else if (element == customText) {
			removeAllAlerts(customCaseAlert);
			if (isRed == true) {
				customCaseAlert.classList.add("text-danger");
				customCaseAlert.innerText = "RED ZONE";
			} else if (isYellow == true) {
				customCaseAlert.classList.add("text-warning");
				customCaseAlert.innerText = "YELLOW ZONE";
			} else {
				customCaseAlert.classList.add("text-success");
				customCaseAlert.innerText = "GREEN ZONE";
			}
		}
	}

	$.ajax({
		url: "https://covid-193.p.rapidapi.com/history?country=" + country.toLowerCase() + "&day=2021-05-21",
		method: "GET",
		success: work,
		error: () => {
			alert("API Error");
		},
		headers: {
			"x-rapidapi-key": configRapidApi["x-rapidapi-key"],
			"x-rapidapi-host": configRapidApi["x-rapidapi-host"],
		},
	});
}

countryInput.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		printCountryData(countryInput.value, customText);
	}
});

submitBtn.addEventListener("click", () => {
	printCountryData(countryInput.value, customText);
});

// World Section

function printWorldData() {
	function work(data) {
		var objList = data.response;
		var newCases = 0,
			totalCases = 0,
			activeCases = 0,
			recoveredCases = 0,
			newDeaths = 0,
			totalDeaths = 0;
		objList.forEach((obj) => {
			if (obj.continent != obj.country) {
				if (obj.cases.new != null) newCases += parseInt(obj.cases.new.replace("+", ""));
				if (obj.cases.total != null) totalCases += parseInt(obj.cases.total);
				if (obj.cases.active != null) activeCases += parseInt(obj.cases.active);
				if (obj.cases.recovered != null) recoveredCases += parseInt(obj.cases.recovered);

				if (obj.deaths.new != null) newDeaths += parseInt(obj.deaths.new.replace("+", ""));
				if (obj.deaths.total != null) totalDeaths += parseInt(obj.deaths.total);
			}
		});

		var str = "";
		str += "New Cases : " + numberWithCommas(newCases) + "\n";
		str += "New Deaths : " + numberWithCommas(newDeaths) + "\n";
		str += "Total Cases : " + numberWithCommas(totalCases) + "\n";
		str += "Total Deaths : " + numberWithCommas(totalDeaths) + "\n";
		str += "Active Cases : " + numberWithCommas(activeCases) + "\n";
		str += "Recovered Cases : " + numberWithCommas(recoveredCases) + "\n";

		worldText.innerText = str;
	}

	$.ajax({
		url: "https://covid-193.p.rapidapi.com/statistics",
		method: "GET",
		success: work,
		error: () => {
			alert("API Error");
		},
		headers: {
			"x-rapidapi-key": configRapidApi["x-rapidapi-key"],
			"x-rapidapi-host": configRapidApi["x-rapidapi-host"],
		},
	});
}

printWorldData();

// Getting Client's Country(Geolocation)

var lat, long;
var country;

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		alert("Geolocation is not supported by this browser.");
	}
}

function showPosition(position) {
	function work(data) {
		country = data.address.country;
		printCountryData(country, currentText);
	}

	lat = position.coords.latitude;
	long = position.coords.longitude;

	$.ajax({
		url:
			"https://us1.locationiq.com/v1/reverse.php?key=" + configCurrent["location-iq-api-key"] + "&lat=" + lat + "&lon=" + long + "&format=json",
		method: "GET",
		success: work,
		error: () => {
			alert("API Error");
		},
	});
}

currentBtn.addEventListener("click", getLocation);
