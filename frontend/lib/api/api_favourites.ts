const API_URL = process.env.NEXT_PUBLIC_API_URL;

import { Property } from "@/types/property";

export const fetchProperties = async (): Promise<Property[]> => {
    const res = await fetch(`${API_URL}/properties`, {
        method: "GET",
        credentials: "include",
    });
    return res.json();
};


export const addToFavourites = async (propertyId: number): Promise<{ message: string }> => {
    const res = await fetch(`${API_URL}/favourites`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ propertyId })
    });
    return res.json();
}

export const fetchFavourites = async (): Promise<Property[]> => {
    const res = await fetch(`${API_URL}/favourites`, {
        method: "GET",
        credentials: "include",
    });
    return res.json();
}

export const removeFromFavourites = async (propertyId: number): Promise<{ message: string }> => {
    const res = await fetch(`${API_URL}/favourites/${propertyId}`, {
        method: "DELETE",
        credentials: "include",
    });
    return res.json();
}
