import { MuiInferencer } from "@refinedev/inferencer/mui";
import {
    useDataGrid,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
  } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography, LinearProgress } from "@mui/material";
import React from "react";


interface IKartuKeluarga {
    id: number;
    nama_kepala_keluarga: string;
    alamat_keluarga: string;
    nomor_telepon_keluarga: string;

}

interface IApiResponse {
  status: number;
  message: string;
  data: IKartuKeluarga[];
}


export const KartuKeluargaList = () => {
    const { dataGridProps } = useDataGrid();

    console.log("dataGridProps:", dataGridProps); // Debugging

    // Ambil data dari dataGridProps.rows.data
    // const rows = dataGridProps.rows || [];
    // const total = dataGridProps.rows?.total || 0;


    const columns = React.useMemo<GridColDef<IKartuKeluarga>[]>(() => [
        {
            field: "nama_kepala_keluarga",
            headerName: "Nama Kepala Keluarga",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },

        {
            field: "alamat_keluarga",
            headerName: "Alamat Kartu Keluarga",
            flex: 1,
            align: "center",
            headerAlign: "center",
        },


        {
            field: "nomor_telepon_keluarga",
            headerName: "Nomor Telepon Keluarga",
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

    
    ], []);

      // Safely access rows from dataGridProps and handle undefined/empty data
  const rows = (dataGridProps.rows as unknown as IApiResponse)?.data ?? [];


    // return <MuiInferencer />;

    return(
    <List title="Kartu Keluarga">
      <DataGrid
        rows={rows} // Gunakan data dari rows
        rowCount={dataGridProps.rowCount} // Gunakan total dari dataGridProps.rowCount
        columns={columns}
        autoHeight
        pagination
        paginationMode="server" // Sesuaikan dengan mode pagination backend
        sortingMode="server" // Sesuaikan dengan mode sorting backend
      />
    </List>
    )
};
