import { useState } from "react";
import { Search } from "lucide-react";
import CustomizeTab from "./CustomizeTab";
const Sidebar = ({
  currenState,
  setcurrenState,
  customization,
  setCustomization,
}) => {
  return (
    <div className="flex  flex-shrink-0 duration-200 bg-gray-50 border-x-[0.5px] border-gray-300 w-[226px] lg:w-[280px] ">
      <div className="flex flex-col p-3 h-screen  overflow-y-scroll">
        {currenState === "customiseMode" ? (
          <CustomizeTab
            setcurrenState={setcurrenState}
            customization={customization}
            setCustomization={setCustomization}
          />
        ) : (
          <div className="relative w-full">
            <Search
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
              name="searchbox"
            />
            <input
              type="text"
              placeholder="Search fields"
              name="searchbox"
              className="shadow-sm block w-full rounded pl-10 pr-8 sm:text-sm p-2 z-10 border border-gray-50 "
            />
          </div>
        )}

        {/* <div className="border border-purple-400">
          THIS SECTION IS FOR SLIDES
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
