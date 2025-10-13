import { validationResult } from "express-validator"
import { getAdressCoordinate, getAutoCompleteSuggestions, getDistanceTime } from "../services/maps.service.js";

export const getCoordinates = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const { address } = req.query;

    try {
        const coordinates = await getAdressCoordinate(address);
        res.status(200).json(coordinates)
    } catch (error) {
        res.status(400).json({error: "Coordinates not found"})
    }
}

export const getDistanceAndTime = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        const { origin, destination } = req.query;
        const distanceTime = await getDistanceTime(origin, destination);
        res.status(200).json(distanceTime)
    } catch (error) {
        res.status(400).json({error: "Distance and time not found"})
    }
}

export const getSuggestions = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        const { input } = req.query;
        const suggestions = await getAutoCompleteSuggestions(input);
        res.status(200).json(suggestions)

    } catch (error) {
        res.status(400).json({error: "Suggestions not found"})
    }
}