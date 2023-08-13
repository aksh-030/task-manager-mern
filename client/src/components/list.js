import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './home.css';

const Task = (props) => (
    <tr className="task-rows">
      <td>{props.task.Title}</td>
      <td>{props.task.Progress}</td>
      <td>{props.task.DueDate}</td>
      <td>{props.task.Course}</td>
      <td>
        <Link className="btn-link"
         to={`/edit/${props.task._id}`}
        >
          Edit
        </Link> ||
        <button className="btn-link"
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
      <div className="container-tb">
        <h3></h3>
        <table className="task-table" rules="rows">
          <thead>
            <tr>
              <th className="tt">Title</th>
              <th className="pg">Progress</th>
              <th className="dd">Due Date</th>
              <th className="cs">Course</th>
              <th className="ac">Action</th>
              {/*<th>status</th>*/}
            </tr>
          </thead>
          <tbody>{taskList()}</tbody>
        </table>
      </div>
    );

}