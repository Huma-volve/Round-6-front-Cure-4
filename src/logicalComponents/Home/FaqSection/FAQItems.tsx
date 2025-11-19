import { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleExpansion = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="mb-4">
      <div
        onClick={toggleExpansion}
        className={`${
          isExpanded ? "border-b border-gray-300 rounded-t-md " : "rounded-md "
        } flex items-center justify-between gap-2 bg-[#F5F6F7] pr-3 pl-[16px] py-2 cursor-pointer hover:bg-gray-100 transition-colors`}
      >
        <p className="text-sm font-medium text-gray-800 flex-1">{question}</p>
        <span className="text-lg font-bold text-gray-600 min-w-[20px]">
          {isExpanded ? "-" : "+"}
        </span>
      </div>
      {isExpanded && (
        <div className="py-3 bg-[#F5F6F7]">
          <p className="text-sm text-[#99A2AB] px-4">{answer}</p>
        </div>
      )}
    </div>
  );
}
