import { NavLink, Outlet } from "react-router-dom";
interface NavProps {
  username?: string;
}
export const Nav: React.FC<NavProps> = ({ username }) => {
  const renderLoginLogout = () => {
    if (username) {
      return (
        <>
          <NavLink to="/logout">
            <p>{username}</p>Logout{" "}
          </NavLink>
        </>
      );
    } else {
      return <NavLink to="/login">Login</NavLink>;
    }
  };
  return (
    <div>
      <div className="flex flex-wrap  h-screen">
        <section className="relative mx-auto">
          {/* navbar */}
          <nav className="flex justify-between bg-gray-900 text-white w-screen">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center">
              <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/profile">Profile</NavLink>
                </li>
                <li>
                  <NavLink to="/products">Products</NavLink>
                </li>
                <li>
                  <NavLink to="/createProduct">Create Product</NavLink>
                </li>
                {renderLoginLogout()}
              </ul>
            </div>
          </nav>

          {/* 
              Outlet new feature of React Router v6
              The <Outlet> element is used as a placeholder.
              In this case an <Outlet> enables the Layout component to render its child routes.
              Thus the <Outlet> element will render either a <Blogs>, <Contact>,.. depending on the current location. */}
          <Outlet />
        </section>
      </div>
    </div>
  );
};
