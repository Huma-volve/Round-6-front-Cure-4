import NotificationItem from "../../logicalComponents/Notifications/NotificationsItem";
import notificationEmptyImg from "../../assets/images/notification-empty-image.svg";

// Removed TypeScript interface declaration as it's not valid in .jsx files

const notificationsItems = [
  {
    id: 1,
    title: "Upcoming Appointment",
    message: "Your appointment has been confirmed.",
    time: "1h",
  },
  {
    id: 2,
    title: "Appointment Completed",
    message:
      "You have successfully booked your appointment with Dr. Emily Walker.",
    time: "2h",
  },
  {
    id: 3,
    title: "Appointment Cancelled",
    message:
      "You have successfully cancelled your appointment with Dr. David Patel.",
    time: "3h",
  },
];

function NotificationsPage() {
  return (
    <div className=" mx-3 my-5">
      <h1 className="text-2xl font-bold text-center ">Notifications</h1>
      <div className="mt-6 h-[calc(100dvh-100px)] w-[45%] flex flex-col m-auto">
        <h2 className="text-lg text-blue-800 mb-2">Today</h2>
        {notificationsItems.length > 0 &&
          notificationsItems.map((item) => (
            <NotificationItem
              key={item.id}
              title={item.title}
              message={item.message}
              time={item.time}
            />
          ))}

        {notificationsItems.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full">
            <img
              loading="lazy"
              src={notificationEmptyImg}
              alt="No notifications"
            />
            <h1 className="text-lg">Nothing to display here!</h1>
            <p className="text-xs text-[#99A2AB]">
              We’ll notify you once we have new notifications.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
export default NotificationsPage;