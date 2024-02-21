import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Avatar, Typography, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { formatDate } from "../dateUtils";
const { Title, Text } = Typography;

export const BlogDetail = () => {
  const { id, auth } = useParams();
  const [blog, setBlog] = useState({});
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const getId = localStorage.getItem("id");
    setUserId(JSON.parse(getId));
    const getToken = localStorage.getItem("access_token");
    if (getToken !== null) {
      fetchBlog(JSON.parse(getToken));
    } else {
      navigate("/login");
    }
  }, [id]);
  useEffect(() => {
    const getId = localStorage.getItem("id");
    setUserId(JSON.parse(getId));
    const getToken = localStorage.getItem("access_token");
    if (getToken !== null) {
      fetchBlog(JSON.parse(getToken));
    }
  }, [id]);

  const fetchBlog = async (token) => {
    try {
      const response = await fetch(
        `http://localhost:8080/blog/getBlogById/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setBlog(data);
        console.error("Failed to fetch blog data");
      }
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ textAlign: "start", marginBottom: "20px" }}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={handleGoBack}
          style={{ marginRight: "8px" }}
        />
      </div>
      <Card style={{ width: "100%", maxWidth: 600 }} title={blog?.blogHeading}>
        <Title level={2} style={{ marginBottom: "10px" }}>
          {blog.title}
        </Title>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Avatar
            size={24}
            src={blog?.author?.profilePictureUrl}
            style={{ marginRight: "8px" }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Text style={{ marginRight: "8px" }}>{blog?.author?.username}</Text>
            <Text
              style={{
                marginRight: "8px",
                fontSize: "8px",
                color: "gray",
                fontStyle: "italic",
              }}
            >
              {formatDate(blog?.postedDate)}
            </Text>
          </div>
        </div>
        <Text>{blog.blogBody}</Text>
        {console.log(userId, auth)}
      </Card>
      {userId.toString() === auth.toString() ? (
        <Button
          style={{
            width: "150px",
            backgroundColor: "green",
            color: "white",
            marginTop: "10px",
          }}
          onClick={() => navigate(`/editblog/${id}`)}
        >
          Edit Blog
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};
