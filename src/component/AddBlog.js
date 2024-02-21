import { Card, Form, Input, Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const AddBlog = () => {
  const [blogHeading, setBlogHeading] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const getToken = localStorage.getItem("access_token");
    if (getToken == null) {
      navigate("/");
    }
  }, []);
  const handleBlogHeadingChange = (e) => {
    setBlogHeading(e.target.value);
  };

  const handleBlogContentChange = (e) => {
    setBlogContent(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const getId = localStorage.getItem("id");
      const getToken = localStorage.getItem("access_token");
      const bodyData = {
        author: JSON.parse(getId),
        blogHeading: blogHeading,
        blogBody: blogContent,
      };
      const response = await fetch(`http://localhost:8080/blog/addBlog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(getToken),
        },
        body: JSON.stringify(bodyData),
      });
      if (response.ok) {
        window.alert("Added Successfully");
        console.log("Blog Added successfully");
        navigate("/");
      } else {
        console.error("Failed to Add blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ textAlign: "start", marginBottom: "20px" }}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          style={{ marginRight: "8px" }}
        />
      </div>
      <Card
        title="Add Blog"
        style={{ margin: "auto", width: "100%", maxWidth: "600px" }}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item
            label="Blog Heading"
            name="blogHeading"
            rules={[{ required: true, message: "Please enter blog heading" }]}
          >
            <Input value={blogHeading} onChange={handleBlogHeadingChange} />
          </Form.Item>
          <Form.Item
            label="Blog Content"
            name="blogContent"
            rules={[{ required: true, message: "Please enter blog content" }]}
          >
            <Input.TextArea
              rows={4}
              value={blogContent}
              onChange={handleBlogContentChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
