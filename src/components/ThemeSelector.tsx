import themes from "../data/theme";

import type { Theme } from "../types/theme";

type ThemeSelectorProps = {
  themeName: string;
  setThemeName: React.Dispatch<React.SetStateAction<string>>;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

const themeButtons = [
  { name: "default" },
  { name: "ocean" },
  { name: "forest" },
  { name: "dracula" },
  { name: "tokyo" },
  { name: "gruvbox" },
  { name: "catppuccin" },
];

const ThemeSelector = ({
  themeName,
  setThemeName,
  setTheme,
}: ThemeSelectorProps) => {
  return (
    <div className="flex gap-3 items-center">
      {themeButtons.map((themeItem) => {
        const themeColors = themes[themeItem.name as keyof typeof themes];
        return (
          <button
            key={themeItem.name}
            onClick={() => {
              setTheme(themeColors);
              setThemeName(themeItem.name);
            }}
            className={`
              w-8
              h-8
              rounded-full
              transition-all
              duration-200
              flex-shrink-0
              ${themeColors.accent.replace("text-", "bg-")}
              ${
                themeName === themeItem.name
                  ? "scale-110 ring-2 ring-white/40"
                  : "opacity-60 hover:opacity-100"
              }
            `}
            title={themeItem.name}
          />
        );
      })}
    </div>
  );
};

export default ThemeSelector;
