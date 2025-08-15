import { InsertUser, userInsertSchema } from "../db/schema";
import { UserRootObject } from "../interfaces/auth.interface";
import AuthService from "../services/auth.service";

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async mutateRequestObject(data: any) {
        return {
            stack_auth_id: data.id,
            primary_email: data.primary_email,
            primary_email_verified: data.primary_email_verified,
            primary_email_auth_enabled: data.primary_email_auth_enabled,
            signed_up_at_millis: data.signed_up_at_millis,
            last_active_at_millis: data.last_active_at_millis,
            is_anonymous: data.is_anonymous,
            display_name: data.display_name,
            profile_image_url: data.profile_image_url,
        };
    }

    async createUser(c: any) {
        try {
            const requestBody = await c.req.json();
            console.log("Received request to create user:", requestBody);
            const mutatedData = await this.mutateRequestObject(requestBody.data);
            console.log("Mutated data for user creation:", mutatedData);
            const validatedData = userInsertSchema.parse(mutatedData);
            console.log("Validated data for user creation:", validatedData);
            return this.authService.webhookForUserCreation(c, validatedData, requestBody.type);
        } catch (error: any) {
            if (error.name === 'ZodError' && error.errors) {
                const formattedErrors = error.errors.map((err: any) => ({
                    field: err.path.join('.'),
                    message: err.message,
                    code: err.code
                }));
                return c.json({ 
                    error: 'Validation failed', 
                    details: formattedErrors 
                }, 400);
            }
            return c.json({ error: `Validation failed: ${error.message}` }, 400);
        }
    }

    async getUser(c: any) {
        try {
            const id = parseInt(c.req.param('id'));
            return this.authService.getUserById(c, id);
        } catch (error: any) {
            return c.json({ error: error.message }, 400);
        }
    }

    async getAllUsers(c: any) {
        try {
            const { page, pageSize } = c.req.query();
            return this.authService.getAllUsers(c, page, pageSize);
        } catch (error: any) {
            return c.json({ error: error.message }, 400);
        }
    }
}

export const authController = new AuthController();

export const createUser = (c: any) => authController.createUser(c);
export const getUser = (c: any) => authController.getUser(c);
export const getAllUsers = (c: any ) => authController.getAllUsers(c);