import MakeAppointment from "../../logicalComponents/MakeAppointment/MakeAppointements"
import DoctorProfile from "../../logicalComponents/DoctorProfile/DoctorProfile"
import Review from "../../logicalComponents/Review/Review"
export default function Appointment() {

    return (
        <>
            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Doctor profile: first on small/medium, last on large */}
                <div className="order-1 lg:order-2">
                    <DoctorProfile />
                </div>

                {/* Appointment + reviews: below profile on small/medium, left side on large */}
                <div className="order-2 lg:order-1 md:col-span-2 space-y-6">
                    <MakeAppointment />
                    <Review />
                </div>
            </div>
        </>
    )
}