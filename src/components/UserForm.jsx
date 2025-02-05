import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Wrapper } from "./Wrapper";
import { BsArrowRightShort } from "react-icons/bs";

export const UserForm = ({
  setUserData,
  setStep,
  generateOtp,
  setGeneratedOtp,
}) => {
  const [form, setForm] = useState({ name: "test", email: "test@gmail.com" });

  const inputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("All fields are required!");
      return;
    }

    setUserData(form);
    const newOtp = generateOtp();
    setGeneratedOtp(newOtp);
    toast.success(`Your OTP - ${newOtp}`);
    setStep(2);
  };

  const isDisabled = !form.name || !form.email.includes("@");

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Wrapper>
      <h1
        className="font-semibold text-center text-gray-700 text-2xl 
      tracking-widest mb-3"
      >
        User Details
      </h1>
      <div className="md:px-12 w-full">
        <input
          type="text"
          name="name"
          ref={inputRef}
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
          className="border border-gray-400 font-medium text-gray-700 p-2 rounded w-full mb-3 focus:outline-0 capitalize"
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          onKeyDown={(e) => onKeyDownHandler(e)}
          className="border border-gray-400 font-medium text-gray-700 p-2 rounded w-full mb-3 focus:outline-0"
        />
      </div>
      <button
        disabled={isDisabled}
        className="flex items-center justify-center gap-1 text-white
         bg-blue-500 px-4 py-1 rounded text-md tracking-wider cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition-all"
        onClick={handleSubmit}
      >
        Next
        <BsArrowRightShort size={20} />
      </button>
    </Wrapper>
  );
};
