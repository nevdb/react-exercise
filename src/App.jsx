// import { useRef, useState, useCallback } from "react";

// import Places from "./components/placepicker/Places.jsx";
// import Modal from "./components/Modal.jsx";
// import DeleteConfirmation from "./components/placepicker/DeleteConfirmation.jsx";
// import logoImg from "./assets/logo.png";
// import AvailablePlaces from "./components/placepicker/AvailablePlaces.jsx";
// import { fetchUserPlaces, updateUserPlaces } from "./http.js";
// import Error from "./components/placepicker/Error.jsx";
// import { useFetch } from "./hooks/useFetch.js";

import { Routes, Route } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import PlacePicker from "./pages/PlacePicker";
import Quiz from "./pages/Quiz";
import Counter from "./pages/Counter";
import Users from "./pages/Users.jsx";

export default function App() {
  return (
    <>
      <NavBar />
      <div id="main" className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="placepicker" element={<PlacePicker />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="counter" element={<Counter />} />
          <Route path="users" element={<Users />} />

          {/* 404 fallback */}
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </div>
    </>
  );
}
