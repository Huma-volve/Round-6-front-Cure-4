import { useFAQs } from "@/hooks/ProfileHooks/useFAQs";
import BackButton from "../../logicalComponents/BackButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function FAQsPage() {
  const { data, isLoading, error } = useFAQs();
  const [isOpenIds, setIsOpenIds] = useState<number[]>([]);
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const navigate = useNavigate();
  if (isLoading)
    return (
      <p className="text-red-800 font-semibold align-center text-2xl">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="text-red-800 font-semibold align-center text-2xl">
        Error loading items
      </p>
    );
  if (!data)
    return (
      <p className="text-red-800 font-semibold align-center text-2xl">
        No data!
      </p>
    );
  const handleOpenQuestion = (id: number) => {
    if (isOpenIds.includes(id)) {
      // close it
      setIsOpenIds(isOpenIds.filter((openId) => openId !== id));
    } else {
      //open it
      setIsOpenIds([...isOpenIds, id]);
    }
  };
  return (
    <div className="container mx-auto mt-20 px-20">
      <div className="flex items-center justify-between">
        <div className="flex gap-10 items-center">
          <BackButton onClick={() => navigate(-1)} />
          <h1 className="text-2xl font-medium">FAQs</h1>
        </div>
        <button onClick={() => setLanguage(language === "en" ? "ar" : "en")}>
          {language === "en" ? "عربي" : "English"}
        </button>
      </div>
      {data.data.map((content) => {
        const questionText = content.translations[language].question;
        // const q = content.translations[lang].question;
        const answerText = content.translations[language].answer;
        return (
          <div
            key={content.id}
            className={`bg-[#F5F6F7] p-5 rounded-2xl mb-5 mt-5 ${
              language === "en" ? "text-left" : "text-right"
            } `}
          >
            <div
              className={`flex items-center gap-2 ${
                language === "en" ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <button
                onClick={() => handleOpenQuestion(content.id)}
                className="text-xl font-semibold"
              >
                {isOpenIds.includes(content.id) ? "-" : "+"}
              </button>
              <div className="w-full">
                <h3 className="text-xl font-semibold">{questionText}</h3>
                {isOpenIds.includes(content.id) && (
                  <>
                    <hr className="w-full text-[#99A2AB] my-3 border-[#99A2AB]" />{" "}
                    <p className="text-[#99A2AB] text-xl">{answerText}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
