


import React, { useState, useEffect } from "react";

import "./todoapp.css";

import firebase from "../firebase";



function TodoApp() {

  const [task, setTask] = useState("");

  const [tasklist, setTaskList] = useState([]);

  const [idOfUpdate, setIdOfUpdate] = useState(null);

  const [truth, setTruth] = useState();



  const handleChange = (e) => {

    setTask(e.target.value);

  };



 useEffect(() => {

  populate();

  }, []);



  useEffect(() => {

    let id = idOfUpdate;

    if (id !== null) {

      markCompleteGlobal();

    }

  }, [truth]);



 ///////////////////////////////////////



  const AddTask = () => {

    const datas = {

      id: firebase

        .firestore()

        .collection("tasks")

        .doc().id,

    };





    const db = firebase.firestore();

    db.collection("tasks")

      .doc(datas.id)

      .set({ task: task, completed: false, id: datas.id,value: task })

      .then(() => {

        populate();

      })

  };



  const populate = (data) => {

    setTaskList([]);

    return firebase

      .firestore()

      .collection("tasks")

      .get()

      .then(function(querySnapshot) {

        querySnapshot.forEach(function(doc) {

          let newData = doc.data();



          if (tasklist.indexOf(newData.id) === -1) {

            setTaskList((arr) => {

              return [...arr, newData];

            });

          } 

        });

      })

  };



///////////////////////////////////////////////////////////

  

   const taskCompleted = (e,id) => {

    e.preventDefault();



    debugger

  setIdOfUpdate(id);

    setTaskList(

      tasklist.map((task) => {

        if (task.id === id) {

          task.completed = !task.completed;

  

          setTimeout(function() {

            setTruth(task.completed);

          }, 1000);

        }

        return task;

      }))

    

  };



 



  const markCompleteGlobal = () => {

  let id = idOfUpdate;

  const itemtoupdate = firebase

    .firestore()

    .collection("tasks")

    .doc(id)



  itemtoupdate.update({

  completed: truth,

  })



  setIdOfUpdate(null);

  setTruth(null);

};



///////////////////////////////////////////////////////////



const deletetask = (e,id) => {

  e.preventDefault();

  const db = firebase.firestore();

  db.collection("tasks")

    .doc(id)

    .delete()

    .then(() => {

      console.log("Document successfully deleted!", id);

    })

    .catch((error) => {

      console.error(id, "Error removing document: ", error);

    })

    .then((res) => setTaskList([...tasklist.filter((task) => task.id !== id)]));

  console.log(id, "here is an id", id);

};



///////////////////////////////////////////////////////////



  return (

    <div className="todo">

      <input

        type="text"

        name="text"

        id="text"

        onChange={(e) => handleChange(e)}

        placeholder="Add task here..."

      />

      <button className="add-btn" onClick={AddTask}>

        Add

      </button>

      <br />

      {tasklist !== [] ? (

        <ul>

          {tasklist.map((task) => (

            <li className={task.completed ? "crossText" : "listitem"}>

              {task.value}

              <button

                className="completed"

                onClick={(e) => taskCompleted(e, task.id)}

              >

                Completed

              </button>



              <button className="delete" onClick={(e) => deletetask(e, task.id)}>

                Delete

              </button>

            </li>

          ))}

        </ul>

      ) : null}

    </div>

  );

}



export default TodoApp;


