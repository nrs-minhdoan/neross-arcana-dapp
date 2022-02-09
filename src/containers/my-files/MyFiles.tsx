import React, { useState, useMemo, useEffect, useCallback } from "react";
import uniqBy from "lodash/uniqBy";
import formatter from "date-fns/format";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CircularProgress from "@mui/material/CircularProgress";

import { MyFile } from "../../models/store/file.model";
import withAuth from "../../hocs/withAuth";
import { getMyFiles } from "../../store/file/file.action";
import Share from "../../components/file/share/Share";
import SharedUserAddresses from "../../components/file/shared-user-addresses/SharedUserAddresses";
import Delete from "../../components/file/delete/Delete";
import useI18nContext from "../../hooks/useI18nContext";

import useStyles from "./myFiles.style";
import { formatShortId } from "../../utils/common";
import Download from "../../components/file/download/Download";

function MyFiles() {
  const dispatch = useDispatch();
  const { myFiles, loading } = useSelector((store) => store.file);
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
      width: string;
      minWidth: number;
    }>
  >(() => {
    return [
      {
        field: "id",
        label: t("fileID"),
        align: "left",
        width: "35%",
        minWidth: 320,
      },
      {
        field: "lastModified",
        label: t("lastModified"),
        align: "left",
        width: "25%",
        minWidth: 240,
      },
      {
        field: "size",
        label: t("size"),
        align: "right",
        width: "15%",
        minWidth: 80,
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

  useEffect(() => {
    dispatch(getMyFiles.request());
  }, [dispatch]);

  const renderCellContent = useCallback(
    (field: string, value: string | number) => {
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

        case "lastModified":
          return (
            <Typography variant="body2" component="p">
              {formatter(new Date(value as string), "dd/MM/yyyy HH:mm:ss")}
            </Typography>
          );

        case "size":
          return (
            <Typography
              variant="body2"
              component="p"
              sx={{ textAlign: "right" }}
            >
              {value}
            </Typography>
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
              <Download id={value as string} />
              <Tooltip title={t("share") as string} placement="top">
                <IconButton
                  type="button"
                  onClick={() => {
                    setShareId(value as string);
                  }}
                >
                  <ShareIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={t("revoke") as string} placement="top">
                <IconButton
                  type="button"
                  onClick={() => {
                    setRevokeId(value as string);
                  }}
                >
                  <GroupRemoveIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={t("delete") as string} placement="top">
                <IconButton
                  type="button"
                  onClick={() => {
                    setDeleteId(value as string);
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>
            </Box>
          );
      }
    },
    [t]
  );

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
                    width: column.width,
                    minWidth: column.minWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
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
              uniqBy(myFiles, "id").map((file) => {
                return (
                  <TableRow hover tabIndex={-1} key={file.id}>
                    {columns.map((column) => {
                      const value =
                        column.field === "actions"
                          ? file.id
                          : file[column.field as keyof MyFile];
                      return (
                        <TableCell
                          key={`${file.id}-${column.field}`}
                          align={column.align}
                        >
                          {renderCellContent(column.field, value)}
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
