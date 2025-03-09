import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-lg text-gray-600">Manage cars, drivers, and bookings efficiently.</p>
      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="p-4 bg-blue-500 text-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Bookings</h2>
          <p className="text-2xl">120</p>
        </div>
        <div className="p-4 bg-green-500 text-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Available Cars</h2>
          <p className="text-2xl">35</p>
        </div>
        <div className="p-4 bg-red-500 text-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Pending Requests</h2>
          <p className="text-2xl">8</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;