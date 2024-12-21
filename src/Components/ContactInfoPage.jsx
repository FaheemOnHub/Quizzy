import { useEffect, useState } from "react";

import countries from "@/lib/countries";

const ContactInfoPage = ({ customization }) => {
  const { selectedFont, primaryTextColor, answerBackground, bgColor } =
    customization;
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const handlePhoneChange = (value) => {
    setPhone(value);
  };

  // State to store contact fields
  const [contactInfo, setContactInfo] = useState({
    First_Name: "",
    Last_Name: "",
    email: "",

    address: "",
  });

  // Handle input changes
  const handleInputChange = (field, value) => {
    setContactInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 p-4 max-w-[760px] mx-auto">
      {/* Page Title */}
      <p
        className="text-4xl p-2 font-normal mb-4 bg-transparent placeholder outline-none"
        style={{ fontFamily: selectedFont, color: primaryTextColor }}
        contentEditable="true"
        data-placeholder="Enter your content here..."
      ></p>

      {/* Input Fields with Labels */}

      {Object.entries(contactInfo).map(([field, value]) => (
        <div key={field} className="space-y-2">
          <label
            htmlFor={field}
            className="block text-lg font-medium"
            style={{
              fontFamily: selectedFont,
              color: primaryTextColor,
            }}
          >
            {field.split("_").join(" ").charAt(0).toUpperCase() +
              field.split("_").join(" ").slice(1)}
          </label>

          {/* Input Field */}
          <input
            id={field}
            type={
              field === "email" ? "email" : field === "phone" ? "tel" : "text"
            }
            value={value}
            onChange={(e) => handleInputChange(field, e.target.value)}
            style={{
              fontFamily: selectedFont,
              color: answerBackground,
              borderBottom: `2px solid ${primaryTextColor}`,
            }}
            className="w-full bg-transparent outline-none border-b-2 focus:border-opacity-80 transition-all duration-200 p-2 text-xl "
          />
        </div>
      ))}
      <div class="phone-input ">
        <label
          className="block text-lg font-medium"
          style={{
            fontFamily: selectedFont,
            color: primaryTextColor,
          }}
        >
          Phone Number
        </label>
        <div className="flex flex-row">
          <select
            id="country-code"
            class="country-select"
            style={{
              fontFamily: selectedFont,
              color: answerBackground,
              borderBottom: `2px solid ${primaryTextColor}`,
            }}
            className="w-44 text-white bg-transparent outline-none border-b-2 focus:border-opacity-80 transition-all duration-200 p-2 text-xl "
          >
            {countries.map((item, index) => (
              <option key={index} value={item.code}>
                {item.label}
              </option>
            ))}
          </select>

          <input
            type="tel"
            id="phone-number"
            name="phone"
            style={{
              fontFamily: selectedFont,
              color: answerBackground,
              borderBottom: `2px solid ${primaryTextColor}`,
            }}
            className="w-full bg-transparent outline-none border-b-2 focus:border-opacity-80 transition-all duration-200 p-2 text-xl "
            placeholder="Enter your number"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfoPage;
