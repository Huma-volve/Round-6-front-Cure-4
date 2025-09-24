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
  const { card_token } = location.state || "";
  console.log(card_token);
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
  console.log(card_token);
  return (
    <div className="container mx-auto mt-20 px-20">
      <div className="flex gap-10 items-center">
        <BackButton onClick={() => navigate(-1)} />
        <h1 className="text-2xl font-medium">Payment Method</h1>
      </div>
      {data.data.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <img src={CardsImage} alt="cards-image" />
          <h3 className="text-2xl font-medium">Nothing to display here!</h3>
          <p className="text-xl font-medium text-[#6D7379]">
            Add your cards to make payment easier
          </p>
        </div>
      ) : (
        <div>
          {data.data.map((card) => (
            <div
              key={card.id}
              className="flex items-center gap-2 border-1 mt-5 p-2 rounded-2xl bg-[#F5F6F7]"
            >
              <img src={card.brand === "mastercard" ? MasterCard : Visa} />
              <p>{card.brand}</p>
              <button className="ml-auto" onClick={() => mutate(card.id)}>
                <DeleteIcon className="text-[#6D7379] " />
              </button>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() =>
          navigate("/add-new-card", { state: { card_token: card_token } })
        }
        className="w-full bg-[#145DB8] h-12 rounded-xl mt-10 mb-10 text-[#FFFFFF] text-2xl"
      >
        + Add Card
      </button>
    </div>
  );
}
