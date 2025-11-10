import express from "express";
import courseControllers from "../controllers/course.controller.js";
import userControllers from "../controllers/user.controller.js";
import { validUser } from "../middllewares/validation.middleware.js";

const router = express.Router();

router.post("/course", validUser, courseControllers.createCourse);
router.get("/course", courseControllers.getAllCourses);
router.get("/course/:id", courseControllers.getSingleCourse);
router.put("/course/:id", validUser, courseControllers.updateSingleCourse);
router.delete("/course/:id", validUser, courseControllers.deleteSingleCourse);


router.post("/register", userControllers.userRegister);
router.post("/login", userControllers.userLogin);


export default router;