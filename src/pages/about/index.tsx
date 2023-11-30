import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GitHubIcon from "@mui/icons-material/GitHub";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import EmailIcon from "@mui/icons-material/Email";

export default function AboutIndex() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} textAlign="center">
        About This App
      </Typography>

      <Box sx={{ py: 4 }}>
        {ABOUT_MESSAGES.map(({ question, answers }) => (
          <Accordion key={question}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography component="p" variant="h6">
                {question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {answers.map((str, index) => (
                <Typography
                  key={index}
                  component="p"
                  variant="body1"
                  sx={{ mb: 1 }}
                >
                  {`◎ ${str}`}
                </Typography>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}

        <Typography component="p" variant="body1"></Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        sx={{ py: 2 }}
      >
        <Button
          startIcon={<MoodBadIcon />}
          href="https://github.com/BlaxBerry/my-languages-app/issues"
          target="_blank"
        >
          Report Bugs
        </Button>
        <Button
          startIcon={<GitHubIcon />}
          href="https://github.com/BlaxBerry/my-languages-app/issues"
          target="_blank"
        >
          Suggestions for improvement
        </Button>
        <Button disabled startIcon={<EmailIcon />} href="" target="_blank">
          Contact Developer
        </Button>
      </Box>
    </Box>
  );
}

const ABOUT_MESSAGES: Array<{
  question: string;
  answers: string[];
}> = [
  {
    question: "What is this ?",
    answers: [
      "A Languages Study Application. A personal practice.",
      "Could create and share your study note, and also can check notes published by other users.",
      "Supported PC and mobile device.",
    ],
  },
  {
    question: "About usage?",
    answers: [
      "1. Browsing as guest, you could check Topics list page, and also can click the note you are interested in to check more details about it.",
      "2. Create your account with email and password, you could share knowledge in community after login your personal account.",
    ],
  },
  {
    question: "Updating account information ?",
    answers: [
      "1. Access Profile page.",
      "2. Click the edit icon beside your display name to open editor drawer.",
      "3. Input your new display name and avatar photo URL. Yes, only allow online URL at this moment.",
      "4. Click then update button to send.",
      "5. If nothing changed please wait a few seconds then reload the page again.",
    ],
  },
  {
    question: "Wanna translation ?",
    answers: ["Coming soon."],
  },
  {
    question: "About developer ?",
    answers: ["Nothing Special."],
  },
  {
    question: "About license ?",
    answers: ["Protected from outside use or implementation without consent."],
  },
  {
    question: "About User Privacy ?",
    answers: [
      "Be able to collect and use the Email address for authentication which you submit when creating account.",
    ],
  },
];
