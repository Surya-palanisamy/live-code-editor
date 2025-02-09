import { useRef, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";
import RoomInput from "./RoomInput";

const socket = io("https://code-editor-live.glitch.me/");

const CodeEditor = ({ roomId, username }) => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    if (roomId && username) {
      socket.emit("joinRoom", { roomId, username });
    }

    socket.on("codeUpdate", (code) => {
      setValue(code);
    });

    socket.on("languageUpdate", (language) => {
      setLanguage(language);
    });

    return () => {
      socket.off("codeUpdate");
      socket.off("languageUpdate");
    };
  }, [roomId, username]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    socket.emit("languageUpdate", { roomId, language });
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
        <RoomInput
          setRoomId={setRoomId}
          setUsername={setUsername}
          onJoin={() => setJoined(true)}
        />
      ) : (
        <CodeEditor roomId={roomId} username={username} />
      )}
    </Box>
  );
};

export default App;
