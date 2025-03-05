import { Button, App, Table } from "antd";
import PageTitle from "../../../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteEvent, getEvents } from "../../../../api-services/event-service";
import { getDateTimeFormat } from "../../../../helpers/dateTimeFormat";
import { Pen, Trash2 } from "lucide-react";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const { message } = App.useApp();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getEvents({
        searchText: "",
        date: "",
      });
      setEvents(response.data);
    } catch (error: any) {
      message.error(error?.response?.data?.message || "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const deleteEventHandler = async (id: string) => {
    try {
      setLoading(true);
      await deleteEvent(id);
      getData();
      message.success("Event deleted successfully");
    } catch (error) {
      message.error("Failed to delete event");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Event Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (date: any, row: any) => {
        return getDateTimeFormat(`${date} ${row.time}`);
      },
      key: "date",
    },
    {
      title: "Organizer",
      dataIndex: "organizer",
      key: "organizer",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (date: any) => getDateTimeFormat(date),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_text: any, eventData: any) => (
        <div className='flex gap-5'>
          <Trash2
            className='cursor-pointer text-red-700'
            size={16}
            onClick={() => deleteEventHandler(eventData._id)}
          />
          <Pen
            className='cursor-pointer text-yellow-700'
            size={16}
            onClick={() => navigate(`/admin/events/edit/${eventData._id}`)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className=''>
      <div className='flex justify-between items-center'>
        <PageTitle title={"Events"} />
        <Button onClick={() => navigate("/admin/events/create")} type='primary'>
          Create Events
        </Button>
      </div>

      <Table dataSource={events} columns={columns} loading={loading} />
    </div>
  );
};

export default EventsPage;
