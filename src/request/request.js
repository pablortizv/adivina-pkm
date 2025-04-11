import axios from "axios";

export const getPkmn = async (id) => {
    try {
        const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        throw error;
    }
    }