import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get("/api/customers")
      .then(response => setCustomers(response.data))
      .catch(error => console.error("Error fetching customers:", error));
  }, []);

  return (
    <div className="min-h-screen p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-lg text-gray-600">Manage customers efficiently.</p>
      <ul>
        {customers.map(customer => (
          <li key={customer.id} className="border p-2 mt-2">
            {customer.name} - {customer.telephone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
