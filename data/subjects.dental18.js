/**
 * Dental Pulse – Edition 18
 * Official Subject Mapping
 * LOCKED FILE – DO NOT EDIT AFTER CREATION
 */

export const DENTAL_PULSE_18_SUBJECTS = [
  {
    id: "oral_anatomy",
    name: "Oral Anatomy",
    short: "OA",
    order: 1
  },
  {
    id: "oral_histology",
    name: "Oral Histology",
    short: "OH",
    order: 2
  },
  {
    id: "oral_embryology",
    name: "Oral Embryology",
    short: "OE",
    order: 3
  },
  {
    id: "oral_pathology",
    name: "Oral Pathology",
    short: "OP",
    order: 4
  },
  {
    id: "oral_microbiology",
    name: "Oral Microbiology",
    short: "OM",
    order: 5
  },
  {
    id: "oral_medicine",
    name: "Oral Medicine & Radiology",
    short: "OMR",
    order: 6
  },
  {
    id: "periodontology",
    name: "Periodontology",
    short: "Perio",
    order: 7
  },
  {
    id: "prosthodontics",
    name: "Prosthodontics",
    short: "Pros",
    order: 8
  },
  {
    id: "conservative",
    name: "Conservative Dentistry",
    short: "Cons",
    order: 9
  },
  {
    id: "endodontics",
    name: "Endodontics",
    short: "Endo",
    order: 10
  },
  {
    id: "oral_surgery",
    name: "Oral & Maxillofacial Surgery",
    short: "OMFS",
    order: 11
  },
  {
    id: "orthodontics",
    name: "Orthodontics",
    short: "Ortho",
    order: 12
  },
  {
    id: "pedodontics",
    name: "Pedodontics",
    short: "Pedo",
    order: 13
  },
  {
    id: "public_health",
    name: "Public Health Dentistry",
    short: "PHD",
    order: 14
  },
  {
    id: "dental_materials",
    name: "Dental Materials",
    short: "DM",
    order: 15
  },
  {
    id: "general_anatomy",
    name: "General Anatomy",
    short: "GA",
    order: 16
  },
  {
    id: "general_medicine",
    name: "General Medicine",
    short: "GM",
    order: 17
  },
  {
    id: "general_surgery",
    name: "General Surgery",
    short: "GS",
    order: 18
  }
];

/**
 * Helper Maps (Used Internally)
 */
export const SUBJECT_BY_ID = Object.fromEntries(
  DENTAL_PULSE_18_SUBJECTS.map(s => [s.id, s])
);

export const SUBJECT_NAMES = DENTAL_PULSE_18_SUBJECTS.map(s => s.name);
