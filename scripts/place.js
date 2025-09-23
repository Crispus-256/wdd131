document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Wind Chill Calculation
function calculateWindChill(temperature, windSpeed) {
    if ((temperature <= 10 && windSpeed > 4.8) || (temperature <= 50 && windSpeed > 3)) {
        return Math.round(
            13.12 +
            0.6215 * temperature -
            11.37 * Math.pow(windSpeed, 0.16) +
            0.3965 * temperature * Math.pow(windSpeed, 0.16)
        );
    } else {
        return "N/A";
    }
}

// Static values for temperature and wind speed
const temperature = 25; // in °C
const windSpeed = 10; // in km/h

// Display wind chill factor
document.getElementById('windchill').textContent = calculateWindChill(temperature, windSpeed);