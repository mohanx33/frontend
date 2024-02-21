// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./component/Login";
import { Register } from "./component/Register";
import { MyBlogs } from "./component/MyBlogs";
import { AllBlogs } from "./component/AllBlogs";
import { MyProfile } from "./component/MyProfile";
import { EditBlog } from "./component/EditMyBlog";
import { BlogDetail } from "./component/Blogdetails";
import { AddBlog } from "./component/AddBlog";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addblog" element={<AddBlog />} />
        <Route path="/myblogs" element={<MyBlogs />} />
        <Route path="/" element={<AllBlogs />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/editblog/:id" element={<EditBlog />} />
        <Route path="/blogdetail/:id/:auth" element={<BlogDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
