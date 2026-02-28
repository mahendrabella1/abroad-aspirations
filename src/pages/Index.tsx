import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, BookOpen, FlaskConical, ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/onegrasp_logo.png";

const programs = [
  { label: "Bachelors", icon: BookOpen, desc: "Undergraduate Programs" },
  { label: "Masters", icon: GraduationCap, desc: "Postgraduate Programs" },
  { label: "Doctoral", icon: FlaskConical, desc: "PhD & Research" },
];

const Index = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (selected) {
      navigate(`/profiler?program=${selected}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="w-full px-6 md:px-12 py-4 flex items-center justify-between bg-card border-b border-border sticky top-0 z-50">
        <img src={logo} alt="OneGrasp" className="h-10" />
        <nav className="flex items-center gap-2">
          <button className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            Home
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3 animate-fade-in">
            Give us A Chance
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-primary-foreground mb-4 leading-tight animate-fade-in" style={{ animationDelay: "100ms" }}>
            To build your journey
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-12 animate-fade-in" style={{ animationDelay: "200ms" }}>
            Choose, What do you want to study Abroad?
          </p>

          {/* Program circles */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {programs.map((prog, i) => {
              const isSelected = selected === prog.label;
              const Icon = prog.icon;
              return (
                <button
                  key={prog.label}
                  onClick={() => setSelected(prog.label)}
                  className={`group flex flex-col items-center gap-3 animate-scale-in`}
                  style={{ animationDelay: `${300 + i * 100}ms` }}
                >
                  <div
                    className={`w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                      isSelected
                        ? "border-accent bg-accent/20 shadow-lg shadow-accent/20 scale-110"
                        : "border-primary-foreground/30 bg-primary-foreground/10 group-hover:border-accent/60 group-hover:scale-105"
                    }`}
                  >
                    <Icon className={`w-10 h-10 md:w-12 md:h-12 transition-colors ${isSelected ? "text-accent" : "text-primary-foreground/70 group-hover:text-accent"}`} />
                  </div>
                  <span className={`text-sm md:text-base font-semibold transition-colors ${isSelected ? "text-accent" : "text-primary-foreground/80"}`}>
                    {prog.label}
                  </span>
                  <span className="text-xs text-primary-foreground/50">{prog.desc}</span>
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <button
            onClick={handleGetStarted}
            disabled={!selected}
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold transition-all duration-300 animate-fade-in ${
              selected
                ? "hero-gradient text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
            style={{ animationDelay: "600ms" }}
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Index;
