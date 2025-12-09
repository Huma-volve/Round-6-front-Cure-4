// // slots 
// import { useQuery } from '@tanstack/react-query';
// import type { AvailableSlotsResponse } from '../types/slots';



// const fetchAvailableSlots = async (doctorId: string): Promise<AvailableSlotsResponse> => {

//     const baseUrl = import.meta.env.VITE_BASE_URL;  
//     const res = await fetch(`${baseUrl}doctors/${doctorId}/available-slots`);
//     if (!res.ok) throw new Error('Unable to get the available appointments!');
//     return res.json();


// export const useAvailableSlots = (doctorId: string) =>
//     useQuery<AvailableSlotsResponse, Error>(
//     ['availableSlots', doctorId],
//     ) => fetchAvailableSlots(doctorId),
//     {
//         staleTime: 1000 * 60 * 5, // 5 دقائق
//         retry: 1,
//     }
// )

// export const useAvailableSlots 