import { Canvas } from "@react-three/fiber";
import Grid from "@mui/material/Grid2";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Experience } from "../../components/Experience";
import React, { useRef, useState } from "react";
import RecordRTC, { StereoAudioRecorder } from "recordrtc";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import StopIcon from "@mui/icons-material/Stop";
import axios from "axios";
import { Chat } from "../../components/atoms/chat";
import SendIcon from "@mui/icons-material/Send";

function Home() {
  const [avatarAnimation, setAvatarAnimation] = useState("Waving");
  const [response, setResponse] = useState("");
  const [question, setQuestion] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recorderRef = useRef<RecordRTC | null>(null);

  const [isRecording, setIsRecording] = useState(false);

  //ANIMAZIONI CASUALI DURANTE IL TALKING

  const talkingAnimations = ["Talking", "TalkingPoseTwo", "ThoughtfulHeadNod"];
  const getRandomAnimation = (exclude?: string) => {
    const options = talkingAnimations.filter((a) => a !== exclude);
    return options[Math.floor(Math.random() * options.length)];
  };
  function startTalkingAnimation() {
    const interval = setInterval(() => {
      const randomAnimation = getRandomAnimation(avatarAnimation);
      setAvatarAnimation(randomAnimation);
    }, Math.floor(Math.random() * 800) + 700); 
    return interval;
  }

  const startRecording = async () => {
    try {
      setResponse("");
      setQuestion("");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const recorder = new RecordRTC(stream, {
        type: "audio",
        mimeType: "audio/wav",
        recorderType: StereoAudioRecorder,
        numberOfAudioChannels: 1,
        desiredSampRate: 16000,
      });

      recorder.startRecording();
      recorderRef.current = recorder;
      setIsRecording(true);
      // setAvatarAnimation("Idle");
    } catch (e) {
      console.error("Mic permission error:", e);
    }
  };

  const stopRecording = async () => {
    if (!recorderRef.current) return;

    recorderRef.current.stopRecording(async () => {
      const blob = recorderRef.current!.getBlob();
      setIsRecording(false);
      setIsThinking(true);
      // setAvatarAnimation("ThoughtfulHeadNod");
      const file = new File([blob], "audio.wav", { type: blob.type });
      const formData = new FormData();
      formData.append("audio", file);
      const response = await axios.post(
        "http://localhost:3001/audiochat",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = await response.data;
      setResponse(data.responseText);
      setQuestion(data.questionText);
      console.log("Transcription:", data);
      setIsSpeaking(false);
      const audioResponse = await axios.post(
        "http://localhost:3001/synthesize",
        {
          text: data.responseText,
        }
      );
      setIsThinking(false);
      const audioResponseData = audioResponse.data;

      if (audioResponseData && audioResponseData.audioBase64) {
        const audioSrc = `data:audio/wav;base64,${audioResponseData.audioBase64}`;
        const audio = new Audio(audioSrc);
        let animationInterval: NodeJS.Timeout;

        audio.addEventListener("play", () => {
          setIsSpeaking(true);
          animationInterval = startTalkingAnimation();
        });
        audio.addEventListener("ended", () => {
          clearInterval(animationInterval);
          setAvatarAnimation("Idle");
        });
        audio.volume = 1;
        audio
          .play()
          .catch((err) =>
            console.error("Errore durante la riproduzione audio:", err)
          );
      } else {
        console.log(audioResponseData);
      }
    });
  };

  return (
    <Grid
      container
      display={"flex"}
      flexDirection={"row"}
      sx={{ width: "100wv", height: "100vh" }}
    >
      <Grid size={6}>
        <Canvas shadows camera={{ position: [0, 0, 8], fov: 30 }}>
          <color attach="background" args={["#ececec"]} />
          <Experience currentAnimation={avatarAnimation} />
        </Canvas>
      </Grid>
      <Grid
        size={6}
        sx={{ display: "flex", justifyContent: "center", padding: "2em" }}
      >
        <Grid
          display={"flex"}
          flexDirection={"column"}
          sx={{ width: "100%", alignItems: "center" }}
        >
          <Typography
            sx={{
              fontSize: "30px",
              color: "#4a715d",
              marginTop: "0.5em",
              marginBottom: "1em",
              fontWeight: "bold",
            }}
          >
            Welcome to your educational platform!
          </Typography>

          <Box sx={{ position: "relative", width: "100%", marginTop: "0.5em" }}>
            <TextField
              fullWidth
              multiline
              minRows={8}
              placeholder="Write your question here..."
              variant="outlined"
              sx={{
                marginTop: "0.5em",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "6px",
                },
              }}
            />
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              sx={{
                position: "absolute",
                bottom: 12,
                right: 12,
                backgroundColor: "#4a715d",
                color: "#e5ab0f",
                "&:hover": {
                  backgroundColor: "#2f5544",
                },
              }}
            >
              Ask me
            </Button>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              sx={{
                position: "absolute",
                bottom: 12,
                right: 12,
                backgroundColor: "#4a715d",
                color: "#e5ab0f",
                "&:hover": {
                  backgroundColor: "#2f5544",
                  color: "#e5ab0f",
                },
              }}
            >
              Ask me
            </Button>
          </Box>

          <Grid sx={{ marginTop: "0.5em", width: "100%" }}>
            {!isRecording ? (
              <Button
                onClick={startRecording}
                endIcon={<KeyboardVoiceIcon />}
                sx={{
                  backgroundColor: "#e5ab0f",
                  color: "#4a715d",
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "#cc9600",
                    color: "#2f5544",
                  },
                }}
                variant="contained"
              >
                Start Recording
              </Button>
            ) : (
              <Button
                onClick={stopRecording}
                endIcon={<StopIcon />}
                sx={{
                  backgroundColor: "#8B0000",
                  color: "#fff",
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "#a10000",
                    color: "#fff",
                  },
                }}
                variant="contained"
              >
                Stop Recording
              </Button>
            )}
          </Grid>

          {question && <Chat side="right" text={question} />}
          {isThinking && <CircularProgress sx={{ marginTop: "10em" }} />}
          {isSpeaking && response && <Chat side="left" text={response} />}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Home;
