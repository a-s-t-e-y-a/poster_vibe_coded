import { asc, eq } from "drizzle-orm";
import { createDb } from "../db";
import { InsertUser, users } from "../db/schema";

class AuthService {
    constructor() {}
    private checkType(type: string): boolean {
        return type === 'user.created';
    }

    async webhookForUserCreation(c: any, parseData: InsertUser, type: string) {
        console.log("Webhook for user creation received:", parseData, type);
        if (!this.checkType(type)) {
            return c.json({ error: 'Invalid event type' }, 400);
        }
        console.log("Processing user creation for type:", type);
        console.log("Parsed data for user creation:", parseData);
        const db = createDb(c.env);
        try {
            const insertData = {
                primary_email: parseData.primary_email,
                stack_auth_id: parseData.stack_auth_id,
                primary_email_verified: parseData.primary_email_verified,
                primary_email_auth_enabled: parseData.primary_email_auth_enabled,
                signed_up_at_millis: parseData.signed_up_at_millis,
                last_active_at_millis: parseData.last_active_at_millis,
                is_anonymous: parseData.is_anonymous,
                display_name: parseData.display_name,
                profile_image_url: parseData.profile_image_url,
            };
            const newUser = await db.insert(users).values(insertData).returning();
            return c.json(newUser[0]);
        } catch (err) {
            return c.json({ error: (err as Error).message }, 500);
        }
    }

    async getUserById(c: any, id: number) {
        const db = createDb(c.env);
        try {
            const user = await db.select().from(users).where(eq(users.id, id)).limit(1);
            if (user.length === 0) {
                return c.json({ error: 'User not found' }, 404);
            }
            return c.json(user[0]);
        } catch (err) {
            return c.json({ error: (err as Error).message }, 500);
        }
    }

    async getAllUsers(c: any, page: number = 1, pageSize: number = 10) {
        const db = createDb(c.env);
        try {
            const allUsers = await db.select().from(users).orderBy(asc(users.firstName), asc(users.id)) // order by first_name (non-unique), id (pk)
    .limit(pageSize) 
    .offset((page - 1) * pageSize);
            return c.json(allUsers);
        } catch (err) {
            return c.json({ error: (err as Error).message }, 500);
        }
    }
}

export default AuthService;