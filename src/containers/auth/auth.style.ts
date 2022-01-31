import { Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: "24rem",
    maxWidth: "calc(100vw - 2rem)",
    flex: 1,
    margin: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  description: {
    textAlign: "center",
    opacity: 1,
    "& a:visited": {
      color: theme.palette.primary.main,
    },
    transition: "all 0.5s ease-in-out",
  },
  descriptionInvisible: { pointerEvents: "none", opacity: 0 },
  loading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "6rem",
    opacity: 1,
    transition: "all 0.5s ease-in-out",
  },
  loadingInvisible: {
    opacity: 0,
    height: 0,
  },
  buttonGroup: {
    width: "100%",
    opacity: 1,
    transition: "all 0.5s ease-in-out",
  },
  buttonGroupInvisible: {
    pointerEvents: "none",
    opacity: 0,
  },
}));

export default useStyles;
