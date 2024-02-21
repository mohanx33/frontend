import React, { useEffect, useState } from "react";
import { Row, Col, Card, Avatar, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { formatDate } from "../dateUtils";

const { Title, Text } = Typography;

export const AllBlogs = () => {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState([]);
  var getToken = localStorage.getItem("access_token");
  useEffect(() => {}, []);
  useEffect(() => {
    (async () => {
      try {
        const saveData = await fetch(`http://localhost:8080/blog/getAllBlog`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!saveData.ok) {
          throw new Error("Failed");
        }

        const res = await saveData.json();

        setBlogData(res);
        console.log(res, "register response");
      } catch (error) {
        console.error("Error ", error);
      }
    })();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {console.log(getToken, "dbdbdb")}
      <Row gutter={16}>
        <Col xs={24} sm={10} md={6} lg={4}>
          <Card
            size="small"
            style={{
              boxShadow:
                "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
              backgroundColor: "#fff",
              cursor: "pointer",
            }}
          >
            <ul
              style={{
                listStyle: "none",
                display: "block",
                justifyContent: "flex-start",
              }}
            >
              {getToken ? (
                <></>
              ) : (
                <li>
                  <a href="/login">Login</a>
                </li>
              )}

              <li style={{ textDecoration: "none" }}>
                <a href="/myblogs" style={{ fontFamily: "sans-serif" }}>
                  My Blogs
                </a>
              </li>
              <li>
                <a href="/myprofile">My Profile</a>
              </li>
              <li>
                <a href="/addblog">Add Blog</a>
              </li>
              <li
                onClick={() => {
                  localStorage.removeItem("access_token");
                  localStorage.removeItem("id");
                }}
              >
                <a href="/">Logout</a>
              </li>
            </ul>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={16} lg={16}>
          <Row gutter={[16, 16]}>
            {blogData &&
              blogData.map((item, idx) => {
                return (
                  <Col span={6}>
                    <Card
                      key={idx}
                      title={item?.blogHeading}
                      size="small"
                      style={{
                        boxShadow:
                          "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
                        backgroundColor: "#fff",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        navigate(
                          `/blogdetail/${item?._id}/${item?.author?._id}`
                        )
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
                          src={item?.author?.profilePictureUrl}
                          style={{ marginRight: "8px" }}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <Text style={{ marginRight: "8px" }}>
                            {item.author.username}
                          </Text>
                          <Text
                            style={{
                              marginRight: "8px",
                              fontSize: "8px",
                              color: "gray",
                              fontStyle: "italic",
                            }}
                          >
                            {formatDate(item?.postedDate)}
                          </Text>
                        </div>
                      </div>
                      <Text ellipsis={{ rows: 2, expandable: true }}>
                        {item?.blogBody}
                      </Text>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </Col>
      </Row>
    </div>
  );
};
