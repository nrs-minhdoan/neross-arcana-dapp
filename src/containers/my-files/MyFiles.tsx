import React, { useState, useMemo } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import withAuth from "../../hocs/withAuth";
import Share from "../../components/file/share/Share";
import SharedUserAddresses from "../../components/file/shared-user-addresses/SharedUserAddresses";
import Delete from "../../components/file/delete/Delete";
import useI18nContext from "../../hooks/useI18nContext";

import useStyles from "./myFiles.style";

function MyFiles() {
  const classes = useStyles();
  const { t } = useI18nContext();
  const [shareId, setShareId] = useState<string>("");
  const [revokeId, setRevokeId] = useState<string>("");
  const [deleteId, setDeleteId] = useState<string>("");

  const columns = useMemo<
    Array<{
      field: string;
      label: string;
      align: "left" | "right" | "center";
      minWidth: number;
    }>
  >(() => {
    return [
      { field: "id", label: t("fileID"), align: "left", minWidth: 160 },
      {
        field: "lastModified",
        label: t("lastModified"),
        align: "left",
        minWidth: 160,
      },
      { field: "size", label: t("size"), align: "right", minWidth: 80 },
      { field: "actions", label: t("actions"), align: "right", minWidth: 240 },
    ];
  }, [t]);

  const rows = useMemo<Array<{ [key: string]: any }>>(() => {
    return [
      {
        id: "empty_file_id",
        lastModified: "empty_last_modified",
        size: "empty_size",
        actions: "empty_actions",
      },
    ];
  }, []);

  return (
    <Card className={classes.container}>
      <TableContainer sx={{ maxHeight: "calc(100vh - 11.5rem)" }}>
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
                              title={t("download") as string}
                              placement="top"
                            >
                              <IconButton type="button">
                                <DownloadIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              title={t("share") as string}
                              placement="top"
                            >
                              <IconButton
                                type="button"
                                onClick={() => {
                                  setShareId(row.id);
                                }}
                              >
                                <ShareIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              title={t("revoke") as string}
                              placement="top"
                            >
                              <IconButton
                                type="button"
                                onClick={() => {
                                  setRevokeId(row.id);
                                }}
                              >
                                <GroupRemoveIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              title={t("delete") as string}
                              placement="top"
                            >
                              <IconButton
                                type="button"
                                onClick={() => {
                                  setDeleteId(row.id);
                                }}
                              >
                                <DeleteForeverIcon />
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
      <Share
        id={shareId}
        onClose={() => {
          setShareId("");
        }}
      />
      <SharedUserAddresses
        id={revokeId}
        onClose={() => {
          setRevokeId("");
        }}
      />
      <Delete
        id={deleteId}
        onClose={() => {
          setDeleteId("");
        }}
      />
    </Card>
  );
}

export default withAuth(MyFiles);
