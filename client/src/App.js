import React from 'react';
import { Route, Routes } from "react-router-dom";
//import './App.css';
import Navbar from "./components/navbar";
import TaskList from './components/list';
import Edit from "./components/edit";
import Create from "./components/create";
//import CNSList from "./components/cns";

const App = () => {
  return (
    <div>
      <Navbar /> 
      <Routes>
      <Route exact path="/" element={<TaskList />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
