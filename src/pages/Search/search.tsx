/* eslint-disable @typescript-eslint/no-explicit-any */
import BackButton from "@/components/ui/BackButton";
import SearchBox from "@/components/ui/searchBox";
import { Button } from "@/components/ui/button";
import { Filter, ChevronLeft, Clock, Star, Heart } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useAddFavorite } from "@/hooks/FavoriteHooks/useAddFavorite";
import { useDeleteFavorite } from "@/hooks/FavoriteHooks/useDeleteFavorite";
import { useGetFavorites } from "@/hooks/FavoriteHooks/useFavorite";
import { Link, useParams } from "react-router-dom";

export default function Search() {
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [specialities, setSpecialities] = useState<any[]>([]);
  const [showAllDoctors, setShowAllDoctors] = useState(false);
  const [activeSpec, setActiveSpec] = useState<number | null>(null);
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState<any[]>([]);
  const sortOptions = [
    "Most recommended",
    "Price Low to high",
    "Price High to low",
  ];
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = import.meta.env.VITE_API_TOKEN;
  const headers = { Authorization: `Bearer ${token}` };
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const addFavorite = useAddFavorite();
  const deleteFavorite = useDeleteFavorite();
  const { data: favoriteData } = useGetFavorites();
  const location = useLocation();
  const path = location.pathname;
  console.log(path);
  const { query } = useParams();

  const handleSortChange = (option: string) => {
    setSelectedSort(option);

    const sortedDoctors = [...filteredDoctors];

    switch (option) {
      case "Price Low to high":
        sortedDoctors.sort(
          (a, b) => parseFloat(a.price_per_hour) - parseFloat(b.price_per_hour)
        );
        break;
      case "Price High to low":
        sortedDoctors.sort(
          (a, b) => parseFloat(b.price_per_hour) - parseFloat(a.price_per_hour)
        );
        break;
      case "Most recommended":
        sortedDoctors.sort(
          (a, b) =>
            (parseFloat(b.average_rating) || 0) -
            (parseFloat(a.average_rating) || 0)
        );
        break;

        setFilteredDoctors(sortedDoctors);
    }
  };
  useEffect(() => {
    axios.get(`${baseUrl}specialities`, { headers }).then((res) => {
      const specs = res.data?.data ?? res.data ?? [];
      setSpecialities(specs);
    });

    axios.get(`${baseUrl}doctors`, { headers }).then((res) => {
      const docs = res.data?.data ?? res.data ?? [];
      setDoctors(docs);
      setFilteredDoctors(docs);
    });
  }, []);

  useEffect(() => {
    if (query) {
      handleSearchChange(query);
    }
  }, [query]);

  const handleSpecialityClick = (specialityId: number) => {
    const filtered = doctors.filter((doc) => doc.specialty_id === specialityId);
    setFilteredDoctors(filtered);
    setActiveSpec(specialityId);
  };

  const handleAllDoctorsClick = () => {
    setFilteredDoctors(doctors);
    setActiveSpec(null);
  };

  const doctorImages: Record<number, string> = {
    1: "/doctors/1.jpg",
    2: "/doctors/2.jpg",
    3: "/doctors/3.jpg",
    4: "/doctors/4.jpg",
    5: "/doctors/5.jpg",
    6: "/doctors/6.jpg",
    7: "/doctors/7.jpg",
    8: "/doctors/8.jpg",
    9: "/doctors/9.jpg",
    10: "/doctors/10.jpg",
    11: "/doctors/11.png",
    12: "/doctors/12.png",
    13: "/doctors/13.png",
    14: "/doctors/14.png",
    15: "/doctors/15.png",
    16: "/doctors/16.webp",
    17: "/doctors/17.webp",
    18: "/doctors/18.webp",
    19: "/doctors/19.webp",
    20: "/doctors/20.webp",
  };
  const doctorImagesCount = 20;
  function getDoctorImage(userId: number): string {
    const index = (userId % doctorImagesCount) + 1;
    return `/doctors/${index}.jpg`;
  }
  useEffect(() => {
    if (favoriteData?.data) {
      setFavorites(new Set(favoriteData?.data.map((doc) => doc.user_id)));
    }
  }, [favoriteData]);

  const Favorite = (doctorId: number) => {
    const newFavorites = new Set(favorites);
    if (favorites.has(doctorId)) {
      newFavorites.delete(doctorId);
      deleteFavorite.mutate(doctorId);
    } else {
      newFavorites.add(doctorId);
      addFavorite.mutate(doctorId);
    }
    setFavorites(newFavorites);
  };
  const DoctorCard = ({ doctor }: { doctor: any }) => {
    console.log(doctor.user_id);
    return (
      <div className="relative bg-white rounded-lg p-3 shadow-sm border border-gray-200 w-full">
        <button
          onClick={() => Favorite(doctor.user_id)}
          className="absolute top-2 right-2 p-1 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              favorites.has(doctor.user_id)
                ? "fill-red-600 text-red-600"
                : "text-gray-400 hover:text-red-400 cursor-pointer"
            }`}
          />
        </button>
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
            {doctorImages[doctor.specialty_id] && (
              <img
                src={getDoctorImage(doctor.user_id)}
                alt={doctor.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/doctors/1.jpg";
                }}
              />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">
              {doctor.name}
            </h3>
            <p className="text-gray-500 text-xs mb-2">
              {doctor.specialty_name_en || "General"} | {doctor.hospital_name}
            </p>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-gray-700 font-medium">
                  {doctor.average_rating || "4.8"}
                </span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Clock className="w-3 h-3" />
                <span>
                  {doctor.hospital_start_time} - {doctor.hospital_end_time}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-gray-600 text-xs">Price</span>
            <span className="text-gray-400 text-xs">/hour</span>
          </div>
          <span className="text-red-600 font-semibold text-sm">
            ${doctor.price_per_hour}
          </span>
        </div>

        <Link to="/">
          <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-md font-medium text-sm h-9 cursor-pointer">
            Book appointment
          </Button>
        </Link>
      </div>
    );
  };

  const visibleDoctors = showAllDoctors
    ? filteredDoctors
    : filteredDoctors.slice(0, 6);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);

    if (value.trim() === "") {
      if (activeSpec !== null) {
        setFilteredDoctors(
          doctors.filter((doc) => doc.specialty_id === activeSpec)
        );
      } else {
        setFilteredDoctors(doctors);
      }
      if (activeSpec !== null) {
        setFilteredDoctors(
          doctors.filter((doc) => doc.specialty_id === activeSpec)
        );
      } else {
        setFilteredDoctors(doctors);
      }
      setSearchResults([]);
      return;
    }

    axios
      .get(`${baseUrl}doctors/search?query=${encodeURIComponent(value)}`, {
        headers,
      })
      .then((res) => {
        const searchedDocs = res.data?.data ?? res.data ?? [];
        setFilteredDoctors(searchedDocs);
        const filteredSpecs = specialities.filter((spec) =>
          spec.name_en.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(filteredSpecs);
      })
      .catch(() => {
        setFilteredDoctors([]);
      });
    axios
      .get(`${baseUrl}doctors/search?query=${encodeURIComponent(value)}`, {
        headers,
      })
      .then((res) => {
        const searchedDocs = res.data?.data ?? res.data ?? [];
        setFilteredDoctors(searchedDocs);
        setSearchResults(searchedDocs);
      })
      .catch(() => {
        setFilteredDoctors([]);
        setSearchResults([]);
      });
  };

  return (
    //  <div className="container mx-auto mt-20">
    <div className="px-4 sm:px-6 lg:px-10 mt-20 max-w-7xl mx-auto">
      <div className="relative flex items-center justify-between md:justify-start md:gap-10">
        <BackButton />
        <h1 className="text-lg sm:text-xl md:text-2xl font-serif absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:left-auto">
          Search
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row justify-start items-center px-3 sm:px-5 py-4 sm:py-6 gap-3 sm:gap-4">
        <button className="items-center border border-gray-300 rounded-xl overflow-hidden cursor-pointer hover:bg-gray-100 hidden lg:flex ">
          <div className="flex items-center gap-2 px-3 py-2.5">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700 text-sm">Filter</span>
          </div>
          <div className="w-px h-6 bg-gray-300" />
          <div className="px-2">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </div>
        </button>

        <div className="w-full sm:w-auto flex-1 relative">
          <SearchBox
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />

          {searchResults.length > 0 && (
            <div className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full z-10 max-h-40 overflow-y-auto shadow-lg">
              {searchResults.map((doc) => (
                <div
                  key={doc.user_id}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                  onClick={() => {
                    setFilteredDoctors([doc]);
                    setSearchTerm(doc.name);
                    setSearchResults([]);
                  }}
                >
                  {doc.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <Link
          to="/map"
          className="items-center border border-gray-300 rounded-xl overflow-hidden cursor-pointer hover:bg-gray-100 flex sm:mr-2 md:mr-4"
        >
          <div className="flex items-center gap-2 px-3 py-2.5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            ></svg>

            <span className="text-gray-700 text-sm">Map</span>
          </div>
          <div className="w-px h-6 bg-gray-300" />
          <div className="px-2">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </div>
        </Link>
      </div>

      <div className="block md:hidden px-0">
        <h1 className="font-serif text-base sm:text-lg">All Specialties</h1>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={handleAllDoctorsClick}
            className={cn(
              "flex items-center gap-2 border border-gray-200 rounded-full px-3 py-2 transition text-sm whitespace-nowrap shadow-sm cursor-pointer",
              activeSpec === null
                ? "bg-blue-700 text-white hover:bg-blue-800"
                : "bg-white hover:bg-gray-100"
            )}
          >
            <span>All</span>
          </button>

          {specialities.map((spec) => (
            <button
              key={spec.id}
              onClick={() => handleSpecialityClick(spec.id)}
              className={cn(
                "flex items-center gap-2 border border-gray-200 rounded-full px-3 py-2 transition text-sm whitespace-nowrap cursor-pointer",
                activeSpec === spec.id
                  ? "bg-blue-800 text-white hover:bg-blue-900"
                  : "bg-white hover:bg-gray-100"
              )}
            >
              <img
                src={
                  spec.icon
                    ? `/${spec.icon}`
                    : "/specialists_images/gp-icon.svg"
                }
                alt={spec.name_en}
                className="w-4 h-4"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/specialists_images/gp-icon.svg";
                }}
              />

              <span>{spec.name_en}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 gap-4 grid grid-cols-2">
          {visibleDoctors.map((doctor, index) => (
            <DoctorCard key={doctor.user_id + index} doctor={doctor} />
          ))}
        </div>

        {filteredDoctors.length > 6 && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setShowAllDoctors(!showAllDoctors)}
              className="px-4 py-2 border border-blue-700 rounded-md hover:bg-gray-100 text-sm cursor-pointer text-blue-800"
            >
              {showAllDoctors ? "Show Less" : "View All"}
            </button>
          </div>
        )}
      </div>

      <div className="hidden md:grid md:grid-cols-[200px_1fr] md:items-start px-1 gap-2 sm:gap-4">
        <div className="flex flex-col text-start text-sm gap-4 bg-white rounded-lg p-4">
          <h1 className="font-semibold">Available Date</h1>
          <div className="flex items-center space-x-2">
            <Checkbox id="today" />
            <label htmlFor="today" className="text-sm leading-none">
              Today
            </label>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <Checkbox id="tomorrow" />
            <label htmlFor="tomorrow" className="text-sm leading-none">
              Tomorrow
            </label>
          </div>

          <h1 className="font-semibold">Gender</h1>
          <div className="flex justify-start gap-2 mb-2">
            <Button
              onClick={() => setGender("male")}
              className={cn(
                "w-15 h-8 cursor-pointer rounded-md px-4 text-sm",
                gender === "male"
                  ? "bg-[#145DB8] text-white hover:bg-blue-900"
                  : "bg-white text-black border border-gray-300 hover:bg-gray-100"
              )}
            >
              Male
            </Button>
            <Button
              onClick={() => setGender("female")}
              className={cn(
                "w-18 h-8 cursor-pointer rounded-md px-4 text-sm",
                gender === "female"
                  ? "bg-[#145DB8] text-white hover:bg-blue-800"
                  : "bg-white text-black border border-gray-300 hover:bg-gray-100"
              )}
            >
              Female
            </Button>
          </div>

          <h1 className="font-semibold">Consultation Type</h1>
          <div className="flex items-center space-x-2">
            <Checkbox id="in-clinic" />
            <label htmlFor="in-clinic" className="text-sm leading-none">
              In-clinic
            </label>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <Checkbox id="home-visit" />
            <label htmlFor="home-visit" className="text-sm leading-none">
              Home Visit
            </label>
          </div>

          <h1 className="font-semibold">Sort</h1>
          <div className="flex flex-col items-start gap-2">
            {sortOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSortChange(option)}
                className={cn(
                  "text-sm cursor-pointer px-3 py-1 rounded",
                  selectedSort === option
                    ? "bg-[#145DB8] text-white"
                    : "bg-white hover:bg-gray-100 text-black border border-gray-300"
                )}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setGender(null);
              setActiveSpec(null);
              setSelectedSort("");
              setShowAllDoctors(false);
              setFilteredDoctors(doctors);
            }}
            className="mt-4 w-15 px-2 py-2 border border-blue-800 text-blue-800 rounded-md hover:bg-gray-100  transition cursor-pointer text-sm"
          >
            Reset
          </button>
        </div>

        <div className="bg-white rounded-lg p-3">
          <h1 className="font-serif text-xl sm:text-2xl mb-4">
            Choose Specialties
          </h1>
          <div className="flex flex-wrap gap-2 sm:gap-3 text-sm">
            <button
              onClick={handleAllDoctorsClick}
              className={cn(
                "flex items-center gap-2 border border-gray-200 rounded-full px-3 py-2 transition text-sm whitespace-nowrap shadow-sm cursor-pointer",
                activeSpec === null
                  ? "bg-blue-800 text-white hover:bg-blue-900"
                  : "bg-white hover:bg-gray-100"
              )}
            >
              <span>All</span>
            </button>

            {specialities.map((spec) => (
              <button
                key={spec.id}
                onClick={() => handleSpecialityClick(spec.id)}
                className={cn(
                  "flex items-center gap-2 border border-gray-200 rounded-full px-3 py-2 transition text-sm whitespace-nowrap cursor-pointer",
                  activeSpec === spec.id
                    ? "bg-blue-800 text-white hover:bg-blue-900"
                    : "bg-white hover:bg-gray-100"
                )}
              >
                <img
                  src={
                    spec.icon
                      ? `/${spec.icon}`
                      : "/specialists_images/gp-icon.svg"
                  }
                  alt={spec.name_en}
                  className="w-4 h-4"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/specialists_images/gp-icon.svg";
                  }}
                />

                <span>{spec.name_en}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {visibleDoctors.map((doctor, index) => (
              <DoctorCard key={doctor.user_id} doctor={doctor} />
            ))}
          </div>

          {filteredDoctors.length > 6 && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setShowAllDoctors(!showAllDoctors)}
                className="px-4 py-2 border border-blue-700 rounded-md hover:bg-gray-100 text-sm cursor-pointer text-blue-800"
              >
                {showAllDoctors ? "Show Less" : "View All"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    //  </div>
  );
}
