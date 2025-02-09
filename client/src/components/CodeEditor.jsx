import { useRef, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";
import Form from "./Form";

const socket = io("https://code-editor-live.glitch.me/");

const CodeEditor = ({ roomId, username }) => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    if (!roomId || !username) return; // ✅ Prevent errors if roomId is empty

    socket.emit("joinRoom", { roomId, username });

    const handleCodeUpdate = (code) => setValue(code);
    const handleLanguageUpdate = (lang) => setLanguage(lang);

    socket.on("codeUpdate", handleCodeUpdate);
    socket.on("languageUpdate", handleLanguageUpdate);

    return () => {
      socket.off("codeUpdate", handleCodeUpdate);
      socket.off("languageUpdate", handleLanguageUpdate);
    };
  }, [roomId, username]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (newLanguage) => {
    setLanguage(newLanguage);
    setValue(CODE_SNIPPETS[newLanguage] || ""); // ✅ Load default snippet
    socket.emit("languageUpdate", { roomId, language: newLanguage });
  };

  const onChange = (code) => {
    setValue(code);
    socket.emit("codeUpdate", { roomId, code });
  };

  return (
    <Box>
      <HStack spacing={4}>
        <Box w="50%">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{ minimap: { enabled: false } }}
            height="75vh"
            theme="vs-dark"
            language={language}
            value={value}
            onMount={onMount}
            onChange={onChange}
          />
        </Box>
        <Output editorRef={editorRef} language={language} />
      </HStack>
    </Box>
  );
};

const App = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <Box>
      {!joined ? (
        <Form
          setRoomId={setRoomId}
          setUsername={setUsername}
          onJoin={() => setJoined(true)} // ✅ Pass the onJoin function
        />
      ) : (
        <CodeEditor roomId={roomId} username={username} />
      )}
    </Box>
  );
};
 export default App;