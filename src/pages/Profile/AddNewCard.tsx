import { useAddCard } from "@/hooks/ProfileHooks/useAddCard";
import BackButton from "@/logicalComponents/BackButton";
import AddCardForm from "@/logicalComponents/Profile/AddCardForm";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddNewCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { card_token } = location.state as { card_token: string };
  const { mutate } = useAddCard();
  return (
    <div className="container mx-auto mt-10">
      <div className="flex gap-10 items-center">
        <BackButton onClick={() => navigate(-1)} />
        <h1 className="text-3xl font-medium">Add New Card</h1>
      </div>
      <div>
        <AddCardForm card_token={card_token} mutate={mutate} />
      </div>
    </div>
  );
}
