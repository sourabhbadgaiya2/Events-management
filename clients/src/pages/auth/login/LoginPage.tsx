import { useState } from "react";
import { Button, Form, Input, App } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../api-services/user-service";

interface AuthModalProps {
  setIsSignUpOpen: () => void; // Function to open signup
}

const LoginPage: React.FC<AuthModalProps> = ({ setIsSignUpOpen }) => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { message } = App.useApp();

  const onFinish = async (values: never) => {
    try {
      setLoading(true);
      const response = await loginUser(values);
      message.success(response.message);
      navigate("/");
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
        <h1 className='text-2xl font-bold text-gray-600'>Login your account</h1>

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
          Login
        </Button>

        <Button onClick={setIsSignUpOpen}>
          Don't have an account? Register
        </Button>

        {/* <Link to='/register'>Don't have an account? Register</Link> */}
      </Form>
    </div>
  );
};

export default LoginPage;
