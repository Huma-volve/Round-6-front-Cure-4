import { useState, useEffect } from "react"
import avatar from "../../assets/avatar.png"
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import GradeIcon from '@mui/icons-material/Grade';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PaidIcon from '@mui/icons-material/Paid';
import { fetchDoctorData } from "../../api/appointment";

export default function DoctorProfile() {

    const rating = localStorage.getItem("rating");

    // maaaaap
    const DefaultIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    // doctors / 1
    const [doctor, setDoctor] = useState<doctor | null>(null);

    useEffect(() => {
        async function loadDoctor() {
            const doctorData = await fetchDoctorData("1");
            if (doctorData) {
                setDoctor(doctorData);
                localStorage.setItem("hourRate", doctorData.price_per_hour?.toString() ?? "100");
            }
        }
        loadDoctor();
    }, []);

    if (!doctor) return <p className="p-4">Loading doctor profile...</p>;


    return (
        <div className="p-4 rounded-2xl shadow-md bg-white">
            <div className="flex flex-col items-center">
                <img
                    src={avatar}
                    alt={doctor.name}
                    className="w-24 h-24 rounded-full mb-2"
                />
                <h2 className="text-lg font-bold">{doctor.name}</h2>
                <p className="text-gray-500">{doctor.specialty_name_en}</p>
            </div>

            <div className="flex justify-around my-8 text-center">
                <div>
                    <PeopleAltIcon className="mx-auto" />
                    <p className="font-bold">2,000+</p>
                    <p className="text-sm text-gray-500">Patients</p>
                </div>
                <div>
                    <PaidIcon className="mx-auto" />
                    <p className="font-bold">{parseInt(doctor.price_per_hour)}$</p>
                    <p className="text-sm text-gray-500">per hour</p>
                </div>
                <div>
                    <WorkspacePremiumIcon className="mx-auto" />
                    <p className="font-bold">{doctor.experience_years}+</p>
                    <p className="text-sm text-gray-500">experience</p>
                </div>
                <div>
                    <GradeIcon className="mx-auto" />
                    <p className="font-bold">{rating ?? "-"}</p>
                    <p className="text-sm text-gray-500">rating</p>
                </div>
            </div>

            <p className="text-sm text-gray-600">
                {doctor.about}
            </p>

            <div className="mt-4">
                <p className="font-bold">Location</p>

                <div className="h-64 w-full rounded-lg overflow-hidden mt-2 relative">

                    <MapContainer
                        center={[30.0444, 31.2357]}
                        zoom={13}
                        scrollWheelZoom={false}
                        className="h-full w-full"
                    >
                        <TileLayer
                            attribution="&copy; OpenStreetMap contributors"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[30.0444, 31.2357]} />
                    </MapContainer>

                    {/* Address / hospital name overlay */}
                    <div className="absolute bottom-2 left-2 right-2 bg-white shadow-md rounded-md px-3 py-2 flex items-center gap-2 text-sm z-10">
                        <LocationOnIcon className="text-blue-600" fontSize="small" />
                        <span>{doctor.hospital_name || "129, El-Nasr Street, Cairo, Egypt fixed"}</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

