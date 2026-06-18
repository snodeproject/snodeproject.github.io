const root = document.documentElement;
const button = document.getElementById("themeButton");

function setTheme(theme) {
    if (theme === "auto") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        theme = prefersDark ? "dark" : "light";
    }

    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
}

function initTheme() {
    const saved = localStorage.getItem("theme") || "auto";
    setTheme(saved);
}

button.addEventListener("click", () => {
    const current = localStorage.getItem("theme") || "auto";

    const next =
        current === "light" ? "dark" :
        current === "dark" ? "auto" :
        "light";

    setTheme(next);
});

initTheme();
