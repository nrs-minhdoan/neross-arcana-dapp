import { Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme: Theme) => ({
  variantSuccess: {
    backgroundColor: `${theme.palette.success.main} !important`,
  },
  variantError: {
    backgroundColor: `${theme.palette.error.main} !important`,
  },
}));

export default useStyles;
