import { Subject } from './Subject';

export class Season {
    name: string;
    floor: number;
    maxSize: number;
    currentSize: number;
    subjects: Subject[]
}