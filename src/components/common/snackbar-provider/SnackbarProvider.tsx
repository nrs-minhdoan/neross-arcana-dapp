import React, { PropsWithChildren } from "react";

import { SnackbarProvider } from "notistack";

import useStyles from "./snackbarProvider.style";

interface IProps {}

function SnackbarWrapper({ children }: PropsWithChildren<IProps>) {
  const classes = useStyles();

  return (
    <SnackbarProvider
      classes={{
        variantSuccess: classes.variantSuccess,
        variantError: classes.variantError,
      }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      autoHideDuration={1500}
    >
      {children}
    </SnackbarProvider>
  );
}

export default SnackbarWrapper;
