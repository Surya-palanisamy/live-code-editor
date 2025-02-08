import { useState } from "react";
import { Box, VStack, Input, Button, Heading, Text } from "@chakra-ui/react";

const RoomInput = ({ setRoomId, setUsername, onJoin }) => {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");

  const handleJoin = () => {
    if (!room || !name) return;
    setRoomId(room);
    setUsername(name);
    onJoin();
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
      </VStack>
    </Box>
  );
};

export default RoomInput;
