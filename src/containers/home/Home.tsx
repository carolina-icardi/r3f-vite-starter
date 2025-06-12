import { Canvas } from "@react-three/fiber";
import Grid from '@mui/material/Grid2'; 
import { Button, TextField, Typography } from "@mui/material";
import { Experience } from "../../components/Experience";

function Home() {
  return (
    <Grid container display={"flex"} flexDirection={"row"} sx={{width:'100wv', height:'100vh'}} >
     
      <Grid size={6}>
    <Canvas shadows camera={{ position: [0, 0, 8], fov: 30 }}>
      <color attach="background" args={["#ececec"]} />
      <Experience />
    </Canvas>
    </Grid>
     <Grid size={6} sx={{display:'flex', justifyContent:'center', padding:'2em'}}>
      <Grid display={'flex'} flexDirection={'column'} sx={{width:'100%', alignItems:'center'}}>
        <Typography sx={{fontSize:'30px', color:'#4a715d', marginTop:'0.5em', marginBottom:'1em', fontWeight:'bold'}}>Welcome in your educational platform!</Typography>

      <TextField
          fullWidth
          multiline
          minRows={8}
          placeholder="Write your question here..."
          variant="outlined"
          sx={textAreaStyle}
        />
                <Button sx={{marginTop:'0.5em', backgroundColor:'#4a715d', color:'#e5ab0f', width:'100%'}} variant="contained">Ask me</Button>

        </Grid>
     </Grid>
    </Grid>
  );
}
export const textAreaStyle = {
  'marginTop': '0.5em',
  '& .MuiOutlinedInput-root': {
    borderRadius: '6px',
  },
};

export default Home;
