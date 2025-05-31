import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { Link } from "react-router-dom";
import { 
  FaCalculator, 
  FaCopy, 
  FaTrash, 
  FaEye, 
  FaPlus, 
  FaMinus, 
  FaProjectDiagram,
  FaClock,
  FaDollarSign,
  FaUsers,
  FaTools,
  FaShieldAlt,
  FaEdit,
  FaSave,
  FaTimes
} from "react-icons/fa";
import Header from "../components/Navbar";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [form, setForm] = useState({
    project_name: "",
    desc: "",
    timeline: "",
    risk_buffer: 0,
    tools_infra_cost: 0,
    resources: [
      {
        count: 1,
        role: "",
        rate: 0,
        hrs_per_week: 0,
        experience: "",
      },
    ],
  });
  const [estimations, setEstimations] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("/project/projects");
      setEstimations(res.data.projects);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  const handleSave = async () => {
    // Basic validation: required fields check
    if (!form.project_name.trim()) {
      alert("Project Name is required");
      return;
    }
    if (!form.timeline || form.timeline < 1) {
      alert("Timeline (weeks) must be at least 1");
      return;
    }
    if (
      form.resources.length === 0 ||
      form.resources.some(
        (r) =>
          !r.role.trim() ||
          r.count < 1 ||
          r.rate < 0 ||
          r.hrs_per_week < 1 ||
          r.hrs_per_week > 168 ||
          !r.experience.trim()
      )
    ) {
      alert(
        "Please fill all resource fields correctly (role, count>=1, rate>=0, hours/week 1-168, experience)."
      );
      return;
    }

    try {
      const payload = {
        ...form,
        tools_infra_cost: parseFloat(form.tools_infra_cost) || 0,
        risk_buffer: parseFloat(form.risk_buffer) || 0,
        timeline: parseInt(form.timeline),
        resources: form.resources.map((r) => ({
          count: parseInt(r.count),
          role: r.role,
          rate: parseFloat(r.rate),
          hrs_per_week: parseInt(r.hrs_per_week),
          experience: r.experience,
        })),
      };

      if (editId) {
        await axios.put(`/projects/${editId}`, payload);
      } else {
        await axios.post("project/projects", payload);
      }

      fetchProjects();
      resetForm();
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save project. Check console for details.");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this project?");
    if (!confirm) return;
    try {
      await axios.delete(`/projects/${id}`);
      fetchProjects();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete project. Check console.");
    }
  };

  const handleEdit = (project) => {
    const safeProject = {
      ...project,
      resources: project.resources.map((r) => ({
        count: r.count,
        role: r.role,
        rate: r.rate,
        hrs_per_week: r.hrs_per_week,
        experience: r.experience,
      })),
    };
    setForm(safeProject);
    setEditId(project._id);
    window.scrollTo(0, 0);
  };

  const handleClone = (project) => {
    const cloned = {
      ...project,
      resources: project.resources.map((r) => ({ ...r })),
    };
    delete cloned._id;
    cloned.project_name = `${cloned.project_name} (Copy)`;
    setForm(cloned);
    setEditId(null);
    window.scrollTo(0, 0);
  };

  const resetForm = () => {
    setForm({
      project_name: "",
      desc: "",
      timeline: "",
      tools_infra_cost: 0,
      risk_buffer: 0,
      resources: [
        {
          role: "",
          count: 1,
          rate: 0,
          hrs_per_week: 0,
          experience: "",
        },
      ],
    });
    setEditId(null);
  };

  const handleRoleChange = (index, field, value) => {
    const updated = [...form.resources];
    updated[index][field] = value;
    setForm({ ...form, resources: updated });
  };

  const addRole = () => {
    setForm({
      ...form,
      resources: [
        ...form.resources,
        { role: "", count: 1, rate: 0, hrs_per_week: 0, experience: "" },
      ],
    });
  };

  const removeRole = (index) => {
    if (form.resources.length > 1) {
      const updated = form.resources.filter((_, i) => i !== index);
      setForm({ ...form, resources: updated });
    }
  };

  const calculateResourceCost = (resource) => {
    return resource.count * resource.rate * resource.hrs_per_week;
  };

  const calculateTotalWeeklyCost = () => {
    return form.resources.reduce((total, resource) => {
      return total + calculateResourceCost(resource);
    }, 0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              <FaProjectDiagram className="inline-block mr-4 text-cyan-400" />
              Project Cost Estimator
            </h1>
            <p className="text-gray-300 text-lg">
              {editId ? "Update your project estimation" : "Create accurate project cost estimates with detailed resource planning"}
            </p>
          </div>

          {/* Main Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-12 border border-white/20 shadow-2xl">
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editId ? (
                  <>
                    <FaEdit className="inline-block mr-2 text-yellow-400" />
                    Edit Project
                  </>
                ) : (
                  <>
                    <FaPlus className="inline-block mr-2 text-green-400" />
                    New Project Estimate
                  </>
                )}
              </h2>
            </div>

            {/* Project Basic Info */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FaProjectDiagram className="inline mr-2" />
                    Project Name *
                  </label>
                  <input
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
                    placeholder="Enter project name"
                    value={form.project_name}
                    onChange={(e) => setForm({ ...form, project_name: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FaClock className="inline mr-2" />
                    Timeline (weeks) *
                  </label>
                  <input
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
                    placeholder="Project duration in weeks"
                    type="number"
                    min="1"
                    value={form.timeline}
                    onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FaTools className="inline mr-2" />
                    Tools & Infrastructure Cost ($)
                  </label>
                  <input
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
                    placeholder="0.00"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.tools_infra_cost}
                    onChange={(e) => setForm({ ...form, tools_infra_cost: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FaShieldAlt className="inline mr-2" />
                    Risk Buffer (%)
                  </label>
                  <input
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
                    placeholder="0"
                    type="number"
                    min="0"
                    max="100"
                    value={form.risk_buffer}
                    onChange={(e) => setForm({ ...form, risk_buffer: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project Description
              </label>
              <textarea
                className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all resize-none"
                placeholder="Describe your project scope, objectives, and key deliverables..."
                rows="4"
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
              />
            </div>

            {/* Resources Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">
                  <FaUsers className="inline mr-2 text-cyan-400" />
                  Team Resources
                </h3>
                <div className="bg-cyan-500/20 px-4 py-2 rounded-lg border border-cyan-400/30">
                  <span className="text-cyan-300 text-sm font-medium">
                    Weekly Cost: {formatCurrency(calculateTotalWeeklyCost())}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {form.resources.map((resource, idx) => (
                  <div key={idx} className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium text-white">
                        Resource #{idx + 1}
                      </h4>
                      {form.resources.length > 1 && (
                        <button
                          onClick={() => removeRole(idx)}
                          className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/20 transition-all"
                          title="Remove Resource"
                        >
                          <FaMinus />
                        </button>
                      )}
                    </div>
                    
                    <div className="grid lg:grid-cols-5 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Count *</label>
                        <input
                          type="number"
                          placeholder="1"
                          min="1"
                          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
                          value={resource.count}
                          onChange={(e) => handleRoleChange(idx, "count", e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Role *</label>
                        <input
                          placeholder="e.g., Developer"
                          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
                          value={resource.role}
                          onChange={(e) => handleRoleChange(idx, "role", e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Rate/Hour ($) *</label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
                          value={resource.rate}
                          onChange={(e) => handleRoleChange(idx, "rate", e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Hours/Week *</label>
                        <input
                          type="number"
                          min="1"
                          max="168"
                          placeholder="40"
                          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
                          value={resource.hrs_per_week}
                          onChange={(e) => handleRoleChange(idx, "hrs_per_week", e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Experience *</label>
                        <input
                          placeholder="e.g., Senior"
                          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
                          value={resource.experience}
                          onChange={(e) => handleRoleChange(idx, "experience", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    {resource.rate > 0 && resource.hrs_per_week > 0 && resource.count > 0 && (
                      <div className="mt-3 text-right">
                        <span className="text-sm text-gray-400">
                          Weekly Cost: <span className="text-green-400 font-medium">{formatCurrency(calculateResourceCost(resource))}</span>
                        </span>
                      </div>
                    )}
                  </div>
                ))}
                
                <button
                  onClick={addRole}
                  className="w-full p-4 border-2 border-dashed border-gray-500 rounded-xl text-gray-400 hover:border-cyan-400 hover:text-cyan-400 transition-all flex items-center justify-center gap-2"
                >
                  <FaPlus />
                  Add Another Resource
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end">
              {editId && (
                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-xl transition-all flex items-center gap-2"
                >
                  <FaTimes />
                  Cancel
                </button>
              )}
              <button
                onClick={handleSave}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl font-medium transition-all shadow-lg flex items-center gap-2"
              >
                <FaSave />
                {editId ? "Update Project" : "Save Project"}
              </button>
            </div>
          </div>

          {/* Projects Table */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-white/20">
              <h2 className="text-2xl font-bold text-white">
                <FaDollarSign className="inline mr-2 text-green-400" />
                Project Estimations
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-cyan-600/20 border-b border-white/20">
                  <tr>
                    <th className="p-4 text-left text-white font-medium">Project Name</th>
                    <th className="p-4 text-left text-white font-medium">Description</th>
                    <th className="p-4 text-left text-white font-medium">Timeline</th>
                    <th className="p-4 text-left text-white font-medium">Total Cost</th>
                    <th className="p-4 text-left text-white font-medium">Created</th>
                    <th className="p-4 text-center text-white font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {estimations.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-gray-400">
                        No projects found. Create your first project estimate above.
                      </td>
                    </tr>
                  ) : (
                    estimations.map((project) => (
                      <tr key={project._id} className="border-b border-white/10 hover:bg-white/5 transition-all">
                        <td className="p-4">
                          <div className="font-medium text-white">{project.project_name}</div>
                          <div className="text-sm text-gray-400">{project.resources?.length || 0} resources</div>
                        </td>
                        <td className="p-4">
                          <div className="text-gray-300 text-sm max-w-xs truncate">
                            {project.desc || "No description"}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-white">{project.timeline} weeks</div>
                          {project.risk_buffer > 0 && (
                            <div className="text-xs text-yellow-400">+{project.risk_buffer}% buffer</div>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="text-green-400 font-bold text-lg">
                            {formatCurrency(project.total_cost || 0)}
                          </div>
                          {project.tools_infra_cost > 0 && (
                            <div className="text-xs text-gray-400">
                              +{formatCurrency(project.tools_infra_cost)} tools
                            </div>
                          )}
                        </td>
                        <td className="p-4 text-gray-300 text-sm">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEdit(project)}
                              title="Edit Project"
                              className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-all"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleClone(project)}
                              title="Clone Project"
                              className="p-2 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/20 rounded-lg transition-all"
                            >
                              <FaCopy />
                            </button>
                            <Link 
                              to={`/estimation/${project._id}`}
                              title="View Details"
                              className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/20 rounded-lg transition-all"
                            >
                              <FaEye />
                            </Link>
                            <button
                              onClick={() => handleDelete(project._id)}
                              title="Delete Project"
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;