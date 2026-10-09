
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
            required: false,
            // make it true after lfarh finish roleAndPermission feature
        },

        name: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 48,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minLength: 10,
            maxLength: 254,
        },

        passwordHash: {
            type: String,
            required: true,
            select: false,
        },

        status: {
            type: String,
            required: true,
            enum: ["active", "inactive", "suspended"],
            default: "active",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);