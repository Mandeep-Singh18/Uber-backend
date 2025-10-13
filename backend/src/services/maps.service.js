import axios from "axios";
import captainModel from "../models/captain.model.js";

export const getAdressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if(response.data.status === "OK") {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            }
        }else{
            throw new Error("Unable to fetch coordinates");
        }
    } catch (error) {
        throw error;
    }
}

export const getDistanceTime = async (origin, destination) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
       const response = await axios.get(url);
         if(response.data.status === "OK") {
            const element = response.data.rows[0].elements[0];
            if(element.status === "OK") {
                return {
                    distance: element.distance.text,
                    duration: element.duration.text
                }
            }
         }
    } catch (error) {
        throw new Error("Unable to fetch distance and times");
    }
}

export const getAutoCompleteSuggestions = async (input) => {
     const apiKey = process.env.GOOGLE_MAPS_API_KEY;
     const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

     try {
        const response = await axios.get(url);
        if(response.data.status === "OK") {
            return response.data.predictions.map(prediction => prediction.description);
        }else{
            throw new Error("Unable to fetch suggestions");
        }
     } catch (error) {
        return response.status(500).json({ message: error.message });
     }
}

export const getCaptainInRadius = async (ltd, lng, radius) => {
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ lng, ltd ], radius / 6378.1 ]
            }
        },
        isAvailable: true
    });

    return captains;
}