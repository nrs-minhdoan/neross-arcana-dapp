import { Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "16rem",
    borderRight: `solid 1px ${theme.palette.primary.main}`,
  },
  content: {
    width: "100%",
    padding: "1rem",
  },
}));

export default useStyles;
