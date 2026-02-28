import { CheckCircle2, Circle, ClipboardList, School, Languages, FileText, PenTool, BarChart3, Stamp } from "lucide-react";

const steps = [
  { label: "Complete Profiling", icon: ClipboardList },
  { label: "Shortlist Colleges", icon: School },
  { label: "English Test", icon: Languages },
  { label: "Documents", icon: FileText },
  { label: "SOP Maker", icon: PenTool },
  { label: "Application Tracking", icon: BarChart3 },
  { label: "Visa Documents", icon: Stamp },
];

interface ProfilerSidebarProps {
  currentStep: number;
}

export function ProfilerSidebar({ currentStep }: ProfilerSidebarProps) {
  return (
    <aside className="w-72 bg-card border-r border-border min-h-screen p-6 hidden lg:block">
      <h2 className="text-lg font-bold text-foreground mb-8">Your Journey</h2>
      <nav className="space-y-1">
        {steps.map((step, i) => {
          const isActive = i === currentStep;
          const isCompleted = i < currentStep;
          const Icon = step.icon;
          return (
            <div
              key={step.label}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : isCompleted
                  ? "text-step-completed"
                  : "text-muted-foreground"
              }`}
            >
              <div className="flex-shrink-0">
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-step-completed" />
                ) : isActive ? (
                  <Icon className="w-5 h-5 text-step-active" />
                ) : (
                  <Circle className="w-5 h-5 text-step-pending" />
                )}
              </div>
              <span>Step {i + 1} — {step.label}</span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
