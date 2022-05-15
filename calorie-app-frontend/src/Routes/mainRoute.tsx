import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../Pages/Login";
import { Home } from "../Pages/Home";
import { NotFound } from "../Pages/NotFound";

export function MainRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/login" element={<AdminLogin />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
