import { Box, Typography } from "@mui/material";

interface ChatProps {
  text: string;
  side: "left" | "right"; // sinistra = AI, destra = utente
}

export const Chat = ({ text, side }: ChatProps) => {
  const isRight = side === "right";

  return (
    <Box
      sx={{
        position: "relative",
        alignSelf: isRight ? "flex-end" : "flex-start",
        backgroundColor: isRight ? "#a4b8af" : "#fff",
        color: isRight ? "#0e1e1c" : "#4a715d",
        padding: "1em",
        borderRadius: "6px",
        marginTop: "1.5em",
        marginBottom: "1.5em",
        maxWidth: "70%",
        border: "1px solid #4a715d",
        "&::before": {
          content: '""',
          position: "absolute",
          [isRight ? "right" : "left"]: -12,
          top: 12,
          width: 0,
          height: 0,
          borderTop: "12px solid transparent",
          borderBottom: "12px solid transparent",
          [isRight ? "borderLeft" : "borderRight"]: "12px solid #4a715d",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          [isRight ? "right" : "left"]: -10,
          top: 14,
          width: 0,
          height: 0,
          borderTop: "10px solid transparent",
          borderBottom: "10px solid transparent",
          [isRight ? "borderLeft" : "borderRight"]: `10px solid ${isRight ? "#a4b8af" : "#fff"}`,
        },
      }}
    >
      <Typography sx={{ fontSize: "14px" }}>{text}</Typography>
    </Box>
  );
};
