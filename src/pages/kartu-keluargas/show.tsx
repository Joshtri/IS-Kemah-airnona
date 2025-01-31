import { useShow } from "@refinedev/core";
import { Show } from "@refinedev/mui";
import { Typography, Stack, TextField, Card, CardContent, Divider, FormControl, FormLabel } from "@mui/material";

export const KartuKeluargaShow = () => {
    const { query } = useShow();
    const { data, isLoading, isError } = query;

    // Extract record data
    const record = data?.data.data;

    return (
        <Show isLoading={isLoading}>
            <Card>
                <CardContent>
                    <Stack spacing={2}>
                        <Typography variant="h6">Detail Kartu Keluarga</Typography>
                        <Divider />
                        <Stack direction="row" spacing={2}>
                            <FormControl fullWidth>
                                <FormLabel id="id-label">ID</FormLabel>
                                <TextField
                                    id="id"
                                    value={record?.id || "N/A"}
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
                                <FormLabel id="nama-kepala-keluarga-label">Nama Kepala Keluarga</FormLabel>
                                <TextField
                                    id="nama-kepala-keluarga"
                                    value={record?.nama_kepala_keluarga || "N/A"}
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
                        </Stack>
                        <FormControl fullWidth>
                            <FormLabel id="alamat-keluarga-label">Alamat Keluarga</FormLabel>
                            <TextField
                                id="alamat-keluarga"
                                value={record?.alamat_keluarga || "N/A"}
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                InputProps={{
                                    readOnly: true,
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <FormLabel id="nomor-telepon-keluarga-label">Nomor Telepon Keluarga</FormLabel>
                            <TextField
                                id="nomor-telepon-keluarga"
                                value={record?.nomor_telepon_keluarga || "N/A"}
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
                    </Stack>
                </CardContent>
            </Card>
        </Show>
    );
};
