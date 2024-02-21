import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Avatar, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { formatDate } from "../dateUtils";
const apiUrl = process.env.REACT_APP_API_URL;
const { Text, Title } = Typography;
export const MyBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getId = localStorage.getItem("id");
    const getToken = localStorage.getItem("access_token");
    if (getId !== null && getToken !== null) {
      fetchUserBlogs(JSON.parse(getId), JSON.parse(getToken));
    } else {
      navigate("/login");
    }
  }, []);

  const fetchUserBlogs = async (id, token) => {
    try {
      const response = await fetch(`${apiUrl}/blog/getAllBlogByAuthor/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
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
      <div style={{ textAlign: "start", marginBottom: "20px" }}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={handleGoBack}
          style={{ marginRight: "8px" }}
        />
      </div>
      {console.log(blogs, "bgggg")}
      <Row gutter={[16, 16]}>
        {blogs &&
          blogs.map((blog, idx) => (
            <Col key={blog.id} xs={24} sm={12} md={12} lg={4}>
              <Card
                key={idx}
                title={blog.blogHeading}
                style={{
                  marginBottom: "16px",
                  boxShadow:
                    "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                }}
                onClick={() =>
                  navigate(`/blogdetail/${blog?._id}/${blog?.author?._id}`)
                }
              >
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
                    <Text style={{ marginRight: "8px" }}>
                      {blog?.author?.username}
                    </Text>
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
                <Text ellipsis={{ rows: 2, expandable: true }}>
                  {blog.blogBody}
                </Text>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};
