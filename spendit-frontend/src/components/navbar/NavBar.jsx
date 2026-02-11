import { NavLink, useNavigate } from "react-router-dom";

const navigation = [
  { name: "Dashboard", to: "/dashboard" },
  { name: "Profile", to: "/profile" },
  { name: "Add Expense", to: "/add-expense" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      className="
        sticky top-0 z-50
        bg-gray-800/80 backdrop-blur
        after:pointer-events-none
        after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10
      "
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex space-x-4">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  classNames(
                    isActive
                      ? "bg-gray-950/50 text-white"
                      : "text-gray-300 hover:bg-white/5 hover:text-white",
                    "rounded-md px-3 py-2 text-sm font-medium",
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className=" logout-button
              rounded-md px-3 py-2 text-sm font-medium
              text-red-400 hover:bg-white/5 hover:text-red-300
            "
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
