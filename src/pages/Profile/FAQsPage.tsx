import { useFAQs } from "@/hooks/ProfileHooks/useFAQs";
import BackButton from "../../logicalComponents/BackButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function FAQsPage() {
  const { data, isLoading, error } = useFAQs();
  const [isOpenIds, setIsOpenIds] = useState<number[]>([]);
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
    <div className="container mx-auto mt-20">
      <div className="flex gap-10 items-center">
        <BackButton onClick={() => navigate(-1)} />
        <h1 className="text-2xl font-medium">FAQs</h1>
      </div>
      {data.data.map((content) => (
        <div
          key={content.id}
          className="bg-[#F5F6F7] p-5 rounded-2xl mb-5 mt-5"
        >
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleOpenQuestion(content.id)}
              className="text-xl"
            >
              {isOpenIds.includes(content.id) ? "-" : "+"}
            </button>
            <div className="w-full">
              <h3 className="text-xl font-semibold">{content.question}</h3>
              {isOpenIds.includes(content.id) && (
                <>
                  <hr className="w-full text-[#99A2AB] m-3 border-[#99A2AB]" />{" "}
                  <p className="text-[#99A2AB] text-xl">{content.answer}</p>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
