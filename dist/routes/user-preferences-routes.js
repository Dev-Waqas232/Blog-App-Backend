import { addUserPreferences } from "controllers/user-preferences-controller.js";
import express from "express";
import { authenticateJWT } from "middlewares/jwt.js";
const router = express.Router();
router.post("/", authenticateJWT, addUserPreferences);
export default router;
//# sourceMappingURL=user-preferences-routes.js.map