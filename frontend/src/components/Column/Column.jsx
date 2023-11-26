import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Text } from "@chakra-ui/react";

import ToDoItem from "../ToDoItem/ToDoItem";
import styles from "./Column.module.css";

const Column = ({ id, name, todos, onClickToDo }) => {
  return (
    <div className={styles.column}>
      <div className={styles.headerContainer}>
        <Text as="b" fontSize="16px">
          {name}
        </Text>
      </div>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            className={styles.droppable}
            ref={provided.innerRef}
            style={{
              backgroundColor: snapshot.isDraggingOver
                ? "lightskyblue"
                : "white",
            }}
            {...provided.droppableProps}
          >
            {todos.map((todo, index) => (
              <ToDoItem
                key={todo.id}
                id={todo.id}
                index={index}
                name={todo.name}
                date={todo.date}
                priority={todo.priority}
                onClickToDo={onClickToDo}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
