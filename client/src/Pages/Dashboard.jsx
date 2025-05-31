import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCalculator,
  FaCopy,
  FaTrash,
  FaEye,
  FaClock,
  FaDollarSign,
  FaFolderOpen,
} from "react-icons/fa";
import Header from "../components/Navbar";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [estimations, setEstimations] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    timeline: "",
    toolsInfraCost: 0,
    riskBuffer: 0,
    roles: [
      { role: "", count: 1, rate: 0, hrs_per_week: 0, experience: "" },
    ],
  });

  const [costs, setCosts] = useState({ base: 0, total: 0 });

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    setEstimations([
      {
        _id: "1",
        projectName: "CRM App",
        createdAt: "2024-05-29",
        cost: "$12,500",
        optimized: true,
      },
      {
        _id: "2",
        projectName: "E-learning Portal",
        createdAt: "2024-05-28",
        cost: "$8,900",
        optimized: false,
      },
    ]);
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this?");
    if (confirm) {
      setEstimations(estimations.filter((item) => item._id !== id));
    }
  };

  const handleRoleChange = (index, field, value) => {
    const newRoles = [...form.roles];
    newRoles[index][field] = value;
    setForm({ ...form, roles: newRoles });
  };

  const addRole = () => {
    setForm({
      ...form,
      roles: [
        ...form.roles,
        { role: "", count: 1, rate: 0, hrs_per_week: 0, experience: "" },
      ],
    });
  };

  const calculateCost = () => {
    const base = form.roles.reduce((sum, r) => {
      const weeks = parseFloat(form.timeline) || 0;
      return (
        sum +
        r.count * r.rate * r.hrs_per_week * weeks
      );
    }, 0);
    const total =
      base +
      parseFloat(form.riskBuffer || 0) +
      parseFloat(form.toolsInfraCost || 0);
    setCosts({ base, total });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-800 text-white px-4 py-6">
        <div className="max-w-6xl mx-auto">

          {/* Welcome */}
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">
            Welcome, <span className="text-white">{user?.name}</span>
          </h2>

          {/* Estimation Form */}
          <div className="bg-gray-900 rounded-2xl p-8 mb-12 shadow-xl">
            <h3 className="text-2xl font-bold text-cyan-300 mb-6">
              Create Project Estimate
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-300 ">Project Name</label>
                <input
                  className="w-full bg-gray-800 text-white p-3 rounded-lg border border-cyan-400 focus:ring-2 ring-cyan-500 mt-1"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm text-gray-300">
                  Timeline (weeks)
                </label>
                <input
                  type="number"
                  className="w-full bg-gray-800 text-white p-3 border border-cyan-400 rounded-lg focus:ring-2 ring-cyan-500 mt-1"
                  value={form.timeline}
                  onChange={(e) =>
                    setForm({ ...form, timeline: e.target.value })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-gray-300 ">
                  Project Description
                </label>
                <textarea
                  className="w-full bg-gray-800 text-white p-3 border border-cyan-400 rounded-lg focus:ring-2 ring-cyan-500 mt-1"
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm text-gray-300">
                  Tools & Infrastructure Cost
                </label>
                <input
                  type="number"
                  className="w-full bg-gray-800 text-white p-3 border border-cyan-400 rounded-lg focus:ring-2 ring-cyan-500 mt-1"
                  value={form.toolsInfraCost}
                  onChange={(e) =>
                    setForm({ ...form, toolsInfraCost: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm text-gray-300">
                  Risk Buffer [in %]
                </label>
                <input
                  type="number"
                  className="w-full bg-gray-800 text-white p-3 border border-cyan-400 rounded-lg focus:ring-2 ring-cyan-500 mt-1"
                  value={form.riskBuffer}
                  onChange={(e) =>
                    setForm({ ...form, riskBuffer: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Roles Section */}
            <div className="mt-10">
  <h4 className="text-xl font-semibold mb-4 text-white">Roles</h4>

  {/* Column Titles */}
  <div className="hidden md:grid grid-cols-5 gap-10 mb-2 px-8 text-md text-cyan-300 font-semibold">
    <div>Count</div>
    <div>Role</div>
    <div>Rate/hr</div>
    <div>Hrs/week</div>
    <div>Experience</div>
  </div>

  {form.roles.map((r, i) => (
    <div
      key={i}
      className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-gray-800 p-4 rounded-xl mb-3"
    >
      <input
      type="number"
        className="p-2 bg-gray-700 border border-cyan-400 rounded-md"
        placeholder="Count"
        value={r.count}
        onChange={(e) => handleRoleChange(i, "count", e.target.value)}
      />
      <input
        type="string"
        className="p-2 bg-gray-700 border border-cyan-400 rounded-md"
        placeholder="role"
        value={r.role}
        onChange={(e) => handleRoleChange(i, "role", e.target.value)}
      />
      <input
        type="number"
        className="p-2 bg-gray-700 border border-cyan-400 rounded-md"
        placeholder="Rate/hr"
        value={r.rate}
        onChange={(e) => handleRoleChange(i, "rate", e.target.value)}
      />
      <input
        type="number"
        className="p-2 bg-gray-700 border border-cyan-400 rounded-md"
        placeholder="Hrs/week"
        value={r.hrs_per_week}
        onChange={(e) => handleRoleChange(i, "hrs_per_week", e.target.value)}
      />
      <input
        type="string"
        className="p-2 bg-gray-700 border border-cyan-400 rounded-md"
        placeholder="experience"
        value={r.experience}
        onChange={(e) => handleRoleChange(i, "experience", e.target.value)}
      />
    </div>
  ))}

  <button
    onClick={addRole}
    className="mt-2 bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-lg text-sm"
  >
    + Add Role
  </button>
</div>


            {/* Cost Summary */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <button
                onClick={calculateCost}
                className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg"
              >
                Calculate Cost
              </button>
              <div className="mt-4 space-y-2">
                <p>
                  Base Cost:{" "}
                  <span className="text-emerald-400 font-bold">
                    ${costs.base.toFixed(2)}
                  </span>
                </p>
                <p>
                  Total Cost:{" "}
                  <span className="text-yellow-400 font-bold">
                    ${costs.total.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Estimations Table */}
          <div className="overflow-x-auto mb-12">
            <table className="w-full text-sm bg-gray-900 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-cyan-600 text-left">
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
                    <tr
                      key={item._id}
                      className="border-t border-gray-700 hover:bg-gray-800 transition"
                    >
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
                          <FaEye
                            className="text-blue-400 hover:text-blue-500 cursor-pointer"
                            title="View"
                          />
                        </Link>
                        <FaCopy
                          className="text-yellow-400 hover:text-yellow-500 cursor-pointer"
                          title="Clone"
                        />
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
      <Footer />
    </>
  );
};

export default Dashboard;
