interface Tab {
  id: string;
  label: string;
}

interface PillTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
}

export function PillTabs({ tabs, activeTab, onTabChange, className = '' }: PillTabsProps) {
  return (
    <div className={`pill-tabs-container ${className}`.trim()}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`pill-tab ${activeTab === tab.id ? 'active' : ''}`}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
