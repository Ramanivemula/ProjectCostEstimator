import { Calculator, Home, History, BarChart3, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <aside className="w-64 h-full bg-white border-r border-slate-200 shadow-sm hidden md:flex flex-col">
      <div className="p-4 flex items-center gap-2 border-b border-slate-200">
        <Calculator className="text-primary" />
        <h1 className="text-lg font-bold text-slate-800">Project Estimator</h1>
      </div>

      <nav className="p-4 flex flex-col gap-2 text-sm text-slate-600 flex-grow">
        <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 rounded-md">
          <Home size={16} />
          Dashboard
        </Link>
        <Link to="/estimate" className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 rounded-md">
          <BarChart3 size={16} />
          New Estimation
        </Link>
        <Link to="/history" className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 rounded-md">
          <History size={16} />
          History
        </Link>
      </nav>

      <div className="p-4 border-t border-slate-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-red-50 rounded-md"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
