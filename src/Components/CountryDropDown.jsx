import { useEffect, useState } from "react";
import countries from "@/lib/countries";
const CountryDropDown = () => {
  const [selectedKey, setSelectedKey] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countries);
  //get key using key-up event to filter countries
  useEffect(() => {
    const handlekeyup = (event) => {
      console.log(event.key);
      setSelectedKey(event.key.toLowerCase());
    };
    //adding key-up to this document
    document.addEventListener("keyup", handlekeyup);
  }, []);

  // Filter countries based on the key pressed
  useEffect(() => {
    if (selectedKey) {
      const filtered = countries.filter((country) => {
        console.log(country.label.slice(5));
        const countryName = country.label.slice(5);
        return countryName.charAt(0).toLowerCase() === selectedKey;
      });
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries); // Reset to all countries if no key pressed
    }
  }, [selectedKey]);

  return (
    <select>
      {filteredCountries.map((item, index) => (
        <option key={index} value={item.code}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default CountryDropDown;
