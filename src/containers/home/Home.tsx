import { Canvas } from "@react-three/fiber";
import Grid from "@mui/material/Grid2";
import { Button, TextField, Typography } from "@mui/material";
import { Experience } from "../../components/Experience";
import React, { useEffect, useRef, useState } from "react";
import MicRecorder from "mic-recorder-to-mp3";
import lamejs from "lamejs";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import StopIcon from "@mui/icons-material/Stop";

function Home() {
  const recorderRef = useRef<MicRecorder | null>(null);

  /*     useEffect(() => {
        recorderRef.current = new MicRecorder({ bitRate: 128 });
    }, []);
     */

  useEffect(() => {
    // 1. Setta Lame PRIMA di importare la libreria
    // @ts-ignore
    window.Lame = lamejs;

    // 2. Importa dinamicamente mic-recorder-to-mp3
    import("mic-recorder-to-mp3").then((module) => {
      const MicRecorder = module.default;
      recorderRef.current = new MicRecorder({ bitRate: 128 });
    });
  }, []);
  const [isRecording, setIsRecording] = useState(false);
  const startRecording = async () => {
    try {
      if (recorderRef.current && recorderRef) {
        await recorderRef.current.start();
        console.log(recorderRef.current.startTime);
        setIsRecording(true);
      } else {
        return;
      }
    } catch (e) {
      console.error("Mic permission error:", e);
    }
  };

  const stopRecording = async () => {
    await recorderRef.current.stop();
    const [buffer, blob] = await recorderRef.current.getMp3();
    setIsRecording(false);

    const file = new File(buffer, "audio.mp3", { type: blob.type });

    const formData = new FormData();
    formData.append("audio", file);

    const response = await fetch("http://localhost:3001/audiochat", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    // -------- resp testo
    // fetch synthesize
    console.log("Transcription:", data);
    if (data && data.audioBase64) {
      const audioSrc = `data:audio/mp3;base64,${data.audioBase64}`;
      const audioElement = new Audio(audioSrc);
      audioElement.play();
    }
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
          <Experience />
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
