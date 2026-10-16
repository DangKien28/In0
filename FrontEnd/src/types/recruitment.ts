export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  score: number;
  experience: string;
  skills: string[];
  strengths: string;
  evidence: string;
}

export interface PassCandidate {
  name: string;
  candidateId: string;
  email: string;
  personalEmail: string;
  phone: string;
  department: string;
  position: string;
  roleLevel: string;
  startDate: string;
  salaryOffer: string;
  employeeId: string;
  targetSystem: string;
}
