import { useState } from "react";
import {
    Modal,
    Box,
    Typography,
    IconButton,
    Rating,
    TextField,
    Button,
    Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { baseUrl } from "../../api/apiLinks"
import avatar from "../../assets/avatar.png"



interface ReviewModalProps {
    open: boolean;
    onClose: () => void;
    onSubmitSuccess: () => void;
}

export default function ReviewModal({ open, onClose, onSubmitSuccess }: ReviewModalProps) {
    const [rating, setRating] = useState<number | null>(0);
    const [review, setReview] = useState<string>("");

    const token = localStorage.getItem("token");

    const submitReview = async (doctorId: string) => {
        try {
            const res = await fetch(`${baseUrl}doctors/${doctorId}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization:
                        `Bearer ${token}`,
                },
                body: JSON.stringify({
                    doctor_id: doctorId,
                    rating,
                    comment: review,
                    img: avatar,
                }),

            })

            const data = await res.json();
            console.log("review response:", data);

            if (res.ok) {
                alert("Your review is added 🎉")
                onSubmitSuccess(); // tell parent to refresh
                onClose();
            } else {
                alert(`${data.message || "Unknown error"} try again`);
            }

        }
        catch (error) {
            console.log(error)
        }

    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                backdropFilter: "blur(5px)",
                backgroundColor: "rgba(255,255,255,0.1)",
            }}
        >
            <Box
                sx={{
                    position: "absolute" as const,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "white",
                    borderRadius: "12px",
                    boxShadow: 24,
                    p: 4,
                    width: 400,
                }}
            >
                {/* Exit button */}
                <IconButton
                    onClick={onClose}
                    sx={{ position: "absolute", right: 12, top: 12 }}
                >
                    <CloseIcon />
                </IconButton>

                {/* Title */}
                <Typography variant="h6" mb={2}>
                    Your Rate
                </Typography>

                {/* Stars + Number side by side */}
                <Stack direction="row" alignItems="center" justifyContent={"space-between"} spacing={2}>
                    <Rating
                        name="review-rating"
                        value={rating}
                        onChange={(_, newValue) => setRating(newValue)}
                        precision={1}
                        size="large"
                    />
                    <Typography variant="h6" fontWeight="bold">
                        {rating}/5
                    </Typography>
                </Stack>

                {/* Review text */}
                <Typography mt={3} mb={1}>
                    Your review
                </Typography>

                <TextField
                    multiline
                    rows={4}
                    fullWidth
                    placeholder="Write your review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />

                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, borderRadius: "8px" }}
                    onClick={() => {
                        submitReview("1")
                        console.log("Rating:", rating, "Review:", review);
                        onClose();
                    }}

                >
                    Send your review
                </Button>
            </Box>
        </Modal >
    );
}
