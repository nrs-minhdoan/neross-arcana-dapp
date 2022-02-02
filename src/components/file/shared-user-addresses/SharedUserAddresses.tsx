import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import Box from "@mui/material/Box";
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
import BackspaceIcon from "@mui/icons-material/Backspace";

import useI18nContext from "../../../hooks/useI18nContext";

interface IProps {
  id: string;
  onClose: () => void;
}

function SharedUserAddresses({ id, onClose }: IProps) {
  const dispatch = useDispatch();
  const { t } = useI18nContext();
  const { enqueueSnackbar } = useSnackbar();

  const columns = useMemo<
    Array<{
      field: string;
      label: string;
      align: "left" | "right" | "center";
      minWidth: number;
    }>
  >(() => {
    return [
      { field: "wallet", label: t("wallet"), align: "left", minWidth: 160 },
      { field: "actions", label: t("actions"), align: "right", minWidth: 240 },
    ];
  }, [t]);

  const rows = useMemo<Array<{ [key: string]: any }>>(() => {
    return [
      {
        wallet: "empty_wallet",
        actions: "empty_actions",
      },
      {
        wallet: "empty_wallet",
        actions: "empty_actions",
      },
      {
        wallet: "empty_wallet",
        actions: "empty_actions",
      },
      {
        wallet: "empty_wallet",
        actions: "empty_actions",
      },
      {
        wallet: "empty_wallet",
        actions: "empty_actions",
      },
      {
        wallet: "empty_wallet",
        actions: "empty_actions",
      },
    ];
  }, []);

  return (
    <Dialog fullWidth maxWidth="xs" open={!!id} onClose={onClose}>
      <DialogTitle>{t("sharedUserAddresses")}</DialogTitle>
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
                      minWidth: column.minWidth,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.field];
                      return (
                        <TableCell key={column.field} align={column.align}>
                          {column.field === "actions" ? (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                              }}
                            >
                              <Tooltip
                                title={t("revoke") as string}
                                placement="top"
                              >
                                <IconButton type="button">
                                  <BackspaceIcon />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
}

export default SharedUserAddresses;
