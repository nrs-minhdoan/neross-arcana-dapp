import React, { useState, useMemo, useEffect, useCallback } from "react";
import uniq from "lodash/uniq";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import CircularProgress from "@mui/material/CircularProgress";

import { getSharedAddresses } from "../../../store/file/file.action";
import Revoke from "../revoke/Revoke";
import useI18nContext from "../../../hooks/useI18nContext";

import { formatShortId } from "../../../utils/common";

interface IProps {
  id: string;
}

function SharedAddresses({ id }: IProps) {
  const dispatch = useDispatch();
  const { sharedAddresses, sharedAddressLoading } = useSelector(
    (store) => store.file
  );
  const { t } = useI18nContext();
  const [open, setOpen] = useState<boolean>(false);

  const columns = useMemo<
    Array<{
      field: string;
      label: string;
      align: "left" | "right" | "center";
      width: string;
      minWidth: number;
    }>
  >(() => {
    return [
      {
        field: "wallet",
        label: t("wallet"),
        align: "left",
        width: "75%",
        minWidth: 160,
      },
      {
        field: "actions",
        label: t("actions"),
        align: "right",
        width: "auto",
        minWidth: 240,
      },
    ];
  }, [t]);

  const renderCellContent = (field: string, value: string) => {
    switch (field) {
      case "id":
        return (
          <Tooltip title={value as string} placement="top">
            <Typography
              variant="body2"
              component="p"
              sx={{ width: "max-content" }}
            >
              {formatShortId(value as string)}
            </Typography>
          </Tooltip>
        );

      case "actions":
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Revoke id={id} address={value} />
          </Box>
        );
    }
  };

  useEffect(() => {
    if (open && id) {
      dispatch(getSharedAddresses.request(id));
    }
  }, [dispatch, open, id]);

  const toggleDialog = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <>
      <Tooltip title={t("revoke") as string} placement="top">
        <IconButton type="button" onClick={toggleDialog}>
          <GroupRemoveIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            backgroundImage: "none",
          },
        }}
        open={open}
        onClose={toggleDialog}
      >
        <DialogTitle>{t("sharedAddresses")}</DialogTitle>
        <DialogContent>
          <TableContainer sx={{ maxHeight: "25rem" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.field}
                      align={column.align}
                      sx={{
                        backgroundColor: "primary.main",
                        color: "text.neutral",
                        width: "",
                        minWidth: column.minWidth,
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sharedAddressLoading ? (
                  <TableRow>
                    <TableCell align="center" colSpan={4}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CircularProgress size={24} color="secondary" />
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : (
                  uniq(sharedAddresses).map((address) => {
                    return (
                      <TableRow hover tabIndex={-1} key={address}>
                        {columns.map((column) => {
                          return (
                            <TableCell
                              key={`${address}-${column.field}`}
                              align={column.align}
                            >
                              {renderCellContent(column.field, address)}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SharedAddresses;
