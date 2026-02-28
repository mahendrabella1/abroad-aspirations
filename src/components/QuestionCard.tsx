import { Question } from "@/data/formQuestions";

interface QuestionCardProps {
  question: Question;
  index: number;
  value: string | string[];
  onChange: (value: string | string[]) => void;
}

export function QuestionCard({ question, index, value, onChange }: QuestionCardProps) {
  const strValue = typeof value === "string" ? value : "";
  const arrValue = Array.isArray(value) ? value : [];

  return (
    <div className="bg-card rounded-lg card-shadow p-6 relative animate-fade-in" style={{ animationDelay: `${index * 40}ms` }}>
      {/* Badge */}
      <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-badge text-badge-foreground flex items-center justify-center text-sm font-bold shadow-md">
        {index + 1}
      </div>

      <h3 className="text-foreground font-semibold mb-4 ml-4">
        {question.title}
        {question.required && <span className="text-destructive ml-1">*</span>}
      </h3>

      {question.type === "radio" && question.options && (
        <div className="flex flex-wrap gap-2 ml-4">
          {question.options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                strValue === opt
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-secondary text-secondary-foreground border-border hover:border-primary/50"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {question.type === "checkbox" && question.options && (
        <div className="flex flex-wrap gap-2 ml-4">
          {question.options.map((opt) => {
            const checked = arrValue.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  if (checked) onChange(arrValue.filter((v) => v !== opt));
                  else onChange([...arrValue, opt]);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  checked
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-secondary text-secondary-foreground border-border hover:border-primary/50"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {question.type === "text" && (
        <input
          type="text"
          value={strValue}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${question.title.toLowerCase()}`}
          className="w-full ml-4 max-w-md px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
        />
      )}

      {question.type === "textarea" && (
        <textarea
          value={strValue}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${question.title.toLowerCase()}`}
          rows={3}
          className="w-full ml-4 max-w-lg px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
        />
      )}
    </div>
  );
}
