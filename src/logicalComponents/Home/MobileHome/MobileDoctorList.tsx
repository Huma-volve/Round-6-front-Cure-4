import { Link } from "react-router-dom";
import { ListDoctor } from "../../../data/data";

// Import icons
import starIcon from "../../assets/icons/Star.svg";
import clockIcon from "../../assets/icons/Clock Circle.svg";
import likedIcon from "../../assets/icons/liked.svg";
import likeIcon from "../../assets/icons/like.svg";

// Define Doctor type (لو مش معرفه في data.ts)
interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  image: string;
  price: string;
  date: string;
  like?: number;
}

const MobileDoctorList: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 mb-[5vh]">
      {ListDoctor.map((doctor: Doctor) => (
        <Link key={doctor.id} to="/doctorDetailes">
          <div className="flex w-[96%] ml-[2%] gap-1 justify-between pr-4 border border-[#BBC1C7] rounded-[15px]">
            <div className="flex">
              <img loading="lazy" src={doctor.image} alt={doctor.name} />
              <div className="flex flex-col gap-1 py-3 pl-2 pr-4">
                <h1 className="font-medium text-[14px]">{doctor.name}</h1>
                <p className="text-[#6D7379] text-[11px]">{doctor.specialty}</p>
                <div className="flex gap-3 text-[11px]">
                  <div className="flex gap-1 items-center">
                    <img
                      loading="lazy"
                      src={starIcon}
                      alt="rate"
                      className="w-[16px]"
                    />
                    <p>{doctor.rating}</p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <img
                      loading="lazy"
                      src={clockIcon}
                      alt="date"
                      className="w-[16px]"
                    />
                    <p>{doctor.date}</p>
                  </div>
                </div>
              </div>
            </div>
            {doctor.like ? (
              <img loading="lazy" src={likedIcon} alt="like" />
            ) : (
              <img loading="lazy" src={likeIcon} alt="like" />
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MobileDoctorList;
