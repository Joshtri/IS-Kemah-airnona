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



interface IJemaat {
  id: number;
  nama_jemaat: string;
  tanggal_lahir: string;
  alamat: string;
  nomor_telepon: string;
  email: string;
  status_keanggotaan: string;
}


interface IApiResponse {
  status: number;
  message: string;
  data: IJemaat[];
}


export const JemaatList: React.FC = () => {
  const { dataGridProps } = useDataGrid();
  // console.log("dataGridProps:", dataGridProps); // Debugging

  // Ambil data dari dataGridProps.rows.data
  const rows = (dataGridProps.rows as unknown as IApiResponse)?.data ?? [];
  // const total = dataGridProps.rows?.total || 0;

  const columns = React.useMemo<GridColDef<IJemaat>[]>(
    () => [
      {
        field: "nama_jemaat",
        headerName: "Nama Jemaat",
        flex: 1,
        align: "center",
        headerAlign: "center",
      },
      // {
      //   field: "tanggal_lahir",
      //   headerName: "Tanggal Lahir",
      //   flex: 1,
      //   align: "center",
      //   headerAlign: "center",
      // },
      // {
      //   field: "alamat",
      //   headerName: "Alamat",
      //   flex: 1,
      //   align: "center",
      //   headerAlign: "center",
      // },
      {
        field: "nomor_telepon",
        headerName: "Nomor Telepon",
        flex: 1,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "status_keanggotaan",
        headerName: "Status Keanggotaan",
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
    [],
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
          <Typography variant="h6">Tidak ada data jemaat.</Typography>
        </Box>
      </List>
    );
  }

  return (
    <List title="Jemaat">
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