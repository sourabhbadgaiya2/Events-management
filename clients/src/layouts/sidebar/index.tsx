import { Menu } from "lucide-react";
// import { UserType } from "../../interface";
import MenuItems from "./MenuItems";
import { useState } from "react";
import { Drawer } from "antd";
// import { useSelector } from "react-redux";
// import { RootState } from "../../store/store";

const SideBar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  // const user = useSelector((state: RootState) => state.user.user);

  return (
    <div className=''>
      <div className='lg:flex hidden h-full lg:w-60'>
        <MenuItems />
      </div>
      <div className='bg-[#C40C0C] p-5 flex lg:hidden'>
        <Menu
          size={20}
          color='white'
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        />
      </div>

      {showMobileMenu && (
        <Drawer
          open={showMobileMenu}
          placement='left'
          onClose={() => setShowMobileMenu(false)}
        >
          <MenuItems />
        </Drawer>
      )}
    </div>
  );
};

export default SideBar;
