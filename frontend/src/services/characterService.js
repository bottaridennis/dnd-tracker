import axios from 'axios';

const API_URL = 'http://localhost:5000/api/characters'; // Cambia in base alla tua API

export const getCharacters = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getCharacterById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const addCharacter = async (character) => {
    const response = await axios.post(API_URL, character);
    return response.data;
};

export const updateCharacter = async (id, character) => {
    const response = await axios.put(`${API_URL}/${id}`, character);
    return response.data;
};

export const deleteCharacterById = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
