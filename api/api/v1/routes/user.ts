import express from "express";
import userController from "../controllers/user";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/setTempLoginCode", userController.setTempLoginCode);

router.post("/confirmTempLoginCode", userController.confirmTempLoginCode);

router.get("/ping", auth.authenticateUser, userController.ping);

router.get("/profile", auth.authenticateUser, userController.getProfile);

router.get("/logout", auth.authenticateUser, userController.logout);

export default router;
