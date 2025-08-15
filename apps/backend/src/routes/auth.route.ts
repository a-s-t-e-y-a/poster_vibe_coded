import { Hono } from "hono";
import { createUser as createUserHandler, getAllUsers, getUser } from "../controller/auth.controller";


const authRouter = new Hono<{ Bindings: Env }>()

authRouter.post("/user", createUserHandler)
authRouter.get("/users", getAllUsers)
authRouter.get("/user/:id", getUser)

export default authRouter;