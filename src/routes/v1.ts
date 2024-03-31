import { Router } from "express";
import * as controller from "../controllers/api/v1";

// base route: /api/v1
const index = Router();

// /api/v1/oneCourse/?department=<dep>&courseNumber=<course>
index.get("/oneCourse", controller.oneCourse);

// /api/v1/departments/?limit=<num>
index.get("/departments", controller.departments);

// /api/v1/courses/?department=<dep>&classLevel=<classlevel>&limit=<num>
index.get("/courses", controller.courses);

// /api/v1/sections/?department=<dep>&classLevel=<classlevel>&courseNumber=<course>&limit=<num>
index.get("/sections", controller.sections);

export { index as v1 };
