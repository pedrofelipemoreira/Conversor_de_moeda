function toggleDropdown() {
    const dropdownContent = document.getElementById("dropdownContent");
    const arrow = document.querySelector(".arrow");

    if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
        arrow.classList.remove("arrow-up");
    } else {
        dropdownContent.style.display = "block";
        arrow.classList.add("arrow-up");
    }
}

//para pesquisar as cryptos
function filterCryptos() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toUpperCase();
    const options = document.querySelectorAll('.crypto-option');

    options.forEach(option => {
        const txtValue = option.textContent || option.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            option.style.display = '';
        } else {
            option.style.display = 'none';
        }
    });
}