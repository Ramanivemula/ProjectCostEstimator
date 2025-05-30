import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCalculator } from 'react-icons/fa';

const Header = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userInitial = userInfo?.name?.charAt(0).toUpperCase();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setShowDropdown(false);
    navigate('/');
  };

  return (
    <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-cyan-400 text-2xl font-bold">
          <FaCalculator size={24} />
          <span>ProjectEstimator</span>
        </div>

        {!userInfo ? (
          <nav className="hidden md:flex space-x-6 text-gray-300">
            {/* Future links */}
          </nav>
        ) : null}

        {!userInfo ? (
          <div className="flex px-3 gap-3">
            <Link to="/login">
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-xl text-sm">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-xl text-sm">
                SignUp
              </button>
            </Link>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="bg-cyan-500 w-10 h-10 rounded-full text-lg font-bold flex items-center justify-center"
            >
              {userInitial}
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-md shadow-lg w-32 z-10">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded-t-md"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
