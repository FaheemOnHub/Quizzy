import { useState } from "react";
import Sidebar from "./Sidebar";
import { Button } from "./ui/button";
import { ArrowLeft, Eye, Save, Settings2 } from "lucide-react";
import CustomizeTab from "./CustomizeTab";
import PreviewPage from "./Preview";
import MainEdit from "./MainEdit";
const QuestionFormv2 = () => {
  const [currenState, setcurrenState] = useState("sidebar");
  const [customization, setCustomization] = useState({
    logo: null,
    bgImage: null,
    primaryTextColor: "#333333", //questionColor
    secondaryTextColor: "#555555",
    buttonsColor: "#007BFF", //buttonColor
    buttonTextColor: "#FFFFFF", //buttonTextColor
    answerBackground: "#E3F2FD", //answerColor
    bgColor: "#000",
    selectedFont: "Arial",
  });
  return (
    <div className="min-h-screen flex flex-col overflow-y-hidden">
      <div className="bg-gray-50 border-b-[0.5px] border-gray-300 flex-shrink-0">
        <div className="relative" aria-label="Global">
          {/* top-bar */}
          <div className="pl-2 flex items-center w-full justify-between p-3">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <Button
              className="flex items-center gap-2 bg-black text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-6 py-3"
              onClick={() => setcurrenState("customiseMode")}
            >
              <Settings2 className="h-4 w-4" />
              Customisation
            </Button>

            <Button
              variant="outline"
              onClick={PreviewPage}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            <Button onClick={PreviewPage} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Quiz
            </Button>
          </div>
        </div>
      </div>
      <main className="min-h-screen relative ">
        <div className="flex flex-row">
          <Sidebar
            currenState={currenState}
            setcurrenState={setcurrenState}
            customization={customization}
            setCustomization={setCustomization}
          />
          <PreviewPage
            customization={customization}
            setCustomization={setCustomization}
          />
        </div>
      </main>
    </div>
  );
};

export default QuestionFormv2;
