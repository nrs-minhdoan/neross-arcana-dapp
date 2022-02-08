import React, { useMemo } from "react";

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

import withAuth from "../../hocs/withAuth";
import useI18nContext from "../../hooks/useI18nContext";

import useStyles from "./sharedWithMe.style";

function SharedWithMe() {
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
                              <IconButton>
                                <DownloadIcon />
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
    </Card>
  );
}

export default withAuth(SharedWithMe);
