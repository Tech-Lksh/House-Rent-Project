import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { message } from "antd";
import { UserContext } from "../../../App";
import API_URL from "../../../api";

const AllProperty = () => {
  const user = useContext(UserContext);
  const [bookings, setBookings] = useState([]);

  // Fetch all bookings for tenant
  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/user/get-all-bookings`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setBookings(res.data.data);
      } else {
        message.error(res.data.message || "Failed to fetch bookings");
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch bookings");
    }
  };

  useEffect(() => {
    if (user?.userLoggedIn) fetchBookings();
  }, [user]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-700 rounded-lg shadow-2xl bg-gray-900/80 backdrop-blur-md text-gray-300">
        <thead className="bg-indigo-600/80 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Booking ID</th>
            <th className="py-3 px-4 text-center">Property ID</th>
            <th className="py-3 px-4 text-center">Property Name</th>
            <th className="py-3 px-4 text-center">Status</th>
            <th className="py-3 px-4 text-center">Owner ID</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking, idx) => (
              <tr
                key={booking._id}
                className={`border-b border-gray-700 transition duration-200 hover:bg-gray-800/50 ${
                  idx % 2 === 0 ? "bg-gray-800/40" : "bg-gray-900/40"
                }`}
              >
                <td className="py-3 px-4">{booking._id}</td>
                <td className="py-3 px-4 text-center">{booking.propertyId}</td>
                <td className="py-3 px-4 text-center">{booking.propertyName || "N/A"}</td>
                <td
                  className={`py-3 px-4 text-center font-semibold ${
                    booking.bookingStatus === "booked"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                >
                  {booking.bookingStatus}
                </td>
                <td className="py-3 px-4 text-center">{booking.ownerID}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="py-6 px-4 text-center text-gray-400 italic"
              >
                No bookings yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllProperty;