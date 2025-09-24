
import { useEffect, useState } from "react";
import { fetchAvailableSlots, bookAppointment } from "../../api/appointment";
import CheckoutPopup from "./CheckoutPopup";

export default function MakeAppointment() {
    const [availableSlots, setAvailableSlots] = useState<Record<string, string[]> | null>(null);
    const [openPayment, setOpenPayment] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    useEffect(() => {
        async function loadSlots() {
            const slots = await fetchAvailableSlots("1");
            setAvailableSlots(slots);
        }
        loadSlots();
    }, []);

    const handleBooking = async () => {
        if (!selectedDate || !selectedTime) return;

        try {
            const data = await bookAppointment("1", selectedDate, selectedTime);
            alert("Booking successful!");
            console.log("Booking response:", data);
        } catch (error: any) {
            alert(`Booking failed: ${error.message}`);
        }
    };



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
                    handleBooking();
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
