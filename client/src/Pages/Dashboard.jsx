import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalculator, FaCopy, FaTrash, FaEye, FaClock, FaDollarSign, FaFolderOpen } from 'react-icons/fa';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [estimations, setEstimations] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUser(userInfo);

    // Dummy data (replace with API call)
    setEstimations([
      {
        _id: '1',
        projectName: 'CRM App',
        createdAt: '2024-05-29',
        cost: '$12,500',
        optimized: true
      },
      {
        _id: '2',
        projectName: 'E-learning Portal',
        createdAt: '2024-05-28',
        cost: '$8,900',
        optimized: false
      }
    ]);
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm('Are you sure you want to delete this estimation?');
    if (confirm) {
      const updated = estimations.filter(item => item._id !== id);
      setEstimations(updated);
    }
  };

  // Derived stats
  const totalProjects = estimations.length;
  const totalEstimated = estimations.reduce((acc, curr) => acc + parseInt(curr.cost.replace(/[$,]/g, '')), 0);
  const avgTimeline = `${(totalProjects * 1.5).toFixed(1)} mo`; // Dummy formula

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
            <FaCalculator />
            <span>Dashboard</span>
          </div>
          <Link to="/new-estimation">
            <button className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg text-sm text-white">
              + Create New Estimation
            </button>
          </Link>
        </div>

        {/* Greeting */}
        <h2 className="text-xl mb-6">
          Welcome, <span className="text-cyan-300 font-semibold">{user?.name}</span>!
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#1e293b] rounded-xl p-6 shadow-md flex items-center gap-4">
            <div className="p-3 bg-cyan-700 rounded-full">
              <FaFolderOpen size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-300">Total Projects</p>
              <p className="text-2xl font-bold text-white">{totalProjects}</p>
            </div>
          </div>

          <div className="bg-[#1e293b] rounded-xl p-6 shadow-md flex items-center gap-4">
            <div className="p-3 bg-emerald-600 rounded-full">
              <FaDollarSign size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-300">Total Estimated</p>
              <p className="text-2xl font-bold text-white">${totalEstimated.toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-[#1e293b] rounded-xl p-6 shadow-md flex items-center gap-4">
            <div className="p-3 bg-yellow-500 rounded-full">
              <FaClock size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-300">Avg. Timeline</p>
              <p className="text-2xl font-bold text-white">{avgTimeline}</p>
            </div>
          </div>
        </div>

        {/* Estimation Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm bg-[#1e293b] rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-cyan-600 text-white text-left">
                <th className="px-4 py-3">Project Name</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Estimated Cost</th>
                <th className="px-4 py-3">AI Optimized</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {estimations.length > 0 ? (
                estimations.map((item) => (
                  <tr key={item._id} className="border-t border-gray-700 hover:bg-gray-800 transition">
                    <td className="px-4 py-3">{item.projectName}</td>
                    <td className="px-4 py-3">{item.createdAt}</td>
                    <td className="px-4 py-3">{item.cost}</td>
                    <td className="px-4 py-3">
                      {item.optimized ? (
                        <span className="text-green-400">Yes</span>
                      ) : (
                        <span className="text-red-400">No</span>
                      )}
                    </td>
                    <td className="px-4 py-3 flex gap-3">
                      <Link to={`/estimation/${item._id}`}>
                        <FaEye className="text-blue-400 hover:text-blue-500 cursor-pointer" title="View" />
                      </Link>
                      <FaCopy className="text-yellow-400 hover:text-yellow-500 cursor-pointer" title="Clone" />
                      <FaTrash
                        className="text-red-500 hover:text-red-600 cursor-pointer"
                        title="Delete"
                        onClick={() => handleDelete(item._id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-400">
                    No estimations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
