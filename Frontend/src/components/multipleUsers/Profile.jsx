import React, { useContext, useEffect, useState } from "react";
import { AiOutlineSetting } from "react-icons/Ai";
import { loginContext } from "../../pages/context/auth";
import axios from "../../services/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Profile() {
  const { user } = useContext(loginContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
  });
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const id = user?._id;

  // To Get Current Staff Details
  useEffect(() => {
    axios.get(`/staff/?edit=${id}`).then((response) => {
      setFormData(response.data);
    });
  }, []);

  // To Update Staff
  const updateProfile = (e) => {
    e.preventDefault();
    axios
      .put(`/profile/${id}`, {
        name: formData?.name,
        email: formData?.email,
        address: formData?.address,
        phone: formData?.phone,
      })
      .then(() => window.location.reload(true), { replace: true })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };
  // updatePassword
  const updatePassword = (e) => {
    e.preventDefault();
    axios
      .put(`/updatepassword/${id}`, {
        oldpassword: formData?.oldpassword,
        newpassword: formData?.newpassword,
        confirmpassword: formData?.confirmpassword,
      })
      .then(() => window.location.reload(true), { replace: true })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  const demoProfile = (e) => {
    e.preventDefault();
    toast.success("For demo profile details would not be changed");
  };

  const demoPassword = (e) => {
    e.preventDefault();
    toast.success("For demo passwords would not be changed");
  };

  return (
<div id="root" className="max-w-screen-lg mx-auto p-4 sm:p-8">
  <div className="logo h-16 sm:h-24 lg:h-32 p-2 sm:p-4 lg:p-6 will-change-filter hover:filter lg:hover:filter-react">
    {/* Your logo content */}
  </div>

  <div className="bg-indigo-50 p-4 sm:p-8">
    <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-8 lg:p-8">
      <div className="bg-white rounded-full w-full lg:w-1/3 flex flex-col items-center justify-center p-4">
        <h1 className="mb-2 font-bold text-lg lg:text-2xl text-blue-800">Metaveos Diagnosis Management Center</h1>
        <p>{user?.name}</p>
      </div>

      <div className="bg-indigo-200 w-full lg:w-2/3 p-4 sm:p-8 rounded-lg">
        <h1 className="mb-6 font-bold text-black text-lg lg:text-2xl flex items-center gap-2">
          {React.createElement(AiOutlineSetting, { size: "25" })}PROFILE
        </h1>
        <form onSubmit={updateProfile}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
            <label htmlFor="" className="text-black text-lg">
              Name
            </label>
            <input
              type="text"
              value={formData?.name}
              name="name"
              onChange={handleChange}
              className="w-full rounded-md p-2 text-base outline-none"
            />

            <label htmlFor="" className="text-black text-lg">
              Email
            </label>
            <input
              type="text"
              value={formData?.email}
              name="email"
              onChange={handleChange}
              className="w-full rounded-md p-2 text-base outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
            <label htmlFor="" className="text-black text-lg">
              Phone
            </label>
            <input
              type="text"
              value={formData?.phone}
              name="phone"
              onChange={handleChange}
              className="w-full rounded-md p-2 text-base outline-none"
            />

            <label htmlFor="" className="text-black text-lg">
              Address
            </label>
            <input
              type="text"
              value={formData?.address}
              name="address"
              onChange={handleChange}
              className="w-full rounded-md p-2 text-base outline-none"
            />
          </div>

          <button className="bg-white px-4 py-2 rounded-full font-semibold text-base lg:text-lg mt-4 hover:bg-indigo-900 hover:text-white duration-200">
            UPDATE
          </button>
        </form>
      </div>
    </div>

    <div className="lg:px-4 pb-4 pt-4 lg:pt-0">
      <div className="bg-indigo-200 w-full p-4 sm:p-8 rounded-lg">
        <h1 className="mb-6 font-bold text-black text-lg lg:text-2xl flex items-center gap-2">
          {React.createElement(AiOutlineSetting, { size: "25" })}CHANGE PASSWORD
        </h1>
        <form onSubmit={updatePassword}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
            <label htmlFor="" className="text-black text-lg text-right">
              Old Password
            </label>
            <input
              type="password"
              name="oldpassword"
              onChange={handleChange}
              className="w-full rounded-md p-2 text-base outline-none"
            />

            <label htmlFor="" className="text-black text-lg text-right">
              New Password
            </label>
            <input
              type="password"
              name="newpassword"
              onChange={handleChange}
              className="w-full rounded-md p-2 text-base outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
            <label htmlFor="" className="text-black text-lg text-right">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmpassword"
              onChange={handleChange}
              className="w-full rounded-md p-2 text-base outline-none"
            />
          </div>

          <button className="bg-white px-4 py-2 rounded-full font-semibold text-base lg:text-lg ml-4 sm:ml-12 mt-4 hover:bg-indigo-900 hover:text-white duration-200">
            UPDATE
          </button>
        </form>
      </div>
    </div>
  </div>
</div>


  
  );
}

export default Profile;
