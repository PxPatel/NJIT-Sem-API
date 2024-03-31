import { Router } from "express";
import * as controller from "../controllers/api/v2";

// base route: /api/v2
const index = Router();

// /api/v1/semesters/
index.get("/semesters", controller.semesters);

//Endpoint to get info on a course, using dep and course_num, returning all instances of combo
//And all semester it is correlated with

// /api/v1/oneCourse/?roster=<sem>&department=<dep>&courseNumber=<course>
index.get("/oneCourse", controller.oneCourse);

// /api/v1/departments/?roster=<sem>&limit=<num>
index.get("/departments", controller.departments);

// /api/v1/courses/?roster=<sem>&department=<dep>&classLevel=<classlevel>&limit=<num>
index.get("/courses", controller.courses);

// /api/v1/sections/?roster=<sem>&department=<dep>&classLevel=<classlevel>&courseNumber=<course>&limit=<num>
index.get("/sections", controller.sections);

export { index as v2 };
