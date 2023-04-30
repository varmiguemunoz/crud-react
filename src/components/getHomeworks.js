import { useState, useEffect } from "react";
import { db } from "../services/firebase-config";
import AddHomeWorks from "./addHomeworks";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const taskCollectionRef = collection(db, "Homeworks");

const GetHomeworks = () => {
  const [getTask, setGetTask] = useState([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  const [modifyFields, setModifyFields] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

    const [newName, setnewName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newPriority, setNewPriority] = useState('');

    const modify = async (id, newName, newDescription, newPriority) => {
        const userDoc = doc(db, "Homeworks", id);
        const newFields = {
          name: newName,
          description: newDescription,
          priority: newPriority,
        };
        await updateDoc(userDoc, newFields);
        window.location.reload();
      };

  const toogleFields = (id) => {
    const userDoc = doc(db, "Homeworks", id);
    setSelectedTask(userDoc);
    setModifyFields(!modifyFields);
  };


  const deleteTask = async (id) => {
    const userDoc = doc(db, "Homeworks", id);
    await deleteDoc(userDoc);
    window.location.reload();
  };

  const createTask = async () => {
    try {
      await addDoc(taskCollectionRef, {
        name: name,
        description: description,
        priority: priority,
      });
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const getHomeworks = async () => {
      try {
        const data = await getDocs(taskCollectionRef);
        setGetTask(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (err) {
        setError(err.message);
      }
    };

    getHomeworks();
  }, []);

  return (
    <div className="border rounded-lg shadow-md md:w-4/5 m-auto">
      {error && (
        <div>
          <h1>{error}</h1>
        </div>
      )}
      <AddHomeWorks
        setDescription={setDescription}
        setName={setName}
        setPriority={setPriority}
        error={error}
        createTask={createTask}
      />
      {getTask.map((task) => {
        return (
          <div className="px-4 py-4 border-t">
          <div className="flex">
            <h1 className="text-3xl capitalize font-black mr-2">{task.name}</h1>
            {task.priority === "high" ? <div className="w-9 h-9 rounded-full bg-yellow-500 border flex justify-center items-center">
             {task.priority === "high" ? <h1 className="text-center">H</h1> : <h1>L</h1>}
            </div>
            : <div className="w-9 h-9 rounded-full bg-blue-300 border flex justify-center items-center"> 
            {task.priority === "high" ? <h1 className="text-center">H</h1> : <h1>L</h1>}
            </div>
            }
             </div>
            <div className="border-t">
              <p className="mt-3 mb-3 text-lg font-medium text-gray-600 md:text-xl">{task.description}</p>
            </div>
            <button
              onClick={() => {
                deleteTask(task.id);
              }}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white  focus:ring-4 focus:outline-none focus:ring-pink-200"
            >
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
              Delete
            </span>
            </button>
            <button
              onClick={() => {
                toogleFields(task.id);
              }}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200"
            >
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
              Modify
            </span>
            </button>
            {modifyFields && selectedTask && selectedTask.id === task.id && (
          <div className="border rounded-md shadow mt-4 flex items-center px-4 h-20">
            <input placeholder="new Name" onChange={(e) => setnewName(e.target.value)} className="border rounded-md shadow h-10 px-2 py-2 mr-2"/>
            <input placeholder="new description" onChange={(e) => setNewDescription(e.target.value)} className="border rounded-md shadow h-10 px-2 py-2 mr-2"/>
            <select placeholder="new priority" onChange={(e) => setNewPriority(e.target.value)} className="border rounded-md shadow h-10 px-2 py-2 mr-2" > 
            <option value="">Choose Priority...</option>
            <option value="Low">Low</option>
            <option value="high">High</option>
            </select>
            <button onClick={() => modify(task.id, newName, newDescription, newPriority)} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save</button>
          </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GetHomeworks;
