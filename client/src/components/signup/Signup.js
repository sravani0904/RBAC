import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "../../utils/Spinner";
// We will call APIs directly here to control navigation and messages
import * as api from "../../redux/api";

const Signup = () => {
  const location = useLocation();
  const queryRole = new URLSearchParams(location.search).get("role");
  const [translate, setTranslate] = useState(false);
  const [role, setRole] = useState(queryRole || "parent");
  const [form, setForm] = useState({ name: "", email: "", password: "", contactNumber: "", address: "" });
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const [error, setError] = useState({});

  useEffect(() => {
    setTimeout(() => setTranslate(true), 500);
  }, []);

  useEffect(() => {
    if (store.errors) setError(store.errors);
  }, [store.errors]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError("");
    try {
      if (!form.name || !form.password) {
        setFormError("Name and password are required");
        setLoading(false);
        return;
      }
      if (role !== "parent" && !form.email) {
        setFormError("Email is required for this role");
        setLoading(false);
        return;
      }

      if (role === "parent") {
        await api.parentSignup({ ...form });
        alert("Signed up successfully. Please login.");
        navigate("/login/parentlogin");
      } else if (role === "admin") {
        await api.adminSignup({ name: form.name, email: form.email, password: form.password });
        alert("Signed up successfully. Please login.");
        navigate("/login/adminlogin");
      } else if (role === "faculty") {
        await api.facultySignup({ name: form.name, email: form.email, password: form.password });
        alert("Signed up successfully. Please login.");
        navigate("/login/facultylogin");
      } else if (role === "student") {
        await api.studentSignup({ name: form.name, email: form.email, password: form.password });
        alert("Signed up successfully. Please login.");
        navigate("/login/studentlogin");
      }
    } catch (err) {
      setFormError("Signup failed. Please check your details and try again.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#51d665] h-screen w-screen flex items-center justify-center">
      <div className="grid grid-cols-2">
        <div
          className={`h-96 w-96 bg-white flex items-center justify-center ${
            translate ? "translate-x-[12rem]" : ""
          }  duration-1000 transition-all rounded-3xl shadow-2xl`}>
          <h1 className="text-[3rem]  font-bold text-center">Signup</h1>
        </div>
        <form
          onSubmit={onSubmit}
          className={`${
            loading ? "h-[32rem]" : "h-[30rem]"
          } w-96 bg-[#2c2f35] flex flex-col items-center justify-center ${
            translate ? "-translate-x-[12rem]" : ""
          }  duration-1000 transition-all space-y-4 rounded-3xl shadow-2xl p-4`}>
          <h1 className="text-white text-3xl font-semibold">Create Account</h1>
          <select value={role} onChange={(e)=>setRole(e.target.value)} className="w-72 p-2 rounded bg-[#515966] text-white">
            <option value="parent">Parent</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admin</option>
          </select>
          <input className="w-72 p-2 rounded bg-[#515966] text-white" placeholder="Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} required />
          <input className="w-72 p-2 rounded bg-[#515966] text-white" placeholder="Email (required for Admin/Faculty/Student)" type="email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
          <input className="w-72 p-2 rounded bg-[#515966] text-white" placeholder="Password" type="password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} required />
          <input className="w-72 p-2 rounded bg-[#515966] text-white" placeholder="Contact Number" value={form.contactNumber} onChange={(e)=>setForm({...form,contactNumber:e.target.value})} />
          <input className="w-72 p-2 rounded bg-[#515966] text-white" placeholder="Address" value={form.address} onChange={(e)=>setForm({...form,address:e.target.value})} />
          <button type="submit" className="w-32 hover:scale-105 transition-all duration-150 rounded-lg flex items-center justify-center text-white text-base py-1 bg-[#04bd7d]">Sign Up</button>
          {formError && <p className="text-red-500 text-sm">{formError}</p>}
          {loading && (
            <Spinner message="Signing Up" height={30} width={150} color="#ffffff" messageColor="#fff" />
          )}
          {error.emailError && <p className="text-red-500">{error.emailError}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;


