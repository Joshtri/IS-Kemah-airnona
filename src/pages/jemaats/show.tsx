import { useShow } from "@refinedev/core";
import { Show } from "@refinedev/mui";
import { Typography, Stack, Alert, TextField, Card, CardContent, Divider, FormControl, FormLabel } from "@mui/material";
import { DateField } from "@refinedev/mui";

export const JemaatShow = () => {
    // Fetch data using useShow
    const { query: showQuery } = useShow();

    const { data: showData, isLoading: showIsLoading, isError: showIsError } = showQuery;

    // Extract record data
    const record = showData?.data.data;

    if (showIsLoading) {
        return <Typography variant="body1">Loading...</Typography>;
    }

    if (showIsError || !record) {
        return <Alert severity="error">Error loading data</Alert>;
    }

    return (
        <Show isLoading={showIsLoading}>
            <Card variant="outlined" sx={{ p: 2 }}>
                <CardContent>
                    <Stack spacing={2}>
                        <Typography variant="h5" component="div">
                            Detail Jemaat
                        </Typography>
                        <Divider />
                        <Stack direction="row" spacing={2}>
                            <FormControl fullWidth>
                                <FormLabel id="nama-jemaat-label">Nama Jemaat</FormLabel>
                                <TextField
                                    id="nama-jemaat"
                                    value={record?.nama_jemaat}
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <FormLabel id="tanggal-lahir-label">Tanggal Lahir</FormLabel>
                                <DateField
                                    id="tanggal-lahir"
                                    value={record.tanggal_lahir ? new Date(record.tanggal_lahir) : null}
                                    format="dd/MM/yyyy"
                                
                                    // InputProps={{
                                    //     readOnly: true,
                                    // }}
                                    // InputLabelProps={{
                                    //     shrink: true,
                                    // }}
                                />
                                
                            </FormControl>
                        </Stack>
                        <FormControl fullWidth>
                            <FormLabel id="alamat-label">Alamat</FormLabel>
                            <TextField
                                id="alamat"
                                value={record?.alamat}
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={3}
                                InputProps={{
                                    readOnly: true,
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <FormLabel id="nomor-telepon-label">Nomor Telepon</FormLabel>
                            <TextField
                                id="nomor-telepon"
                                value={record?.nomor_telepon}
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <FormLabel id="email-label">Email</FormLabel>
                            <TextField
                                id="email"
                                value={record?.email}
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <FormLabel id="status-keanggotaan-label">Status Keanggotaan</FormLabel>
                            <TextField
                                id="status-keanggotaan"
                                value={record?.status_keanggotaan}
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <FormLabel id="kartu-keluarga-id-label">Kartu Keluarga ID</FormLabel>
                            <TextField
                                id="kartu-keluarga-id"
                                value={record?.kartu_keluargaid}
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <FormLabel id="rayon-id-label">Rayon ID</FormLabel>
                            <TextField
                                id="rayon-id"
                                value={record?.rayonId}
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <FormLabel id="dibuat-pada-label">Dibuat Pada</FormLabel>
                            <DateField
                                id="dibuat-pada"
                                value={record.created_at ? new Date(record.created_at) : null}
                                format="dd/MM/yyyy"
                                // variant="outlined"
                                // fullWidth
                                // InputProps={{
                                //     readOnly: true,
                                // }}
                                // InputLabelProps={{
                                //     shrink: true,
                                // }}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <FormLabel id="diperbarui-pada-label">Diperbarui Pada</FormLabel>
                            <DateField
                                id="diperbarui-pada"
                                value={record.updated_at ? new Date(record.updated_at) : null}
                                format="dd/MM/yyyy"
                                // variant="outlined"
                                // fullWidth
                                // InputProps={{
                                //     readOnly: true,
                                // }}
                                // InputLabelProps={{
                                //     shrink: true,
                                // }}
                            />
                        </FormControl>
                    </Stack>
                </CardContent>
            </Card>
        </Show>
    );
};
