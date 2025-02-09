import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, VStack, Input, Button, Heading, Text } from "@chakra-ui/react";

const Form = ({ setRoomId, setUsername, onJoin }) => {
  // ✅ Add onJoin

  const navigate = useNavigate();
  const { roomid } = useParams(); // Get roomId from URL
  const [room, setRoom] = useState(roomid || "");
  const [name, setName] = useState("");

  useEffect(() => {
    if (roomid) {
      setRoom(roomid);
    }
  }, [roomid]);

const handleJoin = () => {
  if (!room || !name) {
    alert("Room ID and Name are required!");
    return;
  }

  console.log("Joining Room with:", room, name); // ✅ Debugging log

  setRoomId(room);
  setUsername(name);

  if (onJoin) {
    // ✅ Check if onJoin exists before calling it
    onJoin();
  } else {
    console.error("onJoin function is missing!"); // Debugging error
  }
};


  const handleShare = () => {
    const url = `${window.location.origin}/${room}`;
    navigator.clipboard.writeText(url);
    alert("Room link copied to clipboard!");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgGradient="linear(to-r, #1A1A40, #4C00FF)"
    >
      <VStack
        spacing={6}
        p={8}
        borderRadius="2xl"
        boxShadow="lg"
        w={{ base: "90%", sm: "md" }}
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(10px)"
        border="1px solid rgba(255, 255, 255, 0.3)"
        textAlign="center"
      >
        <Heading size="lg" color="white">
          🚀 Join a Room
        </Heading>
        <Text fontSize="md" color="gray.300">
          Enter a Room ID and your name to get started.
        </Text>
        <Input
          placeholder="Enter Room ID"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          size="lg"
          focusBorderColor="#FFD700"
          borderRadius="md"
          bg="rgba(255, 255, 255, 0.2)"
          color="white"
          _placeholder={{ color: "gray.300" }}
          _hover={{ bg: "rgba(255, 255, 255, 0.3)" }}
        />
        <Input
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          size="lg"
          focusBorderColor="#FFD700"
          borderRadius="md"
          bg="rgba(255, 255, 255, 0.2)"
          color="white"
          _placeholder={{ color: "gray.300" }}
          _hover={{ bg: "rgba(255, 255, 255, 0.3)" }}
        />
        <Button
          size="lg"
          w="full"
          bg="linear-gradient(90deg, #FF00FF, #FF6600)"
          color="white"
          borderRadius="md"
          fontWeight="bold"
          _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
          _active={{ transform: "scale(0.95)" }}
          isDisabled={!room || !name}
          onClick={handleJoin}
        >
          🔥 Join Room
        </Button>
        <Button
          size="lg"
          w="full"
          bg="blue.500"
          color="white"
          borderRadius="md"
          fontWeight="bold"
          _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
          _active={{ transform: "scale(0.95)" }}
          onClick={handleShare}
          isDisabled={!room}
        >
          📤 Share Room Link
        </Button>
      </VStack>
    </Box>
  );
};

export default Form;
