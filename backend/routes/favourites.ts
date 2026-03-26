import express from "express";
import { favourites, properties } from "../db/index";
import { authenticateToken, AuthenticatedRequest } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { addFavouriteSchema } from "../validation/favouriteValidation";

const router = express.Router();

router.get("/", authenticateToken, (req: AuthenticatedRequest, res) => {
  const userFavs = favourites
    .filter((f) => f.userId === req.user!.userId)
    .map((f) => properties.find((p) => p.id === f.propertyId))
    .filter(Boolean);
  res.json(userFavs);
});

router.post("/", authenticateToken, validate(addFavouriteSchema), (req: AuthenticatedRequest, res) => {
    const { propertyId } = req.body;
    //check if property exists
    if (!properties.find(p => p.id === propertyId)) {
        return res.status(404).json({ error: "Property not found" });
    }
    //check if already in favourites
    if (favourites.find(f => f.userId === req.user!.userId && f.propertyId === propertyId)) {
        return res.status(400).json({ error: "Already in favourites" });
    }
    favourites.push({ userId: req.user!.userId, propertyId });
    res.status(201).json({ message: "Added to favourites" });
});

router.delete("/:propertyId", authenticateToken, (req: AuthenticatedRequest, res) => {
    const {propertyId} = req.params;
    const index = favourites.findIndex(f => f.userId === req.user!.userId && f.propertyId === Number(propertyId));
    if (index === -1) {
        return res.status(404).json({ error: "Favourite not found" });
    }
    favourites.splice(index, 1);
    res.json({ message: "Removed from favourites" });
});

export default router;