import { useShow } from "@refinedev/core";
import { Show } from "@refinedev/mui";
import { Typography, Stack, TextField, Card, CardContent, Divider, FormControl, FormLabel } from "@mui/material";

export const RayonShow = () => {
    const { query: showQuery } = useShow();
    const { data: showData, isLoading: showIsLoading, isError: showIsError } = showQuery;

    // Extract record data
    const record = showData?.data.data;

    return (
        <Show isLoading={showIsLoading} error={showIsError}>
            <Card>
                <CardContent>
                    <Stack spacing={2}>
                        <Typography variant="h6">Detail Rayon</Typography>
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
                                <FormLabel id="nama-rayon-label">Nama Rayon</FormLabel>
                                <TextField
                                    id="nama-rayon"
                                    value={record?.nama_rayon || "N/A"}
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
                            <FormLabel id="wilayah-label">Wilayah</FormLabel>
                            <TextField
                                id="wilayah"
                                value={record?.wilayah || "N/A"}
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
                    </Stack>
                </CardContent>
            </Card>
        </Show>
    );
};
