import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ProfilerSidebar } from "@/components/ProfilerSidebar";
import { QuestionCard } from "@/components/QuestionCard";
import { getQuestionsForProgram, headerFields } from "@/data/formQuestions";
import { ArrowLeft, Send, Menu, X } from "lucide-react";

type Answers = Record<string, string | string[]>;

const STORAGE_KEY = "onegrasp_profiler_draft";

export default function ProfilerPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const program = searchParams.get("program") || "Bachelors";
  const questions = getQuestionsForProgram(program);

  const [answers, setAnswers] = useState<Answers>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    }, 500);
    return () => clearTimeout(timer);
  }, [answers]);

  const setAnswer = useCallback((key: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }, []);

  const validate = () => {
    const errs: string[] = [];
    // Header
    if (!answers["Full Name"]) errs.push("Full Name");
    if (!answers["Email Address"]) errs.push("Email Address");
    if (!answers["Mobile Number"]) errs.push("Mobile Number");

    questions.forEach((q) => {
      if (q.required) {
        const v = answers[q.title];
        if (!v || (Array.isArray(v) && v.length === 0)) {
          errs.push(q.title);
        }
      }
    });
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (errs.length > 0) {
      setErrors(errs);
      toast.error(`Please fill in: ${errs.slice(0, 3).join(", ")}${errs.length > 3 ? ` and ${errs.length - 3} more` : ""}`);
      return;
    }
    setErrors([]);
    toast.success("Profile submitted successfully! We'll be in touch soon.");
    localStorage.removeItem(STORAGE_KEY);
  };

  const answeredCount = questions.filter((q) => {
    const v = answers[q.title];
    return v && (typeof v === "string" ? v.trim() !== "" : v.length > 0);
  }).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop sidebar */}
      <ProfilerSidebar currentStep={0} />

      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setShowMobileSidebar(!showMobileSidebar)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-full bg-card card-shadow flex items-center justify-center text-foreground"
      >
        {showMobileSidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
      {showMobileSidebar && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-foreground/30" onClick={() => setShowMobileSidebar(false)} />
          <div className="relative w-72">
            <ProfilerSidebar currentStep={0} />
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-foreground">{program} Profiling</h1>
              <p className="text-xs text-muted-foreground">Step 1 — Complete your profile</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-muted-foreground hidden sm:block">{progress}% complete</div>
            <div className="w-32 h-2 rounded-full bg-muted overflow-hidden hidden sm:block">
              <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
          {/* Header fields */}
          <div className="bg-card rounded-lg card-shadow p-6 space-y-5">
            <h2 className="text-lg font-bold text-foreground">Personal Information</h2>
            <p className="text-sm text-muted-foreground">Your response and further instructions will be sent to this email.</p>
            {headerFields.map((field) => (
              <div key={field.title}>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {field.title} {field.required && <span className="text-destructive">*</span>}
                </label>
                <input
                  type={field.title.includes("Email") ? "email" : field.title.includes("Mobile") ? "tel" : "text"}
                  value={(answers[field.title] as string) || ""}
                  onChange={(e) => setAnswer(field.title, e.target.value)}
                  placeholder={`Enter ${field.title.toLowerCase()}`}
                  className={`w-full px-4 py-2.5 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all ${
                    errors.includes(field.title) ? "border-destructive" : "border-input"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {questions.map((q, i) => (
              <QuestionCard
                key={q.id}
                question={q}
                index={i}
                value={answers[q.title] || (q.type === "checkbox" ? [] : "")}
                onChange={(val) => setAnswer(q.title, val)}
              />
            ))}
          </div>

          {/* Submit */}
          <div className="flex justify-center pb-12">
            <button
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full hero-gradient text-primary-foreground font-bold text-base hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Send className="w-5 h-5" />
              Submit Profile
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
