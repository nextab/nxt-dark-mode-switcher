// This function will get the value of the "nxt-dark-mode" cookie
function getCookie() {
    const result = document.cookie.match('(^|;)\\s*' + 'nxt-dark-mode' + '\\s*=\\s*([^;]+)');
    return result ? result.pop() : null;
}

// This function toggles the dark mode and updates the cookie and checkbox state
function toggleDarkMode() {
    const checkbox = document.querySelector('.dark_mode_switcher');
    const isDarkMode = document.documentElement.classList.contains('dark-mode');
    
    // Toggle dark mode class
    document.documentElement.classList.toggle('dark-mode', !isDarkMode);
    
    // Update the checkbox state
    checkbox.checked = !isDarkMode;
    
    // Update the cookie
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    document.cookie = "nxt-dark-mode=" + (!isDarkMode ? "1" : "0") + ";path=/;expires=" + expiryDate.toUTCString();
}

// Update setInitialState to correctly set the checkbox state
function setInitialState() {
    const checkbox = document.querySelector('.dark_mode_switcher');
    if (checkbox) {
        const isDarkMode = document.documentElement.classList.contains('dark-mode');
        checkbox.checked = isDarkMode;
    }
}

// Add event listener for the dark_mode_container
function addContainerClickListener() {
    const container = document.querySelector('.dark_mode_container');
    if (container) {
        container.addEventListener('click', function(event) {
            // Check if the click is not on the checkbox itself to prevent double toggling
            if (!event.target.classList.contains('dark_mode_switcher')) {
                toggleDarkMode();
            }
        });
    }
}

// Initialize everything
function init() {
    setInitialState();
    addContainerClickListener();
    
    // Add event listener for the checkbox
    const checkbox = document.querySelector('.dark_mode_switcher');
    if (checkbox) {
        checkbox.addEventListener('change', toggleDarkMode);
    }
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}