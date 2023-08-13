import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Task = (props) => (
    <tr>
      <td>{props.task.Title}</td>
      <td>{props.task.Progress}</td>
      <td>{props.task.DueDate}</td>
      <td>{props.task.Course}</td>
      <td>
        <Link className="btn btn-link"
         to={`/edit/${props.task._id}`}
        >
          Edit
        </Link> ||
        <button className="btn btn-link"
          onClick={() => {
            props.deleteTask(props.task._id);
          }}
        >
          Delete
        </button>
      </td>
      {/*<td>
        <input
          type="checkbox"
          //onClick={checkClick}
        />
      </td>*/
      }
    </tr>
);



export default function TaskList(){
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function getTasks() {
          const response = await fetch('http://localhost:5050/task/');
      
          if (!response.ok) {
            const message = `An error occurred: ${response.statusText} :(( list`;
            window.alert(message);
            return;
          }
      
          const tasks = await response.json();
          if(tasks.Course=="CNS")
            setTasks(tasks);
        }
        getTasks();
        return;
    }, [tasks.length]);


    async function deleteTask(id) {
        await fetch(`http://localhost:5050/task/${id}`, {
          method: "DELETE"
        }
        );
        const newTasks = tasks.filter((el) => el._id !== id);
        setTasks(newTasks);
    }


    function taskList() {
        return tasks.map((task) => {
            return (
                <Task
                task={task}
                deleteTask={() => deleteTask(task._id)}
                key={task._id}
                />
            );
        });
    }

    return (
        <div>
          <h3>CNS Tasks</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Progress</th>
                <th>Due Date</th>
                <th>Course</th>
                <th>Action</th>
                {/*<th>status</th>*/}
              </tr>
            </thead>
            <tbody>{taskList()}</tbody>
          </table>
        </div>
    );

}