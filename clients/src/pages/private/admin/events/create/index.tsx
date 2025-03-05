import PageTitle from "../../../../../components/PageTitle";
import EventForm from "../common/event-form";

const CreateEventPage = () => {
  return (
    <div>
      <PageTitle title={"Create Events"} />
      <div className='mt-5'>
        <EventForm />
      </div>
    </div>
  );
};

export default CreateEventPage;
