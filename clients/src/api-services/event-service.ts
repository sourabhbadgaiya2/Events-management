import axios from "../config/axiosInstance";

export const createEvent = async (data: any) => {
  const response: any = axios.post("/api/events/create-event", data);
  return response.data;
};

// export const getEvents = async (filtersObj: FilterState) => {
//   const response: any = await axios.get(`/api/events/get-events`);
//   return response.data;
// };

export const getEvents = async (filtersObj: any) => {
  const response: any = await axios.get(
    `/api/events/get-events?searchText=${filtersObj.searchText}&date=${filtersObj.date}`
  );
  return response.data;
};

export const getEventById = async (id: string) => {
  const response: any = await axios.get(`/api/events/get-event/${id}`);
  return response.data;
};

export const updateEvent = async (id: string, data: any) => {
  const response: any = await axios.put(`/api/events/edit-event/${id}`, data);
  return response.data;
};

export const deleteEvent = async (id: string) => {
  const response: any = await axios.delete(`/api/events/delete-event/${id}`);
  return response.data;
};
