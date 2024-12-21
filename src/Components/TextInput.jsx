import React, { useState } from "react";

const TextInput = ({
  customization,
  label: initialLabel,
  placeholder: initialPlaceholder,
  type = "text",
  required = false,
  validationMessage: initialValidationMessage,
  onChange,
  value,
  styleOverrides = {},
}) => {
  const [error, setError] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Dynamic states for settings
  const [placeholder, setPlaceholder] = useState(
    initialPlaceholder || "Placeholder"
  );
  const [minLength, setminLength] = useState(0);
  const [maxLength, setmaxLength] = useState(99999);
  const [validationRegex, setValidationRegex] = useState("");
  const [validationMessage, setValidationMessage] = useState(
    initialValidationMessage || ""
  );

  const { selectedFont, primaryTextColor, answerBackground } = customization;

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Check for validation
    if (required && !inputValue) {
      setError(`This Field is required.`);
    } else if (minLength && inputValue.length < minLength) {
      setError(`Minimum length is ${minLength} characters.`);
    } else if (maxLength && inputValue.length > maxLength) {
      setError(`Maximum length is ${maxLength} characters.`);
    } else if (
      validationRegex &&
      !new RegExp(validationRegex).test(inputValue)
    ) {
      setError(validationMessage || "Invalid input.");
    } else {
      setError("");
    }

    // Call the parent's onChange function
    if (onChange) onChange(inputValue);
  };

  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

  return (
    <div className="space-y-3 max-w-[760px] mx-auto">
      <p
        className="text-4xl p-2 font-normal mb-4 bg-transparent placeholder outline-none"
        style={{ fontFamily: selectedFont, color: primaryTextColor }}
        contentEditable="true"
        data-placeholder="Write your question here..."
      ></p>

      <div className="relative">
        {/* Input */}
        <style>
          {`
            input::placeholder{
            color:${answerBackground}
            }
            `}
        </style>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          style={{
            fontFamily: selectedFont,
            color: answerBackground,
            borderBottom: `2px solid ${primaryTextColor}`,
          }}
          className="w-full bg-transparent outline-none border-b-2 focus:border-opacity-80 transition-all duration-200 p-2 text-xl "
        />

        {/* Error Message */}
        {error && (
          <p
            style={{
              color: "red",
              fontSize: "0.875rem",
              marginTop: "5px",
              ...styleOverrides.error,
            }}
          >
            {error}
          </p>
        )}

        {/* Settings Icon */}
        <button
          type="button"
          onClick={toggleSettings}
          className="absolute top-0 right-0 text-gray-500 hover:text-gray-700"
          style={{ fontSize: "1.5rem", padding: "5px", cursor: "pointer" }}
        >
          ⚙
        </button>
      </div>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div
          className="absolute bg-white shadow-lg p-4 border rounded-md mt-2 z-10 -top-1 right-4"
          style={{ width: "300px" }}
        >
          <h4 className="text-lg font-semibold mb-2">Field Settings</h4>

          <div className="mb-3">
            <label className="block mb-1 text-sm font-medium">
              Placeholder
            </label>
            <input
              type="text"
              value={placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1 text-sm font-medium">Min Length</label>
            <input
              type="number"
              value={minLength}
              onChange={(e) => setminLength(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1 text-sm font-medium">Max Length</label>
            <input
              type="number"
              value={maxLength}
              onChange={(e) => setmaxLength(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1 text-sm font-medium">
              Validation Regex
            </label>
            <input
              type="text"
              value={validationRegex}
              onChange={(e) => setValidationRegex(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1 text-sm font-medium">
              Error Message
            </label>
            <input
              type="text"
              value={validationMessage}
              onChange={(e) => setValidationMessage(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <button
            type="button"
            onClick={toggleSettings}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default TextInput;
