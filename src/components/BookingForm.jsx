import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingForm = () => {
    const [customerName, setCustomerName] = useState('');
    const [destination, setDestination] = useState('');
    const [availableCars, setAvailableCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState('');
    const [billAmount, setBillAmount] = useState(0);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get('/api/cars/available');
                setAvailableCars(response.data);
            } catch (error) {
                console.error('Failed to fetch cars:', error);
            }
        };
        fetchCars();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/bookings', {
                customerName,
                destination,
                carId: selectedCar,
            });
            setBillAmount(response.data.billAmount);
            console.log('Booking successful:', response.data);
        } catch (error) {
            console.error('Booking failed:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <h1 className="text-xl font-bold mb-4">Book a Car</h1>
                <input
                    type="text"
                    placeholder="Customer Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="border p-2 mb-4 w-full"
                />
                <input
                    type="text"
                    placeholder="Destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="border p-2 mb-4 w-full"
                />
                <select
                    value={selectedCar}
                    onChange={(e) => setSelectedCar(e.target.value)}
                    className="border p-2 mb-4 w-full"
                >
                    <option value="" disabled>Select a car</option>
                    {availableCars.map((car) => (
                        <option key={car.id} value={car.id}>{car.model}</option>
                    ))}
                </select>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Book</button>
            </form>
            {billAmount > 0 && <p>Total Bill: ${billAmount}</p>}
        </div>
    );
};

export default BookingForm;