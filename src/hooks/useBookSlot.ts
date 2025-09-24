// // src/hooks/useBookSlot.ts
// import { useMutation } from '@tanstack/react-query';

// type BookPayload = {
//     doctor_id: string;
//     date: string;
//     time: string;
// };

// const bookSlot = async (payload: BookPayload) => {
//     const baseUrl = import.meta.env.VITE_BASE_URL;  
//     const res = await fetch(`${baseUrl}appointments`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload),
//     });
//     if (!res.ok) {
//     const body = await res.json().catch(() => null);
//     throw new Error(body?.message || 'The booking failed!');
//     }
//     return res.json();
// };

// export const useBookSlot = () => useMutation(bookSlot);
