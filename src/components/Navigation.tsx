type NavigationProps = {
  currentView: "typing" | "analytics" | "groupplay";
  onViewChange: (view: "typing" | "analytics" | "groupplay") => void;
};

const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  const navItems = [
    { id: "typing", label: "Typing Test" },
    { id: "analytics", label: "Analytics" },
    { id: "groupplay", label: "Group Play" },
  ] as const;

  return (
    <div className="fixed top-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-purple-400">TypeIt</h1>

        <div className="flex gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() =>
                onViewChange(item.id as "typing" | "analytics" | "groupplay")
              }
              className={`
                px-4
                py-2
                rounded-lg
                transition-all
                duration-200
                font-medium
                text-sm
                ${
                  currentView === item.id
                    ? "bg-purple-500 text-white shadow-lg"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
