// // types/index1.ts

// export interface User {
//     id: number;
//     name: string;
//     email: string;
//     role: "student" | "admin" | "instructor"; // Literal union type as shown in your slides
//     isActive: boolean;
//     score?: number; // Optional field since getUser adds a score property
// }

// export interface Course {
//     code?: string; // Optional if not provided in the function parameters
//     title: string;
//     units: number;
//     semester: string;
// }

// export interface Submission {
//     id: number;
//     studentId: number;
//     courseCode: string;
//     repoUrl: string;
//     submittedAt: Date;
//     score?: number;
// }