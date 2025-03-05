import { useState } from "react";
import General from "./general";
import LocationAndDate from "./locationAndDate";
import Media from "./media";
import Tickets from "./tickets";
import { Form, App, Steps } from "antd";
import { uploadToCloudinary } from "../../../../../../config/cludniaryConfig";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEvent,
  updateEvent,
} from "../../../../../../api-services/event-service";

export interface EventFormStepProps {
  eventData: any;
  setEventData: any;
  setCurrentStep: any;
  currentStep: number;
  selectedMediaFiles: any;
  setSelectedMediaFiles: any;
  loading?: boolean;
  onFinish?: any;
}

const EventForm = ({
  initialData = {},
  type = "create",
}: {
  initialData?: any;
  type?: "create" | "edit";
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [eventData, setEventData] = useState<any>(initialData);
  const [selectedMediaFiles, setSelectedMediaFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { message } = App.useApp();
  const params: any = useParams();

  // const onFinish = async () => {
  //   try {
  //     setLoading(true);
  //     const [...urls] = await Promise.all(
  //       selectedMediaFiles.map(async (file: any) => {
  //         return await uploadToCloudinary(file);
  //       })
  //     );
  //     eventData.media = [...(eventData?.media || []), ...urls];
  //     if (type === "edit") {
  //       await updateEvent(params.id, eventData);
  //       message.success("Event updated successfully");
  //     } else {
  //       await createEvent(eventData);
  //       message.success("Event created successfully");
  //     }
  //     navigate("/admin/events");
  //   } catch (error: any) {
  //     message.error(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const onFinish = async () => {
    try {
      setLoading(true);
      const uploadedUrls = [];
      for (const file of selectedMediaFiles) {
        const url = await uploadToCloudinary(file);
        if (url) {
          uploadedUrls.push(url);
        } else {
          message.error("Failed to upload: Event form");
        }
      }
      eventData.media = [...(eventData?.media || []), ...uploadedUrls];
      if (type === "edit") {
        const response = await updateEvent(params.id, eventData);
        message.success(response.message || "Event updated successfully");
      } else {
        const response = await createEvent(eventData);
        message.success(response.message || "Event created successfully");
      }
      navigate("/admin/events");
    } catch (error: any) {
      message.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const commonProps = {
    eventData,
    setEventData,
    setCurrentStep,
    currentStep,
    selectedMediaFiles,
    setSelectedMediaFiles,
    loading,
    setLoading,
    onFinish,
  };

  const stepsData = [
    {
      name: "General",
      component: <General {...commonProps} />,
    },
    {
      name: "Location And Date",
      component: <LocationAndDate {...commonProps} />,
    },
    {
      name: "Media",
      component: <Media {...commonProps} />,
    },
    {
      name: "Tickets",
      component: <Tickets {...commonProps} />,
    },
  ];

  return (
    <Form layout='vertical'>
      <Steps current={currentStep} onChange={(step) => setCurrentStep(step)}>
        {stepsData.map((step, idx) => (
          <Steps.Step
            key={idx}
            title={step.name}
            disabled={idx > currentStep}
          />
        ))}
      </Steps>
      <div className='mt-5'>{stepsData[currentStep].component}</div>
    </Form>
  );
};

export default EventForm;
