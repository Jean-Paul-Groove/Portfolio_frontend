export function updateThemeColors(themeName: string) {
	const newThemeName = themeName == "light" ? "dark" : "light";
	const root = document.querySelector(":root") as HTMLHtmlElement;
	const newTheme = {
		themeName: newThemeName,
		currentColor: `var(--${newThemeName}Color)`,
		currentBackground: `var(--${newThemeName}Background)`,
		secondColor: `var(--${themeName}Color)`,
		secondBackground: `var(--${themeName}Background)`,
	};
	if (root){root.style.setProperty(`--secondColor`, newTheme.secondColor);
	root.style.setProperty(`--secondBackground`, newTheme.secondBackground);
	root.style.setProperty(`--currentColor`, newTheme.currentColor);
	root.style.setProperty(`--currentBackground`, newTheme.currentBackground);}
	

	return newTheme;
}
