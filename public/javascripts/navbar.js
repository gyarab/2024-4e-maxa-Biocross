const toggleBtn = document.querySelector('.toggle_btn')
        const toggleBtnIcon = document.querySelector('.toggle_btn i')
        const dropDownMenu = document.querySelector('.dropdown_menu')

        toggleBtn.onclick = function () {
            const isOpen = dropDownMenu.classList.toggle('open'); // Přepnutí třídy
            dropDownMenu.style.height = isOpen ? dropDownMenu.scrollHeight + "px" : "0";
            
            toggleBtnIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        }