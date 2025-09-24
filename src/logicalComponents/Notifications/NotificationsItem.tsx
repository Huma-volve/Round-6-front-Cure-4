import upcomingAppointmentIcon from "../../assets/icons/upcoming-appointment-icon.svg";
import appointmentCompletedIcon from "../../assets/icons/completed-appointment-icon.svg";
import appointmentCancelledIcon from "../../assets/icons/cancelled-appointment-icon.svg";
import { Link } from "react-router-dom";

interface NotificationItemProps {
  title: string;
  message: string;
  time: string;
}

export default function NotificationItem({ title, message, time }: NotificationItemProps) {
  let icon;
  let bgColor;

  switch (title) {
    case "Upcoming Appointment":
      icon = upcomingAppointmentIcon;
      bgColor = "bg-blue-100";
      break;
    case "Appointment Completed":
      icon = appointmentCompletedIcon;
      bgColor = "bg-green-100";
      break;
    case "Appointment Cancelled":
      icon = appointmentCancelledIcon;
      bgColor = "bg-red-100";
      break;
    default:
      icon = null;
      bgColor = "bg-gray-100";
  }

  return (
    <Link to="/myBooking">
      <div
        className={`flex items-center py-4 h-[86px] hover:bg-gray-50 transition-colors duration-200`}
      >
        {icon && (
          <div
            className={`flex-shrink-0 size-[60px] flex items-center justify-center rounded-full ${bgColor}`}
          >
            <img loading="lazy" src={icon} alt={title} />
          </div>
        )}
        <div className="w-[80%] pl-4 sm:w-[90%]">
          <div className="flex justify-between items-center mb-1 w-full">
            <h2>{title}</h2>
            <p className="text-sm text-gray-400">{time}</p>
          </div>
          <p className="text-sm text-gray-400 w-[80%] truncate">{message}</p>
        </div>
      </div>
    </Link>
  );
}
