export type QuestionType = "radio" | "checkbox" | "text" | "textarea";

export interface Question {
  id: number;
  title: string;
  type: QuestionType;
  options?: string[];
  required?: boolean;
}

export const headerFields: Question[] = [
  { id: 0, title: "Full Name", type: "text", required: true },
  { id: -1, title: "Email Address", type: "text", required: true },
  { id: -2, title: "Mobile Number", type: "text", required: true },
];

export const bachelorsQuestions: Question[] = [
  { id: 1, title: "Preferred Intake", type: "radio", options: ["Jan 26", "Mar 26", "SEP 26", "JULY 26", "Later"], required: true },
  { id: 2, title: "Your overall percentage in 12th Class", type: "text", required: true },
  { id: 3, title: "Subject Combinations in 12th class or IBDP", type: "text", required: true },
  { id: 4, title: "Your Board in 12th Class", type: "radio", options: ["CBSE Board", "ICSE Board", "IB Board", "State Board", "Other Board"], required: true },
  { id: 5, title: "Your IBDP point score", type: "radio", options: ["24-31", "32-38", "39-45", "N/A"], required: true },
  { id: 6, title: "Year of Passing 12th class", type: "text", required: true },
  { id: 7, title: "Number of backlogs", type: "text", required: true },
  { id: 8, title: "Education Gap", type: "radio", options: ["No Gaps", "1 Yr Gap", "2 Yr Gap", "3 Yr Gap", "3 Yr + Gap"], required: true },
  { id: 9, title: "Work Experience", type: "radio", options: ["No", "0-6 Months", "6-12 Months", "12 Months +"], required: true },
  { id: 10, title: "Overall IELTS Score", type: "text", required: true },
  { id: 11, title: "Individual IELTS scores", type: "text" },
  { id: 12, title: "SAT score", type: "radio", options: ["Not Appeared", "1400-1600", "1300-1399", "1200-1300", "1100-1199", "920-1099", "400-919"], required: true },
  { id: 13, title: "Budget Constraint", type: "radio", options: ["No Constraint", "30-40 Lakhs", "20-30 Lakhs", "10-20 Lakhs", "Less than 10 Lakhs"], required: true },
  { id: 14, title: "Country Preference", type: "checkbox", options: ["USA", "Canada", "UK", "Australia", "New Zealand", "Ireland", "Germany", "Rest Europe"], required: true },
  { id: 15, title: "Previous Visa Rejections", type: "radio", options: ["No", "Yes"], required: true },
  { id: 16, title: "Travel History", type: "text" },
  { id: 17, title: "Course Preference", type: "text", required: true },
  { id: 18, title: "University Preference", type: "text" },
  { id: 19, title: "Program Type", type: "radio", options: ["Degree", "Diploma", "Certificate"], required: true },
  { id: 20, title: "Your Expectations", type: "textarea" },
  { id: 21, title: "Emergency Contact Number", type: "text", required: true },
];

export const mastersQuestions: Question[] = [
  { id: 1, title: "Preferred Intake", type: "radio", options: ["Jan 26", "Mar 26", "SEP 26", "JULY 26", "Later"], required: true },
  { id: 2, title: "Your overall percentage in 12th Class", type: "text", required: true },
  { id: 3, title: "Subject Combinations in 12th class or IBDP", type: "text", required: true },
  { id: 4, title: "Your Board in 12th Class", type: "radio", options: ["CBSE Board", "ICSE Board", "IB Board", "State Board", "Other Board"], required: true },
  { id: 5, title: "Your IBDP point score", type: "radio", options: ["24-31", "32-38", "39-45", "N/A"] },
  { id: 6, title: "Graduation Course", type: "text", required: true },
  { id: 7, title: "Graduation Duration", type: "text", required: true },
  { id: 8, title: "Graduation Percentage", type: "text", required: true },
  { id: 9, title: "Year of Passing 12th class", type: "text", required: true },
  { id: 10, title: "Year of Graduation", type: "text", required: true },
  { id: 11, title: "Number of Backlogs", type: "text" },
  { id: 12, title: "Education Gap", type: "radio", options: ["No Gaps", "1 Yr Gap", "2 Yr Gap", "3 Yr Gap", "3 Yr + Gap"], required: true },
  { id: 13, title: "Work Experience", type: "radio", options: ["No", "0-6 Months", "6-12 Months", "12 Months +"], required: true },
  { id: 14, title: "Overall IELTS Score", type: "text", required: true },
  { id: 15, title: "Individual IELTS scores", type: "text" },
  { id: 16, title: "GMAT Score", type: "text" },
  { id: 17, title: "GRE Score", type: "text" },
  { id: 18, title: "Budget Constraint", type: "radio", options: ["No Constraint", "30-40 Lakhs", "20-30 Lakhs", "10-20 Lakhs", "Less than 10 Lakhs"], required: true },
  { id: 19, title: "Country Preference", type: "checkbox", options: ["USA", "Canada", "UK", "Australia", "New Zealand", "Ireland", "Germany", "Rest Europe"], required: true },
  { id: 20, title: "Previous Visa Rejections", type: "radio", options: ["No", "Yes"], required: true },
  { id: 21, title: "Course Preference", type: "text", required: true },
  { id: 22, title: "University Preference", type: "text" },
  { id: 23, title: "Program Type", type: "radio", options: ["Degree", "Diploma", "Certificate"], required: true },
  { id: 24, title: "Your Expectations", type: "textarea" },
  { id: 25, title: "Emergency Contact Number", type: "text", required: true },
];

