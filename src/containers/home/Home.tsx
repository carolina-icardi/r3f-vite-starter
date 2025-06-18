import { Canvas } from "@react-three/fiber";
import Grid from "@mui/material/Grid2";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Experience } from "../../components/Experience";
import React, { useRef, useState } from "react";
import RecordRTC, { StereoAudioRecorder } from "recordrtc";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import StopIcon from "@mui/icons-material/Stop";
import axios from "axios";
import { text } from "stream/consumers";

function Home() {
  const [avatarAnimation, setAvatarAnimation] = useState("Waving");
  const [response, setResponse] = useState("");

  const recorderRef = useRef<RecordRTC | null>(null);

  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    try {
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
      setAvatarAnimation("Idle");
    } catch (e) {
      console.error("Mic permission error:", e);
    }
  };

  const stopRecording = async () => {
    if (!recorderRef.current) return;

    recorderRef.current.stopRecording(async () => {
      const blob = recorderRef.current!.getBlob();
      setIsRecording(false);
      setAvatarAnimation("ThoughtfulHeadNod");
      const file = new File([blob], "audio.wav", { type: blob.type });
      const formData = new FormData();
      formData.append("audio", file);
      const response = await axios.post("http://localhost:3001/audiochat", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = await response.data;
      setResponse(data.responseText); 
      console.log("Transcription:", data);

      const audioResponse = await axios.post(
        "http://localhost:3001/synthesize",
        {
          text: data.responseText,
        }
      );

      const audioResponseData = audioResponse.data;

      if (audioResponseData && audioResponseData.audioBase64) {
        const audioSrc = `data:audio/wav;base64,${data.audioBase64}`;
        const audio = new Audio(audioSrc);
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
            sx={{
              marginTop: "0.5em",
              backgroundColor: "#4a715d",
              color: "#e5ab0f",
              width: "100%",
            }}
            variant="contained"
          >
            Ask me
          </Button>

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
                    backgroundColor: "#4a715d",
                    color: "#e5ab0f",
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

    {/*       <Box
            borderRadius="6px"
            borderColor={"#4a715d"}
            border={1}
            marginTop="2em"
            marginBottom="1.5em"
            padding="1em"
            sx={{
              backgroundColor: "#f0f0f0",
              "&::before": {
                content: '""',
                position: "absolute",
                left: -10,
                top: 10,
                width: 0,
                height: 0,
                borderTop: "10px solid transparent",
                borderRight: "10px solid #f0f0f0",
                borderBottom: "10px solid transparent",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: "#4a715d",
              }}
            >
              {response}
            </Typography>
          </Box>

          <Box
            borderRadius="6px"
            borderColor={"#4a715d !important"}
            border={1}
            marginBottom="1em"
            padding="1em"
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: "#4a715d",
              }}
            >
              {response}
            </Typography>
          </Box> */}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Home;
