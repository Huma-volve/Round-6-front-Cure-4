import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeartPulse, Menu, Search, X, Bell } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import userVector from "@/assets/user-vector.avif";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Authcontext } from '@/context/AuthProvider';


const navLinks: { name: string; link: string }[] = [
    { name: "Home", link: "/home" },
    { name: "Booking", link: "/bookings" },
    { name: "Doctor", link: "/doctor" },
];


const Navbar = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const {userInfo}=useContext(Authcontext)
    const navigate=useNavigate()



    const searchSchema = z.object({
      query: z.string().min(1, "Search query is required").max(100, "Query is too long"),
    });


const form = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: "" },
  });


  function onSubmit(e) {
    navigate(`/search/${e.query}`)
  }

    function toggleMenuHandler() {
        setIsNavOpen((prev) => !prev);
    }


    return (
        <header className="bg-white py-2 mb-12 px-5 fixed top-0 right-0 left-0  z-50 ">
            <div className="grid grid-cols-3 items-center  gap-5 relative">
              <Link to="/home" className="order-1 sm:order-none" >
                <HeartPulse className="text-[#145DB8] w-8 h-8" />
            </Link>
    <div className="col-span-3 sm:col-auto  order-3 sm:order-none ">
                  <Form {...form} >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border flex items-center rounded p-1  w-full "
        >
          <Search className="w-4 h-4 mr-2" />
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Search about specialty, doctor"
                    className="border-0 shadow-none focus-visible:ring-0 w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="ml-2 bg-[#145DB8] text-white hover:bg-blue-700"
            disabled={form.formState.isSubmitting}
          >
          Search
          </Button>
        </form>
      </Form>
             </div>
            <div className="flex gap-4 place-self-end order-2 sm:order-none col-span-2 sm:col-auto">
                <nav
                    className={`
                        transition duration-300 ease-in-out 
                        ${isNavOpen ? " translate-x-0 block" : "translate-x-full hidden"}
                    `}
                >
                    <ul className="flex gap-3">
                        {navLinks.map((linkObj) => (
                            <li
                                key={linkObj.name}
                                className="font-Georgian bg-gray-100 px-2 lg:px-5 py-2 rounded text-sm"
                            >
                                <NavLink
                                    className={({ isActive }) => isActive ? "text-blue-700 hover:text-blue-700" : "text-gray-900 hover:text-blue-700"}
                                    to={linkObj.link}
                                >
                                    {linkObj.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <button
                    className=" bg-gray-100 rounded cursor-pointer px-2"
                    onClick={toggleMenuHandler}
                    aria-label="Toggle navigation menu"
                >
                    {isNavOpen ? <X className="w-4" /> : <Menu className="w-4" />}
                </button>

                {/* Notifications */}
                <button
                    className="bg-gray-100 rounded cursor-pointer px-2"
                    aria-label="Notifications"
                >
                    <Bell className="w-4" />
                </button>

                <Link to="/profile">
                    <Avatar className="size-10 border-1">
                        <AvatarImage
                            src={userInfo?.avatar || userVector}
                            alt="user profile"
                        />
                    </Avatar>
                </Link>
            </div>
            </div>

        </header>
    );
};

export default Navbar;