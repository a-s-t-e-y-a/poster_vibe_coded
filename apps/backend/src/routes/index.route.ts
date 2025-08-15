import { Hono } from "hono";
import authRouter from "./auth.route";

const mainRouter = new Hono<{ Bindings: Env }>()

mainRouter.route("/auth", authRouter)

export default mainRouter;