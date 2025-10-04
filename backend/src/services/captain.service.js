import captainModel from "../models/captain.model.js";

export const createCaptain = async ({ firstName, lastName, email, password, color, plate, capacity, vehicleType}) => {
    if(!firstName || !lastName || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new error("All fields are required")
    }

    const captain = await captainModel.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password,
        vehicles: {
            color,
            plate,
            capacity,
            vehicleType
        }
    })

    return captain;
}