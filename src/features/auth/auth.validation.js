import z from "zod"

const registerSchema = z.object({
    name: z.string().min(3).max(48).trim(),
    email: z.email(),
    password: z.string()
            .min(4)
            .max(64)
            .regex(/^[A-Za-z0-9]+$/, "Password can only contain letters and numbers")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[0-9]/, "Password must contain at least one number"),
    passwordConfirmation: z.string()
            .min(4)
            .max(64)
})

const loginSchema = z.object({
        email: z.email(),
        password: z.string().min(1, "password is required !"),

})

export { registerSchema, loginSchema }