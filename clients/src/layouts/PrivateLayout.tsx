import { App } from "antd";
import Cookies from "js-cookie";
import SideBar from "./sidebar";
import { useEffect, useState } from "react";
import { RootState } from "../store/store";
import Spinner from "../components/spinner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/features/userSlice";
import { getCurrentUser } from "../api-services/user-service";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  //
  const [showContent, setShowContent] = useState(false);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state: RootState) => state.user.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message } = App.useApp();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getCurrentUser();
      dispatch(setUser(response.data));
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      navigate("/home");
    } else {
      getData();
      setShowContent(true);
    }
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Spinner />
      </div>
    );
  }

  return (
    showContent &&
    user && (
      <div className='flex lg:flex-row flex-col  gap-5 h-screen'>
        <SideBar />
        <div className='flex-1 px-2 lg:mt-10'>{children}</div>
      </div>
    )
  );
};

export default PrivateLayout;
