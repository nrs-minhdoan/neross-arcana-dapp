import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    width: "100vw",
    minWidth: "100vw",
    maxWidth: "100vw",
    minHeight: "100vh",
    maxHeight: "100vh",
    overflow: "hidden",
  },
  content: {
    flex: 1,
    display: "flex",
    width: "100%",
  },
});

export default useStyles;
