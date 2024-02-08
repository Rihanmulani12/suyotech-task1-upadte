import { Router } from "express";
import {signUpFun , signinFun , signoutFun} from "../controllers/userController.js"

const router = Router();

router.route("/signup").post(signUpFun);
router.route("/signin").post(signinFun);
router.route("/signOut").post(signoutFun);


export default router;