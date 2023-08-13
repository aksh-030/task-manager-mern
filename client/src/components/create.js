import React, { useState } from "react";
import { useNavigate } from "react-router";
import './form.css';
 
export default function Create() {
 const [form, setForm] = useState({
   Title: "",
   Progress: "",
   DueDate: "",
   Course: "",
 });
 const navigate = useNavigate();
 
 // update state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // submission.
 async function onSubmit(e) {
   e.preventDefault();
   // When a post request is sent, add a new task
   const newTask = { ...form };
   console.log(JSON.stringify(newTask));
 
   await fetch("http://localhost:5050/task", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newTask),
   })
   .catch(error => {
     window.alert(error, ' on submission');
     return;
   });
 
   setForm({ Title: "", Progress: "", DueDate: "", Course:"" });
   navigate("/");
 }
 
 // form for input
 return (
   <div className="container">  
      <form onSubmit={onSubmit} className="createForm">
        <table className="create-form-table">
          <tbody>
            <tr>
              <h2 align="center">Create New Task</h2>
            </tr>
            <br />
            <tr>
              <input
                type="text"
                placeholder="Title"
                className="form-control"
                id="name"
                value={form.Title}
                onChange={(e) => updateForm({ Title: e.target.value })}
                required
                />
            </tr>
            <br />

            <tr>
              <select 
                id="progress" 
                name="progress"
                value={form.Progress}
                onChange={(e) => updateForm({ Progress: e.target.value })}
              > 
                <option value="" disabled selected>Select Progress</option>
                <option value="notstarted" >Not Started</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </tr>
            <br />

            <tr>
              <h6>Due on</h6>
              <input
                className="form-check-input"
                type="date"
                name="form-control"
                id="duedate"
                value={form.DueDate}
                onChange={(e) => updateForm({ DueDate: e.target.value })}
              /> 
            </tr>
            <br />

            <tr>
              <select 
                id="course" 
                name="form-control"
                value={form.Course}
                onChange={(e) => updateForm({ Course: e.target.value })}
              >
                <option value="" disabled selected>Select Course</option>
                <option value="Cryptography and Network Security">Cryptography and Network Security</option>
                <option value="Principles of Management">Principles of Management</option>
                <option value="Supply Chain Management">Supply Chain Management</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Software Project Management">Software Project Management</option>
              </select>
            </tr>
            <br />
        
            <tr>
              <input
                type="submit"
                value="Create task"
                className="btn btn-primary"
              />
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}