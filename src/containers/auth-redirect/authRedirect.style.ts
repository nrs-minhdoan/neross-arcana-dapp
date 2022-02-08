import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles({
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
  loading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "6rem",
  },
});

export default useStyles;
