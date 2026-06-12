import type { Theme } from "../types/theme";

type NavigationProps = {
  currentView: "typing" | "analytics" | "groupplay";
  onViewChange: (view: "typing" | "analytics" | "groupplay") => void;
  theme: Theme;
  isFocusMode?: boolean;
};

const Navigation = ({ currentView, onViewChange, theme, isFocusMode }: NavigationProps) => {
  const navItems = [
    { id: "typing", label: "Typing Test" },
    { id: "analytics", label: "Analytics" },
    { id: "groupplay", label: "Group Play" },
  ] as const;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-6">
        <div className="flex items-center gap-6 min-w-[180px]">
          <h1 className={`text-3xl font-bold ${theme.accent}`}>TypeIt</h1>
        </div>

        <div 
          className={`flex-1 flex items-center justify-center gap-8 transition-opacity duration-300 ${
            isFocusMode ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {navItems.map((item) => {
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() =>
                  onViewChange(item.id as "typing" | "analytics" | "groupplay")
                }
                className={`relative text-sm font-medium transition-all duration-200 pb-2 ${
                  isActive ? theme.accent : theme.sub
                }`}
              >
                {item.label}

                {isActive && (
                  <span
                    className={`absolute left-0 bottom-0  w-full rounded-full ${theme.caret}`}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-end min-w-fit"></div>
      </div>
    </div>
  );
};

export default Navigation;
