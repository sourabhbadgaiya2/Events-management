import { Route, Routes } from "react-router-dom";
import ProfilePage from "../pages/private/profile/ProfilePage";
import HomePage from "../pages/private/home/HomePage";
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";
import EventsPage from "../pages/private/admin/events/eventsPage";
import CreateEventPage from "../pages/private/admin/events/create";
import EditEventPage from "../pages/private/admin/events/edit";
import PublicPage from "../pages/public";
import EventInfo from "../pages/private/event/eventInfo";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route
          path='/home'
          element={
            <PublicLayout>
              <PublicPage />
            </PublicLayout>
          }
        />
        <Route
          path='/event/:id'
          element={
            <PrivateLayout>
              <EventInfo />
            </PrivateLayout>
          }
        />
        <Route
          path='/'
          element={
            <PrivateLayout>
              <HomePage />
            </PrivateLayout>
          }
        />
        <Route
          path='/profile'
          element={
            <PrivateLayout>
              <ProfilePage />
            </PrivateLayout>
          }
        />
        //! Organizer
        <Route
          path='/admin/events'
          element={
            <PrivateLayout>
              <EventsPage />
            </PrivateLayout>
          }
        />
        <Route
          path='/admin/events/create'
          element={
            <PrivateLayout>
              <CreateEventPage />
            </PrivateLayout>
          }
        />
        <Route
          path='/admin/events/edit/:id'
          element={
            <PrivateLayout>
              <EditEventPage />
            </PrivateLayout>
          }
        />
      </Routes>
    </div>
  );
};

export default AppRoutes;
