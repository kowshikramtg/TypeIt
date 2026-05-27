import themes from "../data/theme";

type ThemeSelectorProps = {
  themeName: string;
  setThemeName: React.Dispatch<React.SetStateAction<string>>;
  setTheme: React.Dispatch<any>;
};

const themeButtons = [
  {
    name: "default",
    color: "bg-yellow-400",
  },

  {
    name: "ocean",
    color: "bg-cyan-400",
  },

  {
    name: "forest",
    color: "bg-green-400",
  },

  {
    name: "dracula",
    color: "bg-purple-400",
  },

  {
    name: "tokyo",
    color: "bg-blue-500",
  },

  {
    name: "gruvbox",
    color: "bg-yellow-600",
  },

  {
    name: "catppuccin",
    color: "bg-pink-300",
  },
];

const ThemeSelector = ({
  themeName,
  setThemeName,
  setTheme,
}: ThemeSelectorProps) => {
  return (
    <div className="flex gap-4 mb-10">
      {themeButtons.map((themeItem) => (
        <button
          key={themeItem.name}
          onClick={() => {
            setTheme(themes[themeItem.name as keyof typeof themes]);

            setThemeName(themeItem.name);
          }}
          className={`
            w-5
            h-5
            rounded-full
            cursor-pointer
            transition-all
            duration-200
            ${themeItem.color}
            ${themeName === themeItem.name ? "scale-125" : "opacity-70"}
          `}
        />
      ))}
    </div>
  );
};

export default ThemeSelector;
