import React, { useState } from "react";

function Tabs({ label1, content1, label2, content2 }) {
  const tabsData = [
    {
      label: label1,
      content: content1,
    },
    {
      label: label2,
      content: content2,
    },
  ];

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 border-b-2 border-gray-200">
        {tabsData.map((tab, idx) => (
          <button
            key={idx}
            className={`py-2 px-4 text-base font-semibold border-b-2 ${
              idx === activeTabIndex
                ? "border-blue-500"
                : "border-transparent hover:border-gray-300"
            }`}
            onClick={() => setActiveTabIndex(idx)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4 lg:p-8 bg-gray-100">
        <div>{tabsData[activeTabIndex].content}</div>
      </div>
    </div>
  );
}

export default Tabs;
