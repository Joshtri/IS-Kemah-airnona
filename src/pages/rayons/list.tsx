import React from "react";
import {
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
  List,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography, LinearProgress } from "@mui/material";

export const RayonList: React.FC = () => {
  const { dataGridProps } = useDataGrid({
    resource: "rayon", // Sesuaikan dengan nama di resources App.tsx
  });
  
  // Ambil data dari dataGridProps.rows.data
  const rows = dataGridProps.rows?.data || [];
  // const total = dataGridProps.rows?.total || 0;

  const columns = React.useMemo<GridColDef[]>(
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
      }
    ],
    []
  );

  if (dataGridProps.loading) {
    return (
      <List>
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <LinearProgress />
        </Box>
      </List>
    );
  }

  if (!rows || rows.length === 0) {
    return (
      <List>
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Typography variant="h6" color="error">
            Terjadi kesalahan saat memuat data.
          </Typography>
        </Box>
      </List>
    );
  }

  if (!rows || rows.length === 0) {
    return (
      <List>
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Typography variant="h6">Tidak ada data rayon.</Typography>
        </Box>
      </List>
    );
  }

  return (
    <List title="Rayon">
      <DataGrid
        rows={rows} // Gunakan data dari rows
        rowCount={dataGridProps.rowCount} // Gunakan total dari dataGridProps.rows.total
        columns={columns}
        autoHeight
        pagination
        paginationMode="server" // Sesuaikan dengan mode pagination backend
        sortingMode="server" // Sesuaikan dengan mode sorting backend
      />
    </List>
  );
};
