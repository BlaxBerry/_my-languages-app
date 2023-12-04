import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { FlagImg } from "@/components";
import type { NoteDoc, UserNoteDoc } from "@/types/db/notes";

function NotesCards(props: { notes: Array<NoteDoc | UserNoteDoc> }) {
  const navigate = useNavigate();

  const navigateToNote = useCallback(
    ({ noteID, authorUID }: NoteDoc | UserNoteDoc) => {
      navigate(`/notes/${noteID}?authorUID=${authorUID}`);
    },
    [navigate],
  );

  return (
    <Grid container spacing={2}>
      {props.notes?.map((doc) => (
        <Grid item key={doc.noteID} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardActionArea onClick={() => navigateToNote(doc)}>
              <CardMedia
                component="img"
                height="100"
                image="https://img.freepik.com/free-vector/orange-abstract-seamless-patterned-background_53876-118247.jpg?w=900&t=st=1701279139~exp=1701279739~hmac=7dcb345a51972239692a3569130a74be8a931e8a46ee46eb910a4afdfe18b223"
                alt={doc.noteID}
                sx={{ bgcolor: "grey" }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  display="flex"
                  alignItems="center"
                >
                  <FlagImg
                    language={doc.language}
                    sx={{ width: 20, height: 20, mr: 1 }}
                  />
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
  );
}

const NotesCardsMemo = memo(NotesCards);
export default NotesCardsMemo;
