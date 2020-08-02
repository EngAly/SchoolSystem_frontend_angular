import { Level } from './Level';
import { Guardian } from './Guardian';

export class Student {
    id: number;
    name: string;
    age: number;
    gender: string;
    email: string;
    dob: Date;   // date of birth familiar about birthDate
    joinDate: Date;
    paidFees: number;
    remainFees: number;
    status: string;
    address: string;
    notes: string;
    level: Level;
    guardian: Guardian;
}