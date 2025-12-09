import { baseUrl } from "./apiLinks";

const token = localStorage.getItem("token");


// doctor profile 

export async function fetchDoctorData(doctorId: string) {
        try {
        const res = await fetch(`${baseUrl}doctors/${doctorId}`, {
        method: "GET",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
        });

        const data = await res.json();
        return data.data; // return the doctor info only
        } catch (error) {
        console.error("Doctor data is not available", error);
        return null;
        }
}




// make aapointment component 

export async function fetchAvailableSlots(doctorId: string) {
    try {
    const res = await fetch(`${baseUrl}doctors/${doctorId}/available-slots`, {
        method: "GET",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
    });

    const data = await res.json();

    // Transform array into object grouped by date
    const grouped: Record<string, string[]> = {};
    data.available_slots.forEach((slot: { date: string; time: string }) => {
        if (!grouped[slot.date]) {
        grouped[slot.date] = [];
        }
        grouped[slot.date].push(slot.time);
    });

    return grouped;
    } catch (error) {
    console.error("No slots are available", error);
    return null;
    }
}

export async function bookAppointment(doctorId: string, date: string, time: string) {
        try {
        const res = await fetch(`${baseUrl}appointments`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
        doctor_id: doctorId,
        date,
        time,
        }),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Unknown error");
    }

    return data;
    } catch (error) {
    console.error("Booking failed:", error);
    throw error;
    }
}



// reviews 

