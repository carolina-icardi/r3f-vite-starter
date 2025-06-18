import { Canvas } from "@react-three/fiber";
import Grid from "@mui/material/Grid2";
import { Button, TextField, Typography } from "@mui/material";
import { Experience } from "../../components/Experience";
import React, { useEffect, useRef, useState } from "react";
import RecordRTC, { StereoAudioRecorder } from "recordrtc";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import StopIcon from "@mui/icons-material/Stop";

function Home() {

  const [avatarAnimation, setAvatarAnimation] = useState("Waving");

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

  recorderRef.current.stopRecording(async() => {
    const blob = recorderRef.current!.getBlob();
    setIsRecording(false);
setAvatarAnimation("TalkingPoseTwo");
    const file = new File([blob], "audio.wav", { type: blob.type });
    const formData = new FormData();
    formData.append("audio", file);
const response = await fetch("http://localhost:3001/audiochat", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log("Transcription:", data);
    if (data?.audioBase64) {
      const audioSrc = `data:audio/wav;base64,${data.audioBase64}`;
      new Audio(audioSrc).play();
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
          <Experience currentAnimation={avatarAnimation}/>
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
            Welcome in your educational platform!
          </Typography>

          <TextField
            fullWidth
            multiline
            minRows={8}
            placeholder="Write your question here..."
            variant="outlined"
            sx={textAreaStyle}
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
        </Grid>
      </Grid>
    </Grid>
  );
}
export const textAreaStyle = {
  marginTop: "0.5em",
  "& .MuiOutlinedInput-root": {
    borderRadius: "6px",
  },
};

export default Home;
