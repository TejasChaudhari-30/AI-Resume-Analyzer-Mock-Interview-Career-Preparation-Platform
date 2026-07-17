export const THEME_STORAGE_KEY = "dashboardTheme";

export function getStoredTheme() {
    return localStorage.getItem(THEME_STORAGE_KEY) || "light";
}

export function applyTheme(theme) {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
}

export function persistTheme(theme) {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    applyTheme(theme);
}
