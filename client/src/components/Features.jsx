import { FaLeaf, FaChartLine, FaUtensils } from 'react-icons/fa';
import { MdOutlineHealthAndSafety } from 'react-icons/md';

function Features(){
  return (
    <section className="bg-[#353a54] text-white py-14 px-6 md:px-16">
      <h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-md hover:scale-105 transition-all duration-300">
          <FaUtensils size={30} className="text-green-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Smart Food Input</h3>
          <p className="text-sm text-gray-300">
            Enter meals in natural language and let the AI break it down.
          </p>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-md hover:scale-105 transition-all duration-300">
          <FaLeaf size={30} className="text-lime-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Nutrition Insights</h3>
          <p className="text-sm text-gray-300">
            Get detailed macro & micro nutrient analysis.
          </p>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-md hover:scale-105 transition-all duration-300">
          <MdOutlineHealthAndSafety size={30} className="text-rose-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Health Tracker</h3>
          <p className="text-sm text-gray-300">
            Monitor your daily intake and track your health goals.
          </p>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-md hover:scale-105 transition-all duration-300">
          <FaChartLine size={30} className="text-sky-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Predictive Analysis</h3>
          <p className="text-sm text-gray-300">
            Forecast nutritional trends and needs with data-driven models.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Features;
