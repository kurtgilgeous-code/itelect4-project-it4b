// import type { Course, Grade, User } from "../types/index";

// // Type annotation for primitive types like number and string
// export function getUser(id: number): User {
//     const user: User = {
//         id,
//         name: "Juan dela Cruz",
//         email: "juan@example.com",
//         role: "student",
//         isActive: true,
//         score: 95.5,
//     };

//     return user;
// }

// // Union type example: the function returns one of the allowed grade values
// export function calculateGrade(score: number, maxScore: number): Grade {
//     const percentage: number = (score / maxScore) * 100;

//     // Type narrowing with a conditional check
//     if (percentage >= 90) return "A";
//     if (percentage >= 80) return "B";
//     if (percentage >= 70) return "C";
//     return "F";
// }

// // Special type example: void is not used here, but this function returns a string
// export function formatCourse(name: string, units: number, semester: string): string {
//     return `${name} (${units} units) - ${semester}`;
// }

// const user: User = getUser(1);
// const course: Course = {
//     code: "ITELECT4",
//     title: "IT Elective 4",
//     units: 3,
//     semester: "1st Semester",
// };

// console.log(user);
// console.log(calculateGrade(85, 100));
// console.log(formatCourse(course.title, course.units, course.semester));