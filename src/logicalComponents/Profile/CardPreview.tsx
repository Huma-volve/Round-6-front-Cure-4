import Visa from "../../assets/brandico_visa.png";
import MasterCard from "../../assets/logos_mastercard.png";
type CardPreviewData = {
  brand: string;
  cardNumber: string;
  cardHolderName: string;
};
export const CardPreview = ({
  brand,
  cardNumber,
  cardHolderName,
}: CardPreviewData) => {
  return (
    <div className="md:w-2xl md:h-3xl mb-10 bg-gradient-to-tr from-blue-400 via-blue-500 to-blue-700 rounded-4xl p-5 ">
      <div className="flex justify-between text-[#ffffff] ">
        <img
          className="w-10 h-10"
          src={brand === "MASTERCARD" ? MasterCard : Visa}
        />
        <h5 className="text-3xl font-bold">
          {brand === "MASTERCARD" ? "MasterCard" : "Visa"}
        </h5>
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-center text-2xl text-[#ffffff] mt-20">
          {cardNumber || "################"}
        </p>
        <p className="mt-20 text-2xl text-[#ffffff]">{cardHolderName}</p>
      </div>
    </div>
  );
};
