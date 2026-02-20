import mongoose from "mongoose"
const UserSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    role: {
        type: String,
        enum: [
            "Licensed Kinship Caregiver",
            "Unlicensed/Relative Placement",
            "Traditional Foster Parent",
            "Therapeutic/Treatment Foster Care",
            "Respite Caregiver",
            "Adoptive/Guardianship Parent",
        ],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.models.User || mongoose.model("User", UserSchema)