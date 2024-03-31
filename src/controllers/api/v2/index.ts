import * as semesterHandler from "./semester";
import * as oneCourseHander from "./oneCourse";
import * as coursesHandler from "./courses";
import * as departmentHander from "./departments";
import * as sectionHander from "./sections";

export const semesters = semesterHandler.index;
export const oneCourse = oneCourseHander.index;
export const courses = coursesHandler.index;
export const departments = departmentHander.index;
export const sections = sectionHander.index;
