import { useState } from "react";
import axios from "axios";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert(res.data.message);

    } catch (error) {

      alert(error.response.data.message);

    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl w-96"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <button className="w-full bg-black text-white p-3 rounded">
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;