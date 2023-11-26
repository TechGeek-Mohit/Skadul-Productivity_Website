import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { db } from "../../../firebaseDB";
import MainPage from "../MainPage";
import PieChart from "./piechart";


function Analytics() {
  const [data, setData] = useState([]);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [taskCompleted, setTaskCompleted] = useState(0);
  const [numActiveTasks, setNumActiveTasks] = useState(0);

  const formatTime = (timeInMs) => {
    const hours = Math.floor((timeInMs % 86400000) / 3600000);
    const minutes = Math.floor((timeInMs % 3600000) / 60000);
    const seconds = Math.floor((timeInMs % 60000) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
    
  };


  useEffect(() => {
    const unsubscribe = db
      .collection("focusmode")
      .orderBy("startTime", "desc")
      .onSnapshot((snapshot) => {
        const data = [];
        let totalTime = 0;
        snapshot.forEach((doc) => {
          const { startTime, endTime, elapsedTime } = doc.data();
          const duration = new Date(startTime).getTime() - new Date(endTime).getTime();
          if (duration >= 0) {
            console.log(`Duration: ${duration}`);
            totalTime += duration;
          }
          data.push({ id: doc.id, startTime, endTime, duration });
        });
        console.log(`Time Elapsed: ${totalTime}`);
        setTotalElapsedTime(totalTime);
        setData(data);
      });
    return () => unsubscribe();
  }, []);
  



  const completedTasksRef = db.collection('completedTasks');


completedTasksRef.get()
  .then(snapshot => {
    setTaskCompleted(snapshot.size);
    console.log(`Number of completed tasks: ${taskCompleted}`);
  })
  .catch(error => {
    console.error('Error retrieving completed tasks from Firestore: ', error);
  });

  const activeTasksRef = db.collection('activeTasks');

activeTasksRef.get()
  .then(snapshot => {
    setNumActiveTasks(snapshot.size);
    console.log(`Number of active tasks: ${numActiveTasks}`);
  })
  .catch(error => {
    console.error('Error retrieving active tasks from Firestore: ', error);
  });

  return (
    <Box p={6} bg="green.100" rounded="md">
      <Box p={6} bg="green.100" rounded="md" align="center">
        <Text fontSize="2xl" fontWeight="bold">
          Time Spent on Focus Mode: 
        </Text>
        <Text fontSize="4xl" fontWeight="bold" mb={6}>
          {formatTime(totalElapsedTime)}
        </Text>
      </Box>
      <Grid mt={6} templateColumns="repeat(3, 1fr)" gap={6}>
        {data.map((item) => (
          <Flex
            key={item.id}
            bg="white"
            p={4}
            borderRadius="md"
            boxShadow="sm"
          >
            <Box flex={1}>
              <Text fontSize="lg" fontWeight="bold">
                Start Time
              </Text>
              <Text>{new Date(item.startTime).toLocaleString()}</Text>
            </Box>
            <Box flex={1}>
              <Text fontSize="lg" fontWeight="bold">
                End Time
              </Text>
              <Text>{new Date(item.endTime).toLocaleString()}</Text>
            </Box>
            <Box flex={1}>
              <Text fontSize="lg" fontWeight="bold">
                Elapsed Time
              </Text>
              Elapsed time: {formatTime(item.startTime - item.endTime)})
              </Box>
          </Flex>
        ))}
      </Grid>
      <Box p={6} bg="green.100" rounded="md" textAlign="center">
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Task Completion Status
        </Text>
        <Flex flexDirection="column" alignItems="center" bg="white" p={4} borderRadius="md" boxShadow="sm">
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            Completed Tasks: {taskCompleted}
          </Text>
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            Incomplete Tasks: {numActiveTasks - taskCompleted}
          </Text>
          <Text fontSize="xl" fontWeight="bold">
            Total Tasks: {numActiveTasks}
          </Text>
        </Flex>
      </Flex>
      <br/>
      <PieChart numActiveTasks={numActiveTasks} numCompletedTasks={taskCompleted} />
    </Box>
      
    </Box>
  );
}

export default Analytics;
