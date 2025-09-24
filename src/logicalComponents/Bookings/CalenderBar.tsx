import { Calendar } from "lucide-react";
import { format } from "date-fns";
export default function CalenderBar() {
  // const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div className="border-1 w-55 rounded-2xl p-2 flex justify-center items-center ml-auto ">
      <div className="flex gap-2 ">
        <Calendar className="w-5 h-5 text-gray-600 " />
        <span>{format(new Date(), "EEEE, MMMM d")}</span>
      </div>
    </div>
  );
}
