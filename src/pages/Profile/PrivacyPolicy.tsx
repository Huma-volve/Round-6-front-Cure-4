import { usePrivacyPolicy } from "@/hooks/ProfileHooks/usePrivacyPolicy";
import BackButton from "../../logicalComponents/BackButton";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
export default function PrivacyPolicy() {
  const { data, isLoading, error } = usePrivacyPolicy();
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
  return (
    <div className="container mx-auto mt-20 ">
      <div className="flex gap-10 items-center">
        <BackButton onClick={() => navigate(-1)} />
        <h1 className="text-2xl font-medium">{data.data.title}</h1>
      </div>
      {data && (
        <div className="mt-10">
          <article className="whitespace-pre-line text-gray-700  text-xl">
            <ReactMarkdown>{data.data.content}</ReactMarkdown>
          </article>
        </div>
      )}
    </div>
  );
}
