import React, { useState, useEffect } from "react";
import { Card, Avatar, Typography, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const apiUrl = process.env.REACT_APP_API_URL;
export const MyProfile = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getId = localStorage.getItem("id");
    const getToken = localStorage.getItem("access_token");
    if (getId !== null && getToken !== null) {
      fetchUser(JSON.parse(getId), JSON.parse(getToken));
    } else {
      navigate("/login");
    }
  }, []);

  const fetchUser = async (id, token) => {
    try {
      const response = await fetch(`${apiUrl}/user/getUserById/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error("Failed to fetch user blogs");
      }
    } catch (error) {
      console.error("Error fetching user blogs:", error);
    }
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div style={{ padding: "20px" }}>
      {console.log(userData, "udd")}
      <div style={{ textAlign: "start", marginBottom: "20px" }}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={handleGoBack}
          style={{ marginRight: "8px" }}
        />
      </div>
      <Card style={{ width: "100%", maxWidth: 400, margin: "auto" }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Avatar size={100} src={userData.profilepictureUrl} />
        </div>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Title level={3}>{userData.username}</Title>
          <Text>{userData.email}</Text>
        </div>
      </Card>
    </div>
  );
};
