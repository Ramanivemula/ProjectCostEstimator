import { FaProjectDiagram, FaUsersCog, FaFileExport, FaRobot } from 'react-icons/fa';

function Features() {
  return (
    <section className="bg-[#353a54] text-white py-20 px-6 md:px-16">
      <h2 className="text-4xl font-bold text-center pb-10 mb-10">Key Features</h2>
      <div className="grid grid-cols-1 pb-10 sm:grid-cols-2 md:grid-cols-4 gap-8">

        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-md hover:scale-105 transition-all duration-300">
          <FaProjectDiagram size={30} className="text-sky-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Smart Estimation</h3>
          <p className="text-sm text-gray-300">
            Define your project timeline, roles, and rates. Get instant cost breakdowns.
          </p>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-md hover:scale-105 transition-all duration-300">
          <FaUsersCog size={30} className="text-amber-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">AI Optimization</h3>
          <p className="text-sm text-gray-300">
            Leverage GenAI to suggest role adjustments for maximum efficiency.
          </p>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-md hover:scale-105 transition-all duration-300">
          <FaFileExport size={30} className="text-emerald-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Export Reports</h3>
          <p className="text-sm text-gray-300">
            Download project estimates as client-ready PDF and Excel files.
          </p>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-md hover:scale-105 transition-all duration-300">
          <FaRobot size={30} className="text-pink-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Insightful Dashboards</h3>
          <p className="text-sm text-gray-300">
            Visualize cost structures and savings across your estimation history.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Features;
