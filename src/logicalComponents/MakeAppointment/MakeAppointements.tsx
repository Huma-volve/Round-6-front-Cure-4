
import { useEffect, useState } from "react";
import { baseUrl } from "../../api/apiLinks"
import CheckoutPopup from "./CheckoutPopup";

export default function MakeAppointment() {

    const [availableSlots, setAvailableSlots] = useState<Record<string, string[]> | null>(null);

    const [openPayment, setOpenPayment] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchAvailableSlots("1")
    }, [])

    const fetchAvailableSlots = async (doctorId: string) => {

        try {
            console.log("Fetching:", `http://round5-online-booking-with-doctor-api.huma-volve.com/api/doctors/${doctorId}/available-slots`);

            const res = await fetch(`${baseUrl}doctors/${doctorId}/available-slots`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Token in storage:", localStorage.getItem("token"));

            // console.log("Fetching:", `${baseUrl}doctors/${doctorId}/available-slots`);

            const data = await res.json();

            // transform array into object grouped by date
            const grouped: Record<string, string[]> = {};
            data.available_slots.forEach((slot: { date: string; time: string }) => {
                if (!grouped[slot.date]) {
                    grouped[slot.date] = [];
                }
                grouped[slot.date].push(slot.time);
            });

            setAvailableSlots(grouped);
            console.log("Grouped slots:", grouped);
            console.log("AvailableSlots", availableSlots);
            // console.log("Raw response:", data.available_slots);
        }
        catch (error) {
            console.error("No slots are available", error)
        }
    }

    const handleBooking = async (doctorId: string) => {
        try {
            const res = await fetch(`${baseUrl}appointments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization:
                        `Bearer ${token}`,
                },
                body: JSON.stringify({
                    doctor_id: doctorId,
                    date: selectedDate,
                    time: selectedTime,
                }),

            })

            const data = await res.json();
            console.log("Booking response:", data);

            if (res.ok) {
                alert("Booking successful!");
            } else {
                alert(`Booking failed: ${data.message || "Unknown error"}`);
            }

        }
        catch (error) {
            console.log(error)
        }

    }

    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);


    return (
        <div className="p-4 rounded-2xl shadow-md bg-white">
            <h3 className="text-lg font-bold mb-4">Choose date and time</h3>

            <div className="flex gap-2 mb-4">
                {availableSlots &&
                    Object.keys(availableSlots).map((date) => (
                        <button
                            key={date}
                            onClick={() => {
                                setSelectedDate(date);
                                setSelectedTime(null); // reset time if date changes
                            }}
                            className={`px-3 py-2 rounded-lg border ${selectedDate === date
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-700"
                                }`}
                        >
                            {date}
                        </button>
                    ))}
            </div>

            {/* time  */}
            {selectedDate && availableSlots && (
                <div className="flex gap-2 flex-wrap mb-3">
                    {availableSlots[selectedDate].map((time) => (
                        <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`px-4 py-2 rounded-lg border ${selectedTime === time
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-700"
                                }`}
                        >
                            {time}
                        </button>
                    ))}
                </div>
            )}

            {/* Selected */}
            {selectedTime && (
                <p className="text-sm mb-2">
                    Selected:{" "}
                    <span className="font-bold">
                        {selectedDate} - {selectedTime}
                    </span>
                </p>
            )}

            <button
                disabled={!selectedDate || !selectedTime}
                onClick={() => {
                    handleBooking("1");
                    setOpenPayment(true)
                }
                }
                className={`mt-2 w-full py-2 rounded-lg ${!selectedDate || !selectedTime
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white cursor-pointer"
                    }`}
            >
                Book
            </button>


            <CheckoutPopup
                open={openPayment}
                onClose={() => setOpenPayment(false)}
                onPay={(method) => {
                    alert(`Payment with ${method} successful ✅`);
                    setOpenPayment(false);
                }}
            />
        </div>
    );
}
