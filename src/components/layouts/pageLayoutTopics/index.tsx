import { memo } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import type { TopicsDoc } from "@/types/db/topics";
import Grid from "@mui/material/Grid";

function PageLayoutTopics(props: { topics: TopicsDoc }) {
  const navigate = useNavigate();

  return (
    <Box>
      <Grid container spacing={2}>
        {props.topics.map((doc) => (
          <Grid item key={doc.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardActionArea onClick={() => navigate(`/topics/${doc.id}`)}>
                <CardMedia
                  component="img"
                  height="100"
                  image="https://img.freepik.com/free-vector/orange-abstract-seamless-patterned-background_53876-118247.jpg?w=900&t=st=1701279139~exp=1701279739~hmac=7dcb345a51972239692a3569130a74be8a931e8a46ee46eb910a4afdfe18b223"
                  alt={doc.id}
                  sx={{ bgcolor: "grey" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="body1">
                    {doc.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    by {doc.author}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

const PageLayoutTopicsMemo = memo(PageLayoutTopics);
export default PageLayoutTopicsMemo;
