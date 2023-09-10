import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import AboutUs from 'pages/AboutUs';
import ResetPassword from 'pages/ResetPassword';
import CreateAccount from 'pages/CreateAccount';
import Dashboard from 'pages/Dashboard';
import RegistrationReceipt from 'pages/RegistrationReceipt';
import Events from 'pages/Events';
import Profile from 'pages/Dashboard/Profile';
import Event from 'pages/Event';
import ManageEvent from 'pages/Event/manage';
import Landing from 'pages/Landing';
import NotFoundPage from 'pages/NotFoundPage';
import Login from 'pages/Login';
import FailedPayment from 'pages/Message/FailedPayment';
import SuccessfulPayment from 'pages/Message/SuccessfulPayment';
import RegistrationForm from 'pages/RegistrationForm';
import Status from 'pages/RegistrationStatus';
import TeamSelection from 'pages/TeamSelection';
import Workshop from 'pages/FSM';
import Article from 'pages/Article';
import Articles from 'pages/Articles';
import PrivateRoute from './PrivateRoute';
import FSMManagement from 'pages/FSMManagement';
import Correction from 'pages/Correction';
import EditArticle from 'pages/EditArticle';
import CustomPage from 'pages/CustomPage';
import ReactGA from 'react-ga';

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);

const Root = () => {

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <Routes>
      <Route path="/hi!/" element={<CustomPage />} ></Route>

      <Route path="/loading/"></Route>

      <Route path="/about-us/" element={<AboutUs />} />

      <Route path="/" element={<Landing />} />

      <Route path="/reset-password/" element={<ResetPassword />} />
      <Route path="/create-account/" element={<CreateAccount />} />
      <Route path="/login/" element={<Login />} />
      <Route path="/articles/" element={<Articles />} />
      <Route path="/article/:articleId/" element={<Article />} />

      <Route path="/" element={<PrivateRoute />}>
        <Route path="/edit-article/:articleId/" element={<EditArticle />} />
        <Route
          path="/message/payment/success/:paymentId?"
          element={<SuccessfulPayment />}
        />
        <Route
          path="/message/payment/failure/:paymentId?"
          element={<FailedPayment />}
        />
        <Route path="/registration-receipt/:registrationReceiptId/" element={<RegistrationReceipt />} />
        <Route path="/dashboard/" element={<Dashboard />} />
        <Route path="/profile/:section/" element={<Profile />} />
        <Route path="/events/" element={<Events />} />
        <Route path="/articles/" element={<Articles />} />
        <Route path="/event/:eventId/workshop/:fsmId/" element={<Workshop />} />
        <Route path="/event/:eventId/profile/:section/" element={<Profile />} />
        <Route
          path="/event/:eventId/registration-form/"
          element={<RegistrationForm />}
        />
        <Route path="/event/:eventId/status/" element={<Status />} />
        <Route
          path="/event/:eventId/team-selection/"
          element={<TeamSelection />}
        />
        <Route path="/event/:eventId/" element={<Event />} />

        {/* only mentors can visit: */}
        <Route path="/event/:eventId/manage/:section" element={<ManageEvent />} />
        <Route path="/event/:eventId/workshop/:fsmId/manage/correction/:answerId/" element={<Correction />} />
        <Route path="/event/:eventId/workshop/:fsmId/manage/:section" element={<FSMManagement />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Root;
