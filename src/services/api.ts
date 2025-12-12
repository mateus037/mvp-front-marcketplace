import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: API_URL
});

export const getProducts = async () => {
    const response = await api.get('/catalog/products');
    return response.data;
};

export const getProductById = async (id: string) => {
    const response = await api.get(`/catalog/products/${id}`);
    return response.data;
};

export const getAddressByCep = async (cep: string) => {
    const response = await api.get(`/dist/address/${cep}`);
    return response.data;
};

export const createOrder = async (orderData: any) => {
    const response = await api.post('/orders', orderData);
    return response.data;
};

export const registerUser = async (userData: any) => {
    const response = await api.post('/users', userData);
    return response.data;
};

export const getUserByEmail = async (email: string) => {
    const response = await api.get(`/users/email/${email}`);
    return response.data;
};

export const updateUser = async (id: string, userData: any) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
};

export const deleteOrderItem = async (orderId: string, itemId: string) => {
    const response = await api.delete(`/orders/${orderId}/items/${itemId}`);
    return response.data;
};
