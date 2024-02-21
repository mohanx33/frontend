import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Upload,
  message,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Navigate, useNavigate } from "react-router-dom";

const { Title } = Typography;
const apiUrl = process.env.REACT_APP_API_URL;
export const Register = () => {
  const navigate = useNavigate();
  const [avatorId, setAvatoreId] = useState(null);
  const uploadAvatar = async (avatar) => {
    try {
      const formData = new FormData();
      formData.append("file", avatar); // Append avatar file to FormData
      console.log(formData, "formData");
      const saveData = await fetch(`${apiUrl}/uploadFiles/upload`, {
        method: "POST",
        body: formData,
      });

      if (!saveData.ok) {
        throw new Error("Failed to upload avatar");
      }

      console.log("Avatar uploaded successfully");
      const data = await saveData.json();
      console.log(data, "data");
      setAvatoreId((prev) => (prev = data?._id));
      return data?._id;
    } catch (error) {
      throw new Error("Error uploading avatar");
    }
  };
  const saveUserDetails = async (values, imageId) => {
    try {
      console.log(imageId, "idddd");
      const dataBody = {
        username: values.username,
        email: values.email,
        password: values.password,
        profilePicture: imageId,
      };
      const saveData = await fetch(`${apiUrl}/user/addUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataBody),
      });
      console.log(saveData, "sdd");
      if (saveData.status === 400) {
        const responseData = await saveData.json();
        window.alert(responseData.error);
        return;
      }
      if (saveData.ok) {
        window.alert("User Registered Successfully");

        navigate("/login");
      }

      const res = await saveData.json();
      console.log(res, "register response");
    } catch (error) {
      window.alert(error);
    }
  };

  const onFinish = async (values) => {
    try {
      console.log("Received values:", values);

      const avatarFile = normFile(values.avatar);

      const avatar = Array.isArray(avatarFile) ? avatarFile[0] : avatarFile;
      let avatarId;
      if (avatar) {
        avatarId = await uploadAvatar(avatar.originFileObj);
      }
      await saveUserDetails(values, avatarId);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <div style={{ padding: 20 }}>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12} xl={8}>
          <div style={{ background: "#fff", padding: 24, borderRadius: 8 }}>
            <Title level={2} style={{ textAlign: "center" }}>
              Register
            </Title>
            <Form
              name="register"
              onFinish={onFinish}
              validateMessages={validateMessages}
            >
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
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
              <Form.Item
                name="avatar"
                label="Avatar"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true }]}
              >
                <Upload
                  name="avatar"
                  customRequest={dummyRequest}
                  beforeUpload={beforeUpload}
                  listType="picture"
                >
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};
