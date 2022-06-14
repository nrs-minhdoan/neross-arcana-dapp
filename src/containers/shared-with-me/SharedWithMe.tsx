import React, { useMemo, useEffect } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";

import { MyFile } from "../../models/store/file.model";
import withAuth from "../../hocs/withAuth";
import { getSharedWithMeFiles } from "../../store/file/file.action";
import Download from "../../components/file/download/Download";
import useI18nContext from "../../hooks/useI18nContext";

import { formatShortId, formatSizeFileFromByte } from "../../utils/common";

import useStyles from "./sharedWithMe.style";

function SharedWithMe() {
  const dispatch = useDispatch();
  const { sharedWithMeFiles, loading } = useSelector((store) => store.file);
  const classes = useStyles();
  const { t } = useI18nContext();

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

  useEffect(() => {
    dispatch(getSharedWithMeFiles.request());
  }, [dispatch]);

  const renderCellContent = (field: string, value: string | number) => {
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
          <Typography variant="body2" component="p" sx={{ textAlign: "right" }}>
            {formatSizeFileFromByte(value as number)}
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
          </Box>
        );
    }
  };

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
              uniqBy(sharedWithMeFiles, "id").map((file) => {
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
    </Card>
  );
}

export default withAuth(SharedWithMe);
