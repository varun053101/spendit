import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";


const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // store response data
        setUser(response.data);
      } catch (err) {
        setError("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  // loading state
  if (!user && !error) {
    return <p className="text-white">Loading...</p>;
  }

  // display error
  if (error) {
    return <p className="text-red-400">{error}</p>;
  }

  return (
    <>
      <h1 className="head-text">User Profile`</h1>
      <div className="user-details">
        <div className="mt-6 border-t border-white/10">
          <dl className="divide-y divide-white/10">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-100">Full name</dt>
              <dd className="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
                {user.name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-100">
                Email address
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
                {user.email}
              </dd>
            </div>
          </dl>
        </div>
        <button className="reset-password">
          <Link
            to="/reset-password"
            className="resetpassword font-semibold text-indigo-400 hover:text-indigo-300"
          >
            reset password
          </Link>
        </button>
      </div>
    </>
  );
};

export default Profile;
