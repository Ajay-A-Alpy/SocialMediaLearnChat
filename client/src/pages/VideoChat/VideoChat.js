import {Grid, Stack, Typography} from "@mui/material";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import Options from "../../components/videoPlayer/Options";
import Notification from "../../components/videoPlayer/Notification";
import {Box} from "@mui/system";
export default function VideoChat() {
  return (
    <Grid container>
      <Grid>
        <Stack direction="column">
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              backgroundColor: "green",
              borderRadius: "30px",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                display: "block",
                width: "200px",
                backgroundColor: "yellow",
                borderRadius: "30px",
              }}
            >
              VIDEO CHAT
            </Typography>
          </Box>
        </Stack>
        <VideoPlayer></VideoPlayer>
        <Options>
          <Notification></Notification>
        </Options>
      </Grid>
    </Grid>
  );
}
