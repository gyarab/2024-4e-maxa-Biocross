
    // Check the user's previous preference
    document.addEventListener("DOMContentLoaded", function() {
        const isDarkMode = localStorage.getItem('dark-mode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        }
    });

    // Function to toggle dark mode
    function toggleDarkMode() {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        localStorage.setItem('dark-mode', isDarkMode); // Save the preference
    }

