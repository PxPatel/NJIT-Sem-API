import { Database, Tables } from "./database.types";

export type SectionType = Database["public"]["Tables"]["sections"]["Row"];
export type CourseType = Database["public"]["Tables"]["courses"]["Row"];

export interface SectionsWithCourse extends Omit<SectionType, "course"> {
    course: CourseType;
}

export type CourseWithSections =
    | (CourseType & {
          sections: SectionType[];
      })
    | Record<string, never>;

export type AltSectionType =
    Database["public"]["Tables"]["alt_sections"]["Row"];
export type AltCourseType = Database["public"]["Tables"]["alt_courses"]["Row"];
export type CourseSemesterType =
    Database["public"]["Tables"]["course_semester"]["Row"];

export interface AltCourseSemTypeWithChildCourseInfo
    extends Omit<CourseSemesterType, "course_id"> {
    course_id: AltCourseType;
}

export type oneCourseType =
    | Record<string, never>
    | (AltCourseSemTypeWithChildCourseInfo & {
          alt_sections: AltSectionType[];
      });

export type MultiCoursesType =
    | Record<string, never>
    | AltCourseSemTypeWithChildCourseInfo;
