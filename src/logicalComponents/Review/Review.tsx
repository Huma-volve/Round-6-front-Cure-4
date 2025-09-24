import { useState, useEffect } from "react"
import { baseUrl } from "../../api/apiLinks"
import avatar from "../../assets/avatar.png"
import CreateIcon from '@mui/icons-material/Create';
import ReviewModal from "./ReviewPopup";

export default function Review() {

    type User = { id: number; name: string; avatar: string | null }
    type ReviewItem = {
        id: number;
        user_id: number;
        doctor_id: number;
        rating: number;
        comment: string | null;
        created_at: string;
        user: User;
    };

    const [reviews, setReviews] = useState<ReviewItem[] | null>(null);
    const [averageRating, setAverageRating] = useState<number | null>(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchReviews("1")
    }, [])

    const fetchReviews = async (doctorId: string) => {

        try {
            console.log("Fetching:", `http://round5-online-booking-with-doctor-api.huma-volve.com/api/doctors/${doctorId}/reviews`);
            const res = await fetch(`${baseUrl}doctors/${doctorId}/reviews`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("Fetch reviews failed:", data);
                return;
            }

            // set the inner array (pagination wrapper: data.data.data)
            const items: ReviewItem[] = data?.data?.data ?? [];
            setReviews(items);

            console.log("Fetched reviews count:", items.length);

            if (items.length > 0) {
                const avg = items.reduce((s, r) => s + r.rating, 0) / items.length;
                setAverageRating(avg);
                localStorage.setItem("rating", avg.toFixed(1));
            }

        }
        catch (error) {
            console.error("No reviews to be displayed", error)

        }
    }

    const [open, setOpen] = useState(false);


    return (

        <div className="p-4 bg-white">
            <div className="flex justify-between">
                <h3 className="text-lg font-bold mb-3">Reviews and Rating</h3>
                <div className="flex justify-between items-center text-blue-600">
                    <CreateIcon />
                    <button onClick={() => setOpen(true)} className="cursor-pointer">Add Review</button>
                </div>
            </div>
            <ReviewModal
                open={open}
                onClose={() => setOpen(false)}
                onSubmitSuccess={() => fetchReviews("1")}
            />
            <div className="mt-3 space-y-3">
                {reviews && reviews.length > 0 ? (
                    <>
                        <p className="text-4xl mb-5">
                            {averageRating ? averageRating.toFixed(1) : "-"} /5                        </p>
                        <div className="mt-3 space-y-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {reviews.map((review) => (
                                <div key={review.id} className="border rounded-lg p-3 shadow-sm">
                                    <div className="flex justify-between mt-2 mb-5 items-start">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={avatar}
                                                alt={review.user.name}
                                                className="w-13 h-13 rounded-full object-cover"
                                            />
                                            <div>
                                                <p className="font-bold">{review.user.name}</p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(review.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-yellow-300 font-semibold rounded bg-yellow-100 w-10 max-h-8 min-w-12 text-center py-1">
                                            ⭐ {review.rating}
                                        </p>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">
                                        {review.comment ?? "-"}
                                    </p>


                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="text-sm text-gray-500 mt-3">No reviews yet.</p>
                )}
            </div>
        </div>
    );
};

