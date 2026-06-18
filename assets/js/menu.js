const menuButton = document.getElementById("menuButton");
const navbarLinks = document.getElementById("navbarLinks");

menuButton.addEventListener("click", () => {
    navbarLinks.classList.toggle("open");
});
