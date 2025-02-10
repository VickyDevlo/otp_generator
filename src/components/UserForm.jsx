import React, { useEffect, useRef, useState } from "react";
import { Wrapper, Heading, Input, Button } from "../shared";
import { BsArrowRightShort } from "react-icons/bs";
import { toast } from "react-toastify";

export const UserForm = ({
  setUserData,
  setStep,
  generateOtp,
  setGeneratedOtp,
}) => {
  const [form, setForm] = useState({ name: "", email: "" });

  const inputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name" && !/^[A-Za-z ]*$/.test(value)) {
      return;
    }
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

  const isDisabled =
    !form.name || !form.name.trim() || !form.email.includes("@gmail.com");

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Wrapper>
      <Heading className="mb-1">User Details</Heading>
      <div className="md:px-12 w-full">
        <Input
          type="text"
          ref={inputRef}
          name="name"
          placeholder="Enter Your Name"
          inputMode="Text"
          pattern="[A-Za-z]*"
          value={form.name}
          onChange={handleChange}
          className="border border-gray-200 rounded capitalize"
        />
        <Input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          required
          value={form.email}
          onChange={handleChange}
          onKeyDown={(e) => onKeyDownHandler(e)}
          className="border border-gray-200 rounded"
        />
      </div>
      <Button isDisabled={isDisabled} onClick={handleSubmit}>
        Next
        <BsArrowRightShort size={20} />
      </Button>
    </Wrapper>
  );
};
