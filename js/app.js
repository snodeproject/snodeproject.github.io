// ---------------------
// THEME SYSTEM
// ---------------------
const themeToggle = document.getElementById("themeToggle");

function setTheme(mode) {
  if (mode === "auto") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
  } else {
    document.documentElement.setAttribute("data-theme", mode);
  }
  localStorage.setItem("theme", mode);
}

// init theme
setTheme(localStorage.getItem("theme") || "auto");

themeToggle.onclick = () => {
  const current = localStorage.getItem("theme") || "auto";
  const next = current === "dark" ? "light" : current === "light" ? "auto" : "dark";
  setTheme(next);
};

// ---------------------
// i18n SYSTEM
// ---------------------
let translations = {};

async function loadLang(lang) {
  const res = await fetch(`i18n/${lang}.json`);
  translations = await res.json();

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = translations[key];
  });

  localStorage.setItem("lang", lang);
}

document.getElementById("langSwitcher").onchange = (e) => {
  loadLang(e.target.value);
};

// init language
loadLang(localStorage.getItem("lang") || "it");


const hamburger = document.getElementById("hamburger");
const drawer = document.getElementById("drawer");

function closeDrawer() {
  drawer.classList.remove("active");
}

hamburger.addEventListener("click", () => {
  drawer.classList.toggle("active");
});

// chiudi cliccando link
drawer.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", closeDrawer);
});

// chiudi cliccando fuori (bonus UX)
document.addEventListener("click", (e) => {
  if (!drawer.contains(e.target) && !hamburger.contains(e.target)) {
    closeDrawer();
  }
});


let selectedVersion = null;

const versions = document.querySelectorAll(".version");
const selectedText = document.getElementById("selectedVersion");
const downloadBtn = document.getElementById("downloadBtn");

versions.forEach(v => {
  const btn = v.querySelector(".select-btn");

  btn.addEventListener("click", () => {
    selectedVersion = v.dataset.version;

    selectedText.textContent = "v" + selectedVersion;

    downloadBtn.href = `/zips/${selectedVersion}-id.zip`;
    downloadBtn.removeAttribute("disabled");

    // highlight selected
    versions.forEach(x => x.style.outline = "none");
    v.style.outline = "2px solid var(--accent)";
  });
});
