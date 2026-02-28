import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { ProfilerSidebar } from "@/components/ProfilerSidebar";
import { QuestionCard } from "@/components/QuestionCard";
import { getQuestionsForProgram, headerFields } from "@/data/formQuestions";
import { ArrowLeft, Send, Menu, X } from "lucide-react";

// EmailJS Configuration - Replace with your credentials from https://emailjs.com
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID"; // e.g., "service_abc123"
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // e.g., "template_xyz789"
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // e.g., "abcdefghijk123456";

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const errs = validate();
    if (errs.length > 0) {
      setErrors(errs);
      toast.error(`Please fill in: ${errs.slice(0, 3).join(", ")}${errs.length > 3 ? ` and ${errs.length - 3} more` : ""}`);
      return;
    }
    setErrors([]);
    setIsSubmitting(true);

    const userEmail = answers["Email Address"] as string;
    const userName = answers["Full Name"] as string;

    try {
      // Send form data to admin (support@onegrasp.com)
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "68a9e3ab-4678-4d09-9a42-6d91c440e355",
          subject: `New ${program} Profile Submission - ${userName}`,
          from_name: userName,
          replyto: userEmail,
          // Structured form data
          "Program Type": program,
          "Full Name": userName,
          "Email Address": userEmail,
          "Mobile Number": answers["Mobile Number"] || "",
          ...Object.fromEntries(
            Object.entries(answers)
              .filter(([key]) => !["Full Name", "Email Address", "Mobile Number"].includes(key))
              .map(([key, value]) => [key, Array.isArray(value) ? value.join(", ") : value])
          ),
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        // Send confirmation email to user via EmailJS
        try {
          await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
              to_email: userEmail,
              to_name: userName,
              program: program,
              message: `Dear ${userName},\n\nThank you for submitting your profile for the ${program} program.\n\nThe OneGrasp team will be reaching out to you shortly to assist you further. In the meantime, you may contact us for a complimentary consultation at +91-89777 60441 / 42 / 43 or email us at support@onegrasp.com.\n\nYou may also visit our website, onegrasp.com, to explore study abroad opportunities and learn more about our services.\n\nBest regards,\nOneGrasp Team`,
            },
            EMAILJS_PUBLIC_KEY
          );
        } catch (emailError) {
          console.log("EmailJS error (confirmation email):", emailError);
          // Don't fail the submission if email fails
        }

        toast.success(
          "Profile submitted successfully! Check your email for confirmation.",
          { duration: 5000 }
        );
        localStorage.removeItem(STORAGE_KEY);
        // Show thank you message
        toast.info(
          "You may also reach us at +91-89777 60441/42/43 or visit onegrasp.com",
          { duration: 8000 }
        );
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      toast.error("Failed to submit profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full hero-gradient text-primary-foreground font-bold text-base hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? "Submitting..." : "Submit Profile"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
