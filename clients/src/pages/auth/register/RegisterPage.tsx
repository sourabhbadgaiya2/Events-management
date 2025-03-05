import { Link, useNavigate } from "react-router-dom";

import { Button, Form, Input, App } from "antd";

import { useState } from "react";
import { registerUser } from "../../../api-services/user-service";

interface AuthModalProps {
  setIsLoginOpen: () => void;
}
const RegisterPage: React.FC<AuthModalProps> = ({ setIsLoginOpen }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { message } = App.useApp();

  const onFinish = async (values: never) => {
    try {
      setLoading(true);
      const response = await registerUser(values);
      message.success(response.message);
      navigate("/login");
    } catch (error: any) {
      message.error(error.response?.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center'>
      <Form
        className='flex flex-col gap-5 w-96'
        layout='vertical'
        onFinish={onFinish}
      >
        <h1 className='text-2xl font-bold text-gray-600'>
          Register your account
        </h1>

        <Form.Item
          name='name'
          required
          label='Name'
          rules={[{ required: true }]}
        >
          <Input placeholder='Name' />
        </Form.Item>

        <Form.Item
          name='email'
          required
          label='Email'
          rules={[{ required: true }]}
        >
          <Input placeholder='Email' />
        </Form.Item>

        <Form.Item
          name='password'
          required
          label='Password'
          rules={[{ required: true }]}
        >
          <Input.Password placeholder='Password' />
        </Form.Item>

        <Button type='primary' htmlType='submit' block loading={loading}>
          Register
        </Button>
        <Button onClick={setIsLoginOpen} type='default'>
          Already have an account? Login
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
