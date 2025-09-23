import BackButton from "@/components/ui/BackButton";
import SearchBox from "@/components/ui/searchBox";
import { Button } from "@/components/ui/button";
import { Filter, ChevronLeft } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { DoctorCard } from "@/components/ui/DoctorCard";

export default function search() {
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
  const { query } = useParams();

  const handleSortChange = (option: string) => {
    setSelectedSort(option);

    let sortedDoctors = [...filteredDoctors];

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
    }

    setFilteredDoctors(sortedDoctors);
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
        setSearchResults(searchedDocs);
      })
      .catch(() => {
        setFilteredDoctors([]);
        setSearchResults([]);
      });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10 mt-5 max-w-7xl mx-auto">
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
  );
}
