import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import CodeEditor from "./components/CodeEditor"; // ✅ Import the editor component

function App() {
  const [roomId, setRoomId] = useState("");  
  const [username, setUsername] = useState("");

  return (
    <Routes>
      <Route path="/" element={<Form setRoomId={setRoomId} setUsername={setUsername} />} />
      <Route path="/:roomid" element={<Form setRoomId={setRoomId} setUsername={setUsername} />} />
      <Route path="/editor/:roomid" element={<CodeEditor roomId={roomId} username={username} />} /> {/* ✅ Editor Route */}
    </Routes>
  );
}

export default App;
