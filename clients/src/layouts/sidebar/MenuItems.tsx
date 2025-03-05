import {
  BookCheck,
  CandlestickChart,
  Home,
  List,
  LogOut,
  UserRound,
} from "lucide-react";

// import { UserType } from "../../interface";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { App } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const MenuItems = () => {
  const iconSize = 20;

  const user = useSelector((state: RootState) => state.user.user);

  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const { message } = App.useApp();

  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: <Home size={iconSize} />,
      isActive: currentPath === "/",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <Home size={iconSize} />,
      isActive: currentPath === "/profile",
    },
    {
      name: "Bookings",
      path: "/bookings",
      icon: <List size={iconSize} />,
      isActive: currentPath === "/bookings",
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <CandlestickChart size={iconSize} />,
      isActive: currentPath === "/reports",
    },
    { name: "Logout", path: "/logout", icon: <LogOut size={iconSize} /> },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: <Home size={iconSize} />,
      isActive: currentPath === "/",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <Home size={iconSize} />,
      isActive: currentPath === "/profile",
    },
    {
      name: "Events",
      path: "/admin/events",
      icon: <List size={iconSize} />,
      isActive: currentPath.includes("/admin/events"),
    },
    {
      name: "Bookings",
      path: "/admin/bookings",
      icon: <BookCheck size={iconSize} />,
      isActive: currentPath.includes("/admin/bookings"),
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <UserRound size={iconSize} />,
      isActive: currentPath.includes("/admin/users"),
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: <CandlestickChart size={iconSize} />,
      isActive: currentPath.includes("/reports"),
    },
    { name: "Logout", path: "/logout", icon: <LogOut size={iconSize} /> },
  ];

  const menuToRender = user?.role !== "Attendee" ? adminMenu : userMenu;

  const onLogout = () => {
    Cookies.remove("token");

    navigate(0);
    message.success("Logged Out Successfully");
  };

  return (
    <div className='lg:bg-gray-200 h-full p-5 w-full '>
      <div className='flex flex-col gap-1 lg:mt-5'>
        <h1 className='text-[#C40C0C] font-bold text-2xl'>
          SOURS
          <b className='text-[#222831] font-bold'> EVENTS</b>
        </h1>
        <span className='text-sm  text-gray-600'>{user?.name}</span>
      </div>

      <div className='flex flex-col gap-5 mt-10 lg:mt-16'>
        {menuToRender.map((item: any) => (
          <div
            key={item.name}
            onClick={() => {
              if (item.name === "Logout") {
                onLogout();
              } else {
                navigate(item.path);
              }
            }}
            className={`flex text-sm items-center gap-5 cursor-pointer  rounded px-5 py-3 ${
              item.isActive ? "bg-[#C40C0C] text-white" : ""
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuItems;