export const doctoralQuestions: Question[] = [
  { id: 1, title: "Preferred Intake", type: "radio", options: ["Jan 26", "Mar 26", "SEP 26", "JULY 26", "Later"], required: true },
  { id: 2, title: "Your overall percentage in 10th Class", type: "text", required: true },
  { id: 3, title: "Your overall percentage in 12th Class", type: "text", required: true },
  { id: 4, title: "Subject Combinations in 12th class or IBDP", type: "text", required: true },
  { id: 5, title: "Your Board in 12th Class", type: "radio", options: ["CBSE Board", "ICSE Board", "IB Board", "State Board", "Other Board"], required: true },
  { id: 6, title: "Your IBDP point score", type: "radio", options: ["24-31", "32-38", "39-45", "N/A"] },
  { id: 7, title: "Graduation Course", type: "text", required: true },
  { id: 8, title: "Graduation Duration", type: "text", required: true },
  { id: 9, title: "Graduation Percentage", type: "text", required: true },
  { id: 10, title: "Post Graduation Course", type: "text", required: true },
  { id: 11, title: "Post Graduation Duration", type: "text", required: true },
  { id: 12, title: "Post Graduation Percentage", type: "text", required: true },
  { id: 13, title: "Year of Passing 12th class", type: "text", required: true },
  { id: 14, title: "Year of Graduation", type: "text", required: true },
  { id: 15, title: "Year of Post Graduation", type: "text", required: true },
  { id: 16, title: "Number of Backlogs", type: "text" },
  { id: 17, title: "Education Gap", type: "radio", options: ["No Gaps", "1 Yr Gap", "2 Yr Gap", "3 Yr Gap", "3 Yr + Gap"], required: true },
  { id: 18, title: "Work Experience", type: "radio", options: ["No", "0-6 Months", "6-12 Months", "1-2 Years", "2-5 Years", "5+ Years"], required: true },
  { id: 19, title: "Overall IELTS Score", type: "text", required: true },
  { id: 20, title: "Individual IELTS scores", type: "text" },
  { id: 21, title: "GMAT Score", type: "text" },
  { id: 22, title: "GRE Score", type: "text" },
  { id: 23, title: "Budget Constraint", type: "radio", options: ["No Constraint", "30-40 Lakhs", "20-30 Lakhs", "10-20 Lakhs", "Less than 10 Lakhs"], required: true },
  { id: 24, title: "Country Preference", type: "checkbox", options: ["USA", "Canada", "UK", "Australia", "New Zealand", "Ireland", "Germany", "Rest Europe"], required: true },
  { id: 25, title: "Previous Visa Rejections", type: "radio", options: ["No", "Yes"], required: true },
  { id: 26, title: "Travel History", type: "text" },
  { id: 27, title: "Course Preference", type: "text", required: true },
  { id: 28, title: "Specialization Preference", type: "text", required: true },
  { id: 29, title: "University Preference", type: "text" },
  { id: 30, title: "Program Type", type: "radio", options: ["Degree", "Diploma", "Certificate"], required: true },
  { id: 31, title: "Your Expectations", type: "textarea" },
  { id: 32, title: "Emergency Contact Number", type: "text", required: true },
];

export function getQuestionsForProgram(program: string): Question[] {
  switch (program) {
    case "Masters": return mastersQuestions;
    case "Doctoral": return doctoralQuestions;
    default: return bachelorsQuestions;
  }
}
