import React from "react";
import {
  Input,
  Button,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useState, useRef } from "react";

import DatePicker from "../DatePicker/DatePicker";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const AddEditModal = ({
  isOpen,
  onClose,
  mode,
  initialData,
  saveToDo,
  deleteToDo,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [priority, setPriority] = useState();
  const initialRef = useRef(null);

  useEffect(() => {
    if (mode === "EDIT") {
      setName(initialData?.name);
      setDescription(initialData?.description);
      setStartDate(initialData?.date);
      setPriority(initialData?.priority);
    } else {
      setName("");
      setDescription("");
      setStartDate(new Date());
      setPriority("");
    }
  }, [mode, initialData]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody mt={4}>
          <FormControl>
            <FormLabel>Task Name</FormLabel>
            <Input
              ref={initialRef}
              placeholder="Task Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Date</FormLabel>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Priority</FormLabel>
            <Select
              placeholder="Select Priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="HIGH">High 😫</option>
              <option value="MEDIUM">Medium 😐</option>
              <option value="LOW">Low 🙂</option>
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          {mode === "EDIT" && (
            <Button
              onClick={() => {
                deleteToDo(initialData.id);
                onClose();
              }}
              mr={3}
              background="red"
              color="white"
            >
              Delete
            </Button>
          )}

          {mode === "EDIT" ? (
            <Button
              onClick={() => {
                saveToDo(
                  {
                    id: initialData.id,
                    name: name,
                    description: description,
                    date: startDate,
                    priority: priority,
                  },
                  false
                );
                onClose();
              }}
              colorScheme="blue"
            >
              Save
            </Button>
          ) : (
            <Button
              onClick={() => {
                saveToDo(
                  {
                    id: uuidv4(),
                    name: name,
                    description: description,
                    date: startDate,
                    priority: priority,
                  },
                  true
                );
                onClose();
              }}
              colorScheme="blue"
            >
              Add
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default AddEditModal;
