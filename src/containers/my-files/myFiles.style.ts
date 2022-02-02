import { Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    minWidth: 0,
    width: "calc(100vw - 18rem)",
    margin: "2rem 0",
    overflow: "hidden",
    [theme.breakpoints.down("md")]: {
      width: "calc(100vw - 5.5rem)",
    },
  },
}));

export default useStyles;
