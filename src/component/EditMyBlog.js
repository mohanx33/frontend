import React, { useState, useEffect } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, Card } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState();

  useEffect(() => {
    const getToken = localStorage.getItem("access_token");
    if (getToken !== null) {
      fetchBlog(JSON.parse(getToken));
    } else {
      navigate("/login");
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
      } else {
        console.error("Failed to fetch blog data");
      }
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  const onFinish = async (values) => {
    try {
      const getToken = localStorage.getItem("access_token");

      const response = await fetch(
        `http://localhost:8080/blog/updateBlog/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: JSON.parse(getToken),
          },
          body: JSON.stringify(values),
        }
      );
      if (response.ok) {
        window.alert("Updated Successfully");
        console.log("Blog updated successfully");
        navigate("/");
      } else {
        console.error("Failed to update blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {console.log(blog, "edit")}
      <div style={{ textAlign: "start", marginBottom: "20px" }}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          style={{ marginRight: "8px" }}
        />
      </div>
      <Card style={{ width: "100%", maxWidth: 600, margin: "auto" }}>
        <h2>Edit Blog</h2>
        {blog && (
          <Form
            name="editBlog"
            initialValues={blog}
            onFinish={onFinish}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item
              label="Blog Heading"
              name="blogHeading"
              rules={[
                { required: true, message: "Please input the blog heading!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Blog Content"
              name="blogBody"
              rules={[
                { required: true, message: "Please input the blog content!" },
              ]}
            >
              <Input.TextArea rows={6} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        )}
      </Card>
    </div>
  );
};
