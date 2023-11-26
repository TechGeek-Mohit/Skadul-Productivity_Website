//import React, React DOM, and other libraries
import { useState, useEffect } from "react";
//imports for UI components & styling
import { Button, Modal, useDisclosure } from "@chakra-ui/react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../../components/Column/Column";
import AddEditModal from "../../components/AddEditModal/AddEditModal";
import styles from "./MainPage.module.css";
//imports for firebase
import "firebase/firestore";
import { db } from "../../firebaseDB";

const MainPage = () => {

  /**
   * @Data is a state variable which is an object with three 
   * properties "Not Started", "In Progress", and "Completed"
   * Each property is an array that can hold any data type
   * @setData is a call back function that is used to update
   * the state variable
   */
  const [data, setData] = useState({
    //These are some sample assigned tasks
    "Not Started": [{
      id: "1",
      name: "Test 1",
      description: "School",
      date: new Date(),
      priority: "LOW",
    },
    {
      id: "2",
      name: "Test 2",
      description: "Home",
      date: new Date(),
      priority: "HIGH",
    },
   ],
    "In Progress": [
      {
        id: "3",
        name: "Test 3",
        description: "Park",
        date: new Date(),
        priority: "MEDIUM",
      },
    ],
    "Completed": [],
  });

useEffect(() => {
  // Update the data in Firestore whenever the state changes
  db.collection("tasks").doc("task-list").set({ data })
    .then(() => console.log("Data saved to Firestore!"))
    .catch((error) => console.error("Error writing document: ", error));
}, [data]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalMode, setModalMode] = useState(null); 
  const [editing, setEditing] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);


  /**
   * Store the task dragged into completedTask column into
   * completedTasks collection
   */
  useEffect(() => {
    const unsubscribe = db.collection("completedTasks")
      .onSnapshot((snapshot) => {
        const newCompletedTasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setCompletedTasks(newCompletedTasks);
        setAllTasks([...data["Not Started"], ...data["In Progress"], ...newCompletedTasks]);
      });
    return unsubscribe;
  }, [data]);

  /**
   * This function can be used in a drag-and-drop user interface to move 
   * to-do tasks between different categories or lists, and also to mark 
   * tasks as completed.
   * @param {*} todoMap  an object containing lists of to-do tasks
   * @param {*} source an object representing the source draggable item
   * @param {*} destination an object representing the destination droppable
   */
  const reorderToDos = ({ todoMap, source, destination }) => {
    const current = [...todoMap[source.droppableId]];
    const next = [...todoMap[destination.droppableId]];
    const target = current[source.index];

    /**
   * Reorders the tasks in the list
   * @param {*} list an array representing the list to be reordered.
   * @param {*} startIndex an integer representing the index of the item to be moved.
   * @param {*} endIndex  an integer representing the index of the destination position for the item being moved.
   */
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  
    // moving to same list
    if (source.droppableId === destination.droppableId) {
      const reordered = reorder(current, source.index, destination.index);
      const result = {
        ...todoMap,
        [source.droppableId]: reordered,
      };
      return result;
    }
  
    // moving to different list
    // remove from original
    current.splice(source.index, 1);
  
    // check if moving to the Completed column
    if (destination.droppableId === "Completed") {
      const completedItem = {
        ...target,
        dateCompleted: new Date().toDateString(),
      };

      const completedTasksRef = db.collection("completedTasks");      
      setCompletedTasks((prev) => [...prev, completedItem]);
      setAllTasks((prev) => [...prev, completedItem]); // add completed task to allTasks
      
      completedTasksRef.doc(target.id).set(completedItem)
      .then(() =>
          console.log("Completed task successfully added to Firestore!")
        )
        .catch((error) =>
          console.error("Error adding completed task to Firestore: ", error)
        );
    } 

    /**
     * f the source and destination droppables are different, 
     * the function removes the draggable item from the origina 
     * list by using the splice() method, then checks if the 
     * destination droppable is the "Completed" column. If
     */

    next.splice(destination.index, 0, target);  
    const result = {
      ...todoMap,
      [source.droppableId]: current,
      [destination.droppableId]: next,
    };
  
    return result;
  };
  

  // This function is called when an item is dragged and dropped.
  const onDragEnd = ({ source, destination }) => {
  // Check if the item was dropped outside any valid destination.
    if (!destination) {
      return;
    }
  // Check if the item was not moved to a different position.
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
  // Call the reorderToDos function with the necessary parameters.
    const result = reorderToDos({
      todoMap: data,
      source,
      destination,
    });
  // Update the data with the result of the reorderToDos function.
    setData(result);
  };

    // This function is used to create a new todo item.
  const createToDo = (newData) => {
   
    // Update the data by adding the new todo item to the 'Not Started' category.
    setData((prevData) => ({
      ...prevData,
      'Not Started': [...prevData['Not Started'], newData],
    }));
    // Store the new todo item in the 'activeTasks' collection in Firestore.
    // The item is identified by its unique ID.
    db.collection('activeTasks')
      .doc(newData.id)
      .set(newData)
      .then(() => console.log('Task successfully added to Firestore!'))
      .catch((error) => console.error('Error adding task to Firestore:', error));
  };
  
const getData = (id) => {
  if (id === null) {
    return;
  }

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      const items = data[key];
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
          return items[i];
        }
      }
    }
  }

  return null;
};

  const deleteToDo = (id) => {
    if (id === null) {
      return;
    }

    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        const newToDos = [...data[key]];
        for (let i = 0; i < newToDos.length; i++) {
          if (newToDos[i].id === id) {
            newToDos.splice(i, 1);
            setData({ ...data, [key]: newToDos });
            db.collection("activeTasks").doc(id).delete();
            return;
          }
        }
      }
    }
  };

  const editToDo = (newData) => {
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        const items = data[key];
        for (let i = 0; i < items.length; i++) {
          if (items[i].id === newData.id) {
            items[i] = newData;
            return;
          }
        }
      }
    }
  };

  const saveToDo = (newData, isNew) => {
    if (isNew) {
      createToDo(newData);
    } else {
      editToDo(newData);
    }
  };

  const onClickToDo = (id) => {
    setModalMode("EDIT");
    setEditing(id);
    onOpen();
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.columnContainer}>
        {Object.keys(data).map((key) => (
          <Column
            key={key}
            id={key}
            name={key}
            todos={data[key]}
            onClickToDo={onClickToDo}
          />
        ))}
      </div>

      <div className={styles.addButton}>
        <Button
          colorScheme="yellow"
          onClick={() => {
            setModalMode("ADD");
            onOpen();
          }}
        >
          Add Task
        </Button>
      </div>

      <AddEditModal
        isOpen={isOpen}
        onClose={onClose}
        mode={modalMode}
        saveToDo={saveToDo}
        deleteToDo={deleteToDo}
        initialData={getData(editing)}
      />
    </DragDropContext>
  );
};

export default MainPage;
