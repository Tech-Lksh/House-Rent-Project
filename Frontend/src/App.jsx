import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./modules/common/Home";
import Login from "./modules/common/Login";
import Register from "./modules/common/Register";
import ForgotPassword from "./modules/common/ForgotPassword";
import AdminHome from "./modules/admin/AdminHome";
import OwnerHome from "./modules/user/owner/OwnerHome";
import RenterHome from "./modules/user/renter/RenterHome";
import AllUsers from "./modules/admin/AllUsers";
import AddProperty from "./modules/user/owner/AddProperty";
import OwnerAllBookings from "./modules/user/owner/AllBookings";
import RenterAllProperty from "./modules/user/renter/AllProperties";
import AdminAllBookings from "./modules/admin/AllBookings";
import AdminAllProperty from "./modules/admin/AllProperty";
import OwnerAllProperties from "./modules/user/owner/AllProperties";
import AllPropertiesCards from "./modules/user/AllPropertiesCards";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

function App() {
  const [userData, setUserData] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
        setUserLoggedIn(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData, userLoggedIn, setUserLoggedIn }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />

          {/* Admin */}
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/admin/bookings" element={<AdminAllBookings />} />
          <Route path="/admin/properties" element={<AdminAllProperty />} />
          <Route path="/admin/users" element={<AllUsers />} />

          {/* Owner */}
          <Route path="/ownerhome" element={<OwnerHome />} />
          <Route path="/owner/bookings" element={<OwnerAllBookings />} />
          <Route path="/owner/properties" element={<OwnerAllProperties />} />
          <Route path="/owner/addproperty" element={<AddProperty />} />

          {/* Renter */}
          <Route path="/renterhome" element={<RenterHome />} />
          <Route path="/renter/bookings" element={<RenterAllProperty />} />

          {/* All properties cards (public) */}
          <Route path="/properties/cards" element={<AllPropertiesCards />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;