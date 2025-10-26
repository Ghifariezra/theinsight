import express from "express";
import OAuthController from "../controllers/auth/oauthController";

const oauthController = new OAuthController();
const oauthRouter = express.Router();

// Rute untuk autentikasi
oauthRouter.get("/", oauthController.googleRedirect.bind(oauthRouter));
oauthRouter.get("/callback", oauthController.googleCallback.bind(oauthRouter));

export default oauthRouter;