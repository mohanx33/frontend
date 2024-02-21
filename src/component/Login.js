import React from "react";
import { Form, Input, Button, Typography, Card } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const apiUrl = process.env.REACT_APP_API_URL;
export const Login = () => {
  const navigate = useNavigate();
  const login = async (values) => {
    try {
      const dataBody = {
        email: values.email,
        password: values.password,
      };
      const saveData = await fetch(`${apiUrl}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataBody),
      });

      if (!saveData.ok) {
        throw new Error("Failed to Login");
      }

      window.alert("Login Successfully");

      navigate("/");
      const res = await saveData.json();
      localStorage.setItem("access_token", JSON.stringify(res.access_token));
      localStorage.setItem("id", JSON.stringify(res.user_id));
      console.log(res, "register response");
    } catch (error) {
      console.error("Error registering user:", error);
      window.alert("User Login Failed");
    }
  };

  const onFinish = async (values) => {
    console.log("Received values:", values);
    await login(values);
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        style={{
          width: 400,
          background: "#f0f2f5",
          padding: 20,
          borderRadius: 8,
        }}
      >
        <Title level={2} style={{ textAlign: "center" }}>
          Login
        </Title>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Log in
            </Button>
          </Form.Item>
          <a href="/register">Click to Register</a>
        </Form>
      </Card>
    </div>
  );
};
