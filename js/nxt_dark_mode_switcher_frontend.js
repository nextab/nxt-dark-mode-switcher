// This function will get the value of the "nxt-dark-mode" cookie
function getCookie() {
	// Use a regular expression to extract the value directly
	const result = document.cookie.match('(^|;)\\s*' + 'nxt-dark-mode' + '\\s*=\\s*([^;]+)');
	return result ? result.pop() : null;
}

// This function toggles the dark mode and updates the cookie and checkbox state
function toggleDarkMode() {
	const checkbox = document.querySelector('.dark_mode_switcher');
	const isDarkMode = document.body.classList.contains('dark-mode');
	// Toggle the class based on the current state
	document.body.classList.toggle('dark-mode', !isDarkMode);
	// Update the checkbox state
	checkbox.checked = !isDarkMode;
	// Update the cookie
	const expiryDate = new Date();
	expiryDate.setFullYear(expiryDate.getFullYear() + 1);
	document.cookie = "nxt-dark-mode=" + (!isDarkMode ? "1" : "0") + ";path=/;expires=" + expiryDate.toUTCString();
}

// This function will set the initial state based on the system preference or cookie
function setInitialState() {
	const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const darkModeCookie = getCookie('nxt-dark-mode');
	const initialState = darkModeCookie !== null ? darkModeCookie === "1" : prefersDarkScheme;
	document.body.classList.toggle('dark-mode', initialState);
	document.querySelector('.dark_mode_switcher').checked = initialState;
}

// Add event listener for the dark_mode_container
function addContainerClickListener() {
	const container = document.querySelector('.dark_mode_container');
	container.addEventListener('click', function(event) {
		// Check if the click is not on the checkbox itself to prevent double toggling
		if (!event.target.classList.contains('dark_mode_switcher')) {
			toggleDarkMode();
		}
	});
}

// Add event listener for the checkbox
document.querySelector('.dark_mode_switcher').addEventListener('change', toggleDarkMode);

// Set the initial state when the page loads and add click listener to the container
document.addEventListener('DOMContentLoaded', function() {
	setInitialState();
	addContainerClickListener();
});