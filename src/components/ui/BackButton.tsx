import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton({
  router = -1,
}: {
  router?: string | number;
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (typeof router === "number") {
      navigate(router);
    } else {
      navigate(router);
    }
  };

  return (
    <div onClick={handleClick} className=" text-black cursor-pointer mt-1">
      <ChevronLeft className="w-6 h-6" />
    </div>
  );
}
