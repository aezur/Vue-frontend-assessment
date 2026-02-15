// Form field definitions for campaign forms
export const BASIC_FIELDS = {
  name: { name: "name", label: "Name", type: "text" },
  status: {
    name: "status",
    label: "Status",
    type: "select",
    options: ["draft", "active", "paused", "completed"],
  },
  budget: {
    name: "budget",
    label: "Budget",
    type: "number",
    min: 0,
    step: 0.01,
  },
  spent: { name: "spent", label: "Spent", type: "number", min: 0, step: 0.01 },
  startDate: { name: "startDate", label: "Start Date", type: "date" },
  endDate: { name: "endDate", label: "End Date", type: "date" },
  description: { name: "description", label: "Description", type: "textarea" },
  targetAudience: {
    name: "targetAudience",
    label: "Target Audience",
    type: "textarea",
  },
};

export const CREATE_FORM_ROWS = [
  [BASIC_FIELDS.name, BASIC_FIELDS.status],
  [BASIC_FIELDS.budget, BASIC_FIELDS.spent],
  [BASIC_FIELDS.startDate, BASIC_FIELDS.endDate],
];

export const EDIT_FORM_ROWS = [
  [BASIC_FIELDS.name, BASIC_FIELDS.status],
  [BASIC_FIELDS.startDate, BASIC_FIELDS.endDate],
  [BASIC_FIELDS.budget, BASIC_FIELDS.targetAudience],
];

export const CREATE_SINGLE_FIELDS = [
  BASIC_FIELDS.description,
  BASIC_FIELDS.targetAudience,
];

export const EDIT_SINGLE_FIELDS = [BASIC_FIELDS.description];
