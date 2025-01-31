import React, { useMemo } from "react";
import { useDataGrid } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography, LinearProgress } from "@mui/material";
import { EditButton, ShowButton, DeleteButton, List } from "@refinedev/mui";
import { RefineListView } from "../../components";

interface IRayon {
  id: number;
  nama_rayon: string;
  wilayah: string;
}

interface IApiResponse {
  status: number;
  message: string;
  data: IRayon[];
}

export const RayonList: React.FC = () => {
  // Use dataGridProps to fetch data for rayon resource
  const { dataGridProps } = useDataGrid({
    resource: "rayon", // Sesuaikan dengan resource Anda
  });

  // Define columns for the DataGrid
  const columns: GridColDef<IRayon>[] = useMemo(
    () => [
      {
        field: "nama_rayon",
        headerName: "Nama Rayon",
        flex: 1,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "wilayah",
        headerName: "Wilayah",
        flex: 1,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "actions",
        headerName: "Actions",
        flex: 1,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
          <Box display="flex" justifyContent="center">
            <EditButton recordItemId={params.row.id} />
            <ShowButton recordItemId={params.row.id} />
            <DeleteButton recordItemId={params.row.id} />
          </Box>
        ),
      },
    ],
    []
  );

  // If data is loading, show a loading spinner
  if (dataGridProps.loading) {
    return (
      <List>
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <LinearProgress />
        </Box>
      </List>
    );
  }

  // Safely access rows from dataGridProps and handle undefined/empty data
  const rows = (dataGridProps.rows as unknown as IApiResponse)?.data ?? [];

  // Access status and message from the API response
  const status = (dataGridProps.rows as unknown as IApiResponse)?.status;
  const message = (dataGridProps.rows as unknown as IApiResponse)?.message;

  // If no rows are available, show a message
  if (rows.length === 0) {
    return (
      <List>
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Typography variant="h6">Tidak ada data rayon.</Typography>
        </Box>
      </List>
    );
  }

  return (
    <RefineListView>
      {/* Display message from the backend if available */}
      {message && (
        <Typography variant="body1" color="primary" align="center">
          {message}
        </Typography>
      )}

      <DataGrid
        rows={rows}
        rowCount={dataGridProps.rowCount ?? rows.length} // Use totalItemCount or fallback to rows.length
        columns={columns}
        pagination
        paginationMode="server" // Enable pagination with server-side mode
        sortingMode="server" // Enable sorting with server-side mode
      />
    </RefineListView>
  );
};