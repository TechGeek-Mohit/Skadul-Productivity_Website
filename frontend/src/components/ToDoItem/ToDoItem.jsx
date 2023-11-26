import React from "react";
import { Card, CardBody, Text, Icon } from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";
import { FaRegTired, FaRegMeh, FaRegSmile } from "react-icons/fa";

import styles from "./ToDoItem.module.css";

const ICONS_MAP = {
  LOW: FaRegSmile,
  MEDIUM: FaRegMeh,
  HIGH: FaRegTired,
};

const COLOR_MAP = {
  LOW: "blue.400",
  MEDIUM: "yellow.400",
  HIGH: "red.400",
};

const ToDoItem = ({ name, date, priority, id, index, onClickToDo }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onClickToDo(id)}
        >
          <CardBody className={styles.container}>
            <Icon
              as={ICONS_MAP[priority]}
              color={COLOR_MAP[priority]}
              boxSize={6}
            />
            <div className={styles.textContainer}>
              <Text fontSize="16px">{name}</Text>
              <Text fontSize="14px" color="gray.500">
                {date?.toDateString()}
              </Text>
            </div>
          </CardBody>
        </Card>
      )}
    </Draggable>
  );
};

export default ToDoItem;
