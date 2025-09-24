import BackButton from "@/logicalComponents/BackButton";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Visa from "../../assets/brandico_visa.png";
import MasterCard from "../../assets/logos_mastercard.png";
import PayPla from "../../assets/ic_outline-paypal.png";
import ApplePay from "../../assets/logos_apple-pay.png";
export default function PaymentPage() {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto mt-20 px-20">
      <div className="flex gap-10 items-center">
        <BackButton onClick={() => navigate(-1)} />
        <h1 className="text-2xl font-medium">Credit / Debit Card</h1>
      </div>
      <div className="flex items-center gap-5 bg-[#F5F6F7] p-5 rounded-2xl mb-5 mt-10">
        <div className="flex  items-center gap-4">
          <img src={Visa} alt="visa-image" />
          <p className="text-xl ">VISA</p>
        </div>
        <button
          className="ml-auto"
          onClick={() =>
            navigate("/payment-method-card", {
              state: { card_token: "tok_visa" },
            })
          }
        >
          <ArrowForwardIosIcon className="text-[#99A2AB] " fontSize="medium" />
        </button>
      </div>
      <div className="flex items-center gap-5 bg-[#F5F6F7] p-5 rounded-2xl mb-5">
        <div className="flex  items-center gap-4">
          <img src={MasterCard} alt="matercard-image" />
          <p className="text-xl ">MasterCard</p>
        </div>
        <button
          className="ml-auto"
          onClick={() =>
            navigate("/payment-method-card", {
              state: { card_token: "tok_mastercard" },
            })
          }
        >
          <ArrowForwardIosIcon className="text-[#99A2AB] " fontSize="medium" />
        </button>
      </div>
      <h3 className="text-2xl font-medium mb-5 mt-10">Mobile Wallets </h3>
      <div className="flex items-center gap-5 bg-[#F5F6F7] p-5 rounded-2xl mb-5">
        <div className="flex  items-center gap-4">
          <img src={ApplePay} alt="apple-image" />
          <p className="text-xl ">Apple Pay</p>
        </div>
        <button className="ml-auto" onClick={() => {}}>
          <input
            type="checkbox"
            className=" appearance-none w-5 h-5 rounded-full border-2 border-[#99A2AB] checked:bg-green-700 checked:border-green-700"
          />
        </button>
      </div>
      <div className="flex items-center gap-5 bg-[#F5F6F7] p-5 rounded-2xl mb-5">
        <div className="flex  items-center gap-4">
          <img src={PayPla} alt="paypla-image" />
          <p className="text-xl ">PayPla</p>
        </div>
        <button className="ml-auto" onClick={() => {}}>
          <input
            type="checkbox"
            className=" appearance-none w-5 h-5 rounded-full border-2 border-[#99A2AB] checked:bg-green-700 checked:border-green-700"
          />
        </button>
      </div>
    </div>
  );
}
