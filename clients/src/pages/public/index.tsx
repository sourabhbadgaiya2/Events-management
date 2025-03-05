import { useState } from "react";
import { Button, Modal } from "antd";
import RegisterPage from "../auth/register/RegisterPage";
import LoginPage from "../auth/login/LoginPage";

const PublicPage = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className='relative w-full h-screen flex flex-col items-center'>
      {/* Background Blur Overlay (Only visible when modal is open) */}
      {(isSignUpOpen || isLoginOpen) && (
        <div className='fixed inset-0  backdrop-blur-md z-10'></div>
      )}

      {/* Header */}
      <header className='w-full fixed flex bg-white justify-between items-center p-4 shadow-lg shadow-gray-100 z-20'>
        <h1 className='logo text-2xl font-bold text-red-500 uppercase'>
          Sours <span className='text-[#111314] logo'>Events</span>
        </h1>
        <div className='flex gap-3'>
          <Button onClick={() => setIsLoginOpen(true)} type='default'>
            Log in
          </Button>
          <Button onClick={() => setIsSignUpOpen(true)} type='primary'>
            Sign up
          </Button>
        </div>
      </header>

      {/* Signup Modal */}
      <Modal
        title='Sign Up'
        open={isSignUpOpen}
        onCancel={() => setIsSignUpOpen(false)}
        footer={null}
        centered
        className='z-30'
      >
        <RegisterPage
          isLoginOpen={isLoginOpen}
          setIsLoginOpen={() => {
            setIsLoginOpen(true);
            setIsSignUpOpen(false);
          }}
        />
      </Modal>

      {/* Login Modal */}
      <Modal
        title='Log In'
        open={isLoginOpen}
        onCancel={() => setIsLoginOpen(false)}
        footer={null}
        centered
        className='z-30'
      >
        <LoginPage
          isSignUpOpen={isSignUpOpen}
          setIsSignUpOpen={() => {
            setIsSignUpOpen(true);
            setIsLoginOpen(false);
          }}
        />
      </Modal>

      <div className='flex flex-col lg:flex-row w-full lg:py-20 lg:overflow-hidden relative'>
        <div className='absolute top-15 -right-4 -z-10'>
          <img className='h-screen' src='download.svg' alt='a' />
        </div>
        {/* Hero Section */}
        <section className='w-full py-28 lg:w-1/2 p-6 lg:py-12'>
          <h2 className='text-2xl lg:text-5xl font-bold lg:leading-relaxed'>
            Find your <span className='text-red-500'>people</span>, discover
            <span className='text-red-500'> interests</span>, and join inspiring
            <span className='text-red-500'> events</span>
          </h2>
          <p className='mt-4 text-gray-600'>
            Join thousands of <span className='text-red-500'>free</span> events
            today!
          </p>
          <div className='mt-6 flex flex-col gap-3 max-w-md mx-auto lg:mx-0'>
            <Button className='bg-blue-500 text-white' block>
              Sign up with Google
            </Button>
            <Button className='border-gray-300' block>
              Sign up with Facebook
            </Button>
            <p
              onClick={() => setIsSignUpOpen(true)}
              className='text-blue-500 cursor-pointer'
            >
              Continue with email →
            </p>
          </div>
        </section>

        {/* Images Section - Now Vertical */}
        <section className='w-full lg:w-1/2 flex flex-col items-center gap-4 lg:-mt-16'>
          <img
            src='https://images.unsplash.com/photo-1726607424562-62cf93236dd8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='Event 1'
            className='rounded-lg w-[60%] max-w-md'
          />
          <img
            src='https://images.unsplash.com/photo-1726607424562-62cf93236dd8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='Event 2'
            className='rounded-lg w-[60%] max-w-md'
          />
          <img
            src='https://images.unsplash.com/photo-1726607424562-62cf93236dd8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='Event 3'
            className='rounded-lg w-[60%] max-w-md'
          />
        </section>
      </div>
    </div>
  );
};

export default PublicPage;
