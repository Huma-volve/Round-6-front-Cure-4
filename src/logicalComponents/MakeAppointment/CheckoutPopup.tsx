import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
    Box,
    Typography
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"; // PayPal
import AppleIcon from "@mui/icons-material/Apple"; // Apple Pay
import { useState } from "react";


const hourRate = localStorage.getItem("hourRate");

type PaymentPopupProps = {
    open: boolean;
    onClose: () => void;
    onPay: (method: string) => void;
};

export default function PaymentPopup({ open, onClose, onPay }: PaymentPopupProps) {
    const [method, setMethod] = useState("credit");


    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Payment Method</DialogTitle>
            <DialogContent>
                <RadioGroup
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="space-y-4"
                >
                    {/* Credit Card */}
                    <FormControlLabel
                        value="credit"
                        control={<Radio sx={{ display: "none" }} />} // hide default radio circle
                        label={
                            <Box
                                className={`flex items-center justify-between w-full p-3 rounded-lg border transition ${method === "credit" ? "bg-green-50 border-green-500" : "bg-white"
                                    }`}
                            >
                                <Box className="flex items-center gap-2">

                                    <Typography
                                        className={`font-medium ${method === "credit" ? "text-green-600" : "text-gray-800"
                                            }`}
                                    >
                                        Credit Card
                                    </Typography>
                                </Box>
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                                    alt="Visa"
                                    className="h-6"
                                />
                            </Box>
                        }
                        sx={{
                            width: "100%", margin: 0,
                            ".MuiFormControlLabel-label": {
                                width: "100%",
                                display: "block",
                            },
                        }} />

                    <FormControlLabel
                        value="paypal"
                        control={<Radio sx={{ display: "none" }} />}
                        label={
                            <Box

                                className={`flex items-center justify-between w-full p-3 rounded-lg border transition ${method === "paypal" ? "bg-green-50 border-green-500" : "bg-white"
                                    }`}
                            >
                                <Box className="flex items-center gap-2" sx={{ width: "100%", margin: 0 }}
                                >
                                    <Typography
                                        className={`font-medium w-full ${method === "paypal" ? "text-green-600" : "text-gray-800"
                                            }`}
                                    >
                                        PayPal
                                    </Typography>
                                </Box>
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png"
                                    alt="PayPal"
                                    className="h-6"
                                />
                            </Box>
                        }
                        sx={{
                            width: "100%", margin: 0, marginY: 1,
                            ".MuiFormControlLabel-label": {
                                width: "100%",
                                display: "block",
                            },
                        }}
                    />

                    <FormControlLabel
                        value="apple"
                        control={<Radio sx={{ display: "none" }} />}
                        label={
                            <Box
                                className={`flex items-center justify-between w-full p-3 rounded-lg border transition ${method === "apple" ? "bg-green-50 border-green-500" : "bg-white"
                                    }`}
                            >
                                <Box className="flex items-center gap-2">

                                    <Typography
                                        className={`font-medium ${method === "apple" ? "text-green-600" : "text-gray-800"
                                            }`}
                                    >
                                        Apple Pay
                                    </Typography>
                                </Box>
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                                    alt="Apple Pay"
                                    className="h-6"
                                />
                            </Box>
                        }
                        sx={{
                            width: "100%", margin: 0,
                            ".MuiFormControlLabel-label": {
                                width: "100%",
                                display: "block",
                            },
                        }}
                    />

                </RadioGroup>

                {/* Add new card */}
                <Box className="border-2 border-dashed rounded-lg p-3 text-center text-blue-600 cursor-pointer mt-4">
                    + Add new card
                </Box>

                {/* Price */}
                <Typography className="mt-4 text-lg font-semibold text-gray-700">
                    Price/hour: <span className="text-red-500">{hourRate}$</span>
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {onPay(method)}}
                >
                    Pay
                </Button>
            </DialogActions>
        </Dialog>
    );
}
