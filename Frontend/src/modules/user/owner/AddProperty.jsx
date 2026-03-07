import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "../../common/Toast";
import API_URL from "../../../api";

axios.defaults.withCredentials = true;

function AddProperty() {
  const navigate = useNavigate();

  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const [image, setImage] = useState([]);
  const [propertyDetails, setPropertyDetails] = useState({
    propertyType: "residential",
    propertyAdType: "rent",
    propertyAddress: "",
    ownerContact: "",
    propertyAmt: 0,
    additionalInfo: "",
  });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 3000);
  };

  const handleImageChange = (e) => {
    setImage([...e.target.files]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !propertyDetails.propertyType ||
      !propertyDetails.propertyAdType ||
      !propertyDetails.propertyAddress ||
      !propertyDetails.ownerContact ||
      !propertyDetails.propertyAmt ||
      image.length === 0
    ) {
      return showToast("error", "Please fill all fields and upload images");
    }

    try {
      const formData = new FormData();
      formData.append("propertyType", propertyDetails.propertyType);
      formData.append("propertyAdType", propertyDetails.propertyAdType);
      formData.append("propertyAddress", propertyDetails.propertyAddress);
      formData.append("ownerContact", propertyDetails.ownerContact);
      formData.append("propertyAmt", propertyDetails.propertyAmt);
      formData.append("additionalInfo", propertyDetails.additionalInfo);

      image.forEach((img) => formData.append("propertyImages", img));

      const res = await axios.post(
        `${API_URL}/api/owner/post-property`,
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        showToast("success", res.data.message);
        // Reset form
        setPropertyDetails({
          propertyType: "residential",
          propertyAdType: "rent",
          propertyAddress: "",
          ownerContact: "",
          propertyAmt: 0,
          additionalInfo: "",
        });
        setImage([]);
        navigate("/ownerhome"); // redirect to owner dashboard
      } else {
        showToast("error", res.data.message || "Failed to add property");
      }
    } catch (error) {
      console.error("Error adding property:", error);
      showToast(
        "error",
        error.response?.data?.message || "Failed to add property"
      );
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-gray-900/80 border border-gray-700 backdrop-blur-md shadow-2xl rounded-xl p-8 mt-12 text-white">
      {toast.show && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <h2 className="text-3xl font-extrabold text-indigo-400 mb-8 text-center tracking-wide">
        Add New Property
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Row 1 */}
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block font-medium mb-2 text-gray-300">
              Property Type
            </label>
            <select
              name="propertyType"
              value={propertyDetails.propertyType}
              onChange={handleChange}
              className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="land/plot">Land/Plot</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2 text-gray-300">
              Property Ad Type
            </label>
            <select
              name="propertyAdType"
              value={propertyDetails.propertyAdType}
              onChange={handleChange}
              className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="rent">Rent</option>
              <option value="sale">Sale</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2 text-gray-300">
              Property Full Address
            </label>
            <input
              type="text"
              name="propertyAddress"
              value={propertyDetails.propertyAddress}
              onChange={handleChange}
              placeholder="Address"
              required
              className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block font-medium mb-2 text-gray-300">
              Property Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              required
              onChange={handleImageChange}
              className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-3 py-2 cursor-pointer text-white file:mr-3 file:px-3 file:py-1 file:rounded-md file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
            />

            {/* Image Preview */}
            {image.length > 0 && (
              <div className="flex mt-2 space-x-2 overflow-x-auto">
                {Array.from(image).map((img, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className="w-24 h-24 object-cover rounded-md"
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block font-medium mb-2 text-gray-300">
              Owner Contact No.
            </label>
            <input
              type="tel"
              name="ownerContact"
              value={propertyDetails.ownerContact}
              onChange={handleChange}
              placeholder="Contact number"
              required
              className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-gray-300">
              Property Amount
            </label>
            <input
              type="number"
              name="propertyAmt"
              value={propertyDetails.propertyAmt}
              onChange={handleChange}
              placeholder="Amount"
              required
              className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Row 3 */}
        <div>
          <label className="block font-medium mb-2 text-gray-300">
            Additional Details for the Property
          </label>
          <textarea
            name="additionalInfo"
            value={propertyDetails.additionalInfo}
            onChange={handleChange}
            rows={4}
            placeholder="Add any details here..."
            className="w-full bg-gray-800/80 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-200"
          >
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProperty;