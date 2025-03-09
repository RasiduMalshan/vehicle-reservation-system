import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalBookings: 0, availableCars: 0, pendingRequests: 0 });
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [editingCustomer, setEditingCustomer] = useState(null);
  
  useEffect(() => {
    axios.get("/api/dashboard/stats")
      .then(response => setStats(response.data))
      .catch(error => console.error("Error fetching stats:", error));
    
    axios.get("/api/customers")
      .then(response => setCustomers(response.data))
      .catch(error => console.error("Error fetching customers:", error));
  }, []);

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(search.toLowerCase()) || 
    customer.telephone.includes(search)
  );

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/customers/${id}`)
          .then(() => {
            setCustomers(customers.filter(customer => customer.id !== id));
            Swal.fire("Deleted!", "Customer has been deleted.", "success");
          })
          .catch(error => console.error("Error deleting customer:", error));
      }
    });
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
  };

  const handleSaveEdit = () => {
    axios.put(`/api/customers/${editingCustomer.id}`, editingCustomer)
      .then(() => {
        setCustomers(customers.map(c => c.id === editingCustomer.id ? editingCustomer : c));
        setEditingCustomer(null);
      })
      .catch(error => console.error("Error updating customer:", error));
  };

  const data = [
    { name: "Bookings", value: stats.totalBookings },
    { name: "Available Cars", value: stats.availableCars },
    { name: "Pending Requests", value: stats.pendingRequests }
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-blue-500 text-white rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold">Total Bookings</h2>
          <p className="text-2xl">{stats.totalBookings}</p>
        </div>
        <div className="p-4 bg-green-500 text-white rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold">Available Cars</h2>
          <p className="text-2xl">{stats.availableCars}</p>
        </div>
        <div className="p-4 bg-red-500 text-white rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold">Pending Requests</h2>
          <p className="text-2xl">{stats.pendingRequests}</p>
        </div>
      </div>
      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <h2 className="text-xl font-bold mb-4">Statistics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4A90E2" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Customer Management</h2>
        <input 
          type="text" 
          placeholder="Search by name or telephone" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className="w-full p-2 border rounded mb-4"
        />
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Telephone</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(customer => (
              <tr key={customer.id}>
                <td className="border p-2">{customer.name}</td>
                <td className="border p-2">{customer.telephone}</td>
                <td className="border p-2">
                  <button 
                    onClick={() => handleEdit(customer)} 
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(customer.id)} 
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
