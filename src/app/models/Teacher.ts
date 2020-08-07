import { Level } from './Level';

export class Teacher {
  id: number;
  name: string;
  age: number;
  address: string;
  subject: string;
  phone: string;
  email: string;
  ssn: string;
  maritalStatus: string;
  gender: string;
  ex: number;  // yearsOfExperience
  dob: Date;   // date of birth
  doh: Date;      // date of hire
  salary: number;
  graduateDate: string;
  qualification: string;
  notes: string;
  levels: Level[];
}