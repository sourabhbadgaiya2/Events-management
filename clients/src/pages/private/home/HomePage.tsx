import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import { App } from "antd";
import { getEvents } from "../../../api-services/event-service";
import EventCard from "./common/eventCard";
import { EventType } from "../../../interface";
import Filters from "./common/filters";
import Spinner from "../../../components/spinner";

interface FilterState {
  searchText: string;
  date: string;
}

const HomePage = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [events, setEvents] = useState<EventType[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    searchText: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);

  const { message } = App.useApp();

  const getData = async (filtersObj: FilterState) => {
    try {
      setLoading(true);
      const response = await getEvents(filtersObj);
      setEvents(response.data);
    } catch (error) {
      message.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData({ searchText: "", date: "" });
  }, []);

  if (loading) {
    return (
      <div className='flex h-screen justify-center items-center'>
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      <p className="text-gray-600 text-xl font-bold">Welcome, {user?.name}!!!</p>
      <Filters filters={filters} setFilters={setFilters} onFilter={getData} />
      <div className='flex flex-col gap-7 '>
        {events.map((event: any) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
