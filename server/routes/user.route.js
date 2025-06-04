import { Router } from "express";
import { checkAuthentication, logout, refreshAccessToken, signin, signup,getAllUsers,getUserById } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js"

const router = Router()

router.post("/sign-up", signup)
router.post("/sign-in", signin)
router.get("/log-out", verifyJWT, logout)
router.get("/check-user-auth",verifyJWT,checkAuthentication)
router.post("/refresh-access-token", refreshAccessToken)
router.get("/get-all-users", getAllUsers )
router.get("/get-user-by-id/:id", getUserById ) 

export default router;