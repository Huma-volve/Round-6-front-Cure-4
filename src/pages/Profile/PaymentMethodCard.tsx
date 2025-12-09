import { useAllCards } from "@/hooks/ProfileHooks/useAllCards";
import BackButton from "@/logicalComponents/BackButton";
import { useLocation, useNavigate } from "react-router-dom";
import CardsImage from "../../assets/card.png";
import Visa from "../../assets/brandico_visa.png";
import MasterCard from "../../assets/logos_mastercard.png";
import { DeleteIcon } from "lucide-react";
import { useDeleteCard } from "@/hooks/ProfileHooks/useDeleteCard";
export default function PaymentMethodCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { brand } = location.state || "";
  console.log(brand);
  const { data, isLoading, error } = useAllCards();
  const { mutate } = useDeleteCard();
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
  console.log(data);
  console.log(brand);
  return (
    <div className="container mx-auto  px-10">
      <div className="flex gap-10 items-center mb-10">
        <BackButton onClick={() => navigate(-1)} />
        <h1 className="text-2xl font-medium">Payment Method</h1>
      </div>
      {data.data.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <img src={CardsImage} alt="cards-image" />
          <h3 className="text-xl font-semibold">Nothing to display here!</h3>
          <p className="text-lg font-medium text-[#6D7379]">
            Add your cards to make payment easier
          </p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          {data.data.map((card) => (
            <div
              key={card.id}
              className=" w-full sm:w-3/4 flex  items-center gap-2 border-1 mt-5 p-2 rounded-2xl bg-[#F5F6F7]"
            >
              <img src={card.brand === "MASTERCARD" ? MasterCard : Visa} />
              <p>{card.brand}</p>
              <button className="ml-auto" onClick={() => mutate(card.id)}>
                <DeleteIcon className="text-[#6D7379] " />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center justify-center">
        <button
          onClick={() => navigate("/add-new-card", { state: { brand: brand } })}
          className="w-full sm:w-3/4 bg-[#145DB8] h-12 rounded-xl mt-10 mb-10 text-[#FFFFFF] text-xl"
        >
          + Add Card
        </button>
      </div>
    </div>
  );
}
