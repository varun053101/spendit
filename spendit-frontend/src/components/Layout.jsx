import NavBar from "./navbar/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <NavBar />

      <main className="p-6">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;