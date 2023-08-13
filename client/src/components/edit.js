import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import './form.css';

export default function Edit() {

    const [form, setForm] = useState({
      Title: "",
      Progress: "",
      DueDate: "",
      Course: "",
      tasks: [],
    });
    const params = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
      async function fetchData() {
        const id = params.id.toString();
        const response = await fetch(`http://localhost:5050/task/${params.id.toString()}`);
    
        if (!response.ok) {
          const message = `An error has occurred: ${response.statusText} :((`;
          window.alert(message);
          return;
        }
    
        const record = await response.json();
        if (!record) {
          window.alert(`Record with id ${id} not found!`);
          navigate("/");
          return;
        }
    
        setForm(record);
      }
    
      fetchData();
    
      return;
    }, [params.id, navigate]);
    
    // update the state properties.
    function updateForm(value) {
      return setForm((prev) => {
        return { ...prev, ...value };
      });
    }
    
    async function onSubmit(e) {
      e.preventDefault();
      const editedTask = {
        Title: form.Title,
        Progress: form.Progress,
        DueDate: form.DueDate,
        Course: form.Course,
      };
    
      // post request to update the data in the database.
      await fetch(`http://localhost:5050/task/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify(editedTask),
        headers: {
          'Content-Type': 'application/json'
        },
      });
    
      navigate("/");
    }
    
    // form for update
    return (
      <div className="container">
        <form onSubmit={onSubmit} className="editForm">
          <table className="edit-form-table">
            <tbody>
              <th colspan="2">
                <h2 align = "center">Update Task</h2>
              </th>
              <br />
              <tr>
                <td>
                  <h6>Title: </h6>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={form.Title}
                    onChange={(e) => updateForm({ Title: e.target.value })}
                  />
                </td>
              </tr>
              <br />

              <tr>
                <td>
                  <h6>Progress: </h6>
                </td>
                <td>
                  <select 
                    id="progress" 
                    name="progress"
                    value={form.Progress}
                    onChange={(e) => updateForm({ Progress: e.target.value })}
                  >
                    <option value="notstarted">Not Started</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
              </tr>
              <br />

              <tr>
                <td>
                  <h6>Due On:</h6>
                </td>
                <td>
                  <input
                    className="form-check-input"
                    type="date"
                    name="form-control"
                    id="duedate"
                    value={form.DueDate}
                    onChange={(e) => updateForm({ DueDate: e.target.value })}
                  /> 
                 </td>
              </tr>
              <br />

              <tr>
                <td>
                  <h6>Course: </h6>
                </td>
                <td>
                  <select 
                    id="course" 
                    name="course"
                    value={form.Course}
                    onClick={(e) => updateForm({ Course: e.target.value })}
                  >
                    <option value="Cryptography and Network Security" selected="selected">Cryptography and Network Security</option>
                    <option value="Principles of Management">Principles of Management</option>
                    <option value="Supply Chain Management">Supply Chain Management</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="Software Project Management">Software Project Management</option>
                  </select>
                </td>
              </tr>
              <br />
    
              <tr colspan="2">
                <td></td>
                <td>
                <input
                  type="submit"
                  value="Update"
                  className="btn btn-primary"
                />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
   }