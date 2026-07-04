// Interface for a user entity with typed fields
export interface User {
    id: number;
    name: string;
    email: string;
    // Union type: the role can only be one of these values
    role: "student" | "admin" | "instructor";
    isActive: boolean;
    score?: number;
}

// Interface for a course entity
export interface Course {
    code: string;
    title: string;
    units: number;
    semester: string;
}

// Interface for a submission record
export interface Submission {
    id: number;
    studentId: number;
    courseCode: string;
    repoUrl: string;
    submittedAt: Date;
    score?: number;
}

// Union type: grade can only be one of these literal values
export type Grade = "A" | "B" | "C" | "F";

// Union type: ID can be either a number or a string
export type ID = number | string;


