import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'http://localhost:5200/api/', 
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getHotels = async () => {
    try {
        const response = await httpClient.get('hotels');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch hotels', error);
    }
};

export const createBooking = async (bookingData) => {
    try {
        const response = await httpClient.post('bookings', bookingData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create booking', error);
    }
};
