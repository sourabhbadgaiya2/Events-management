import { useState } from "react";
import { EventType } from "../../../../interface";

const TicketsSelection = ({ eventData }: { eventData: EventType }) => {
  const [selectedTicketsCount, setSelectedTicketsCount] = useState<number>(1);
  const [maxCount, setMaxCount] = useState<number>(1);
  const [selectedTicketType, setSelectedTicketType] = useState<string>("");

  const ticketTypes = eventData.ticketTypes;
  return (
    <div>
      <div className=''>
        <h1 className='text-sm text-[#C40C0C] font-bold'>Select ticket type</h1>
        <div className='flex flex-wrap gap-5 mt-3'>
          {ticketTypes.map((ticketTypes, idx) => {
            const available = ticketTypes.available ?? ticketTypes.limit;
            return (
              <div
                key={idx}
                className={`p-2 border border-gray-200 bg-gray-100 lg:w-96 w-full cursor-pointer
              ${
                selectedTicketType === ticketTypes.name
                  ? "!border-[#222831] border-solid border-2"
                  : ""
              }
             `}
                onClick={() => {
                  setSelectedTicketType(ticketTypes.name);
                  setMaxCount(available);
                }}
              >
                <h1 className='text-sm text-gray-500 uppercase'>
                  {ticketTypes.name}
                </h1>
                <div className='flex justify-between'>
                  <h1 className='text-sm font-bold'>${ticketTypes.price}</h1>
                  {/* <h1 className='text-xs'>{ticketTypes.limit} Left</h1> */}
                  <h1 className='text-xs'>{available} Left</h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TicketsSelection;
