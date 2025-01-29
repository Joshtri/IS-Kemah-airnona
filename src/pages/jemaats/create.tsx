import { Create } from "@refinedev/mui";
import { Box, TextField, MenuItem, Grid, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { StatusKeanggotaan } from "../../hooks/useJemaat";
import { useForm } from "@refinedev/react-hook-form";
import { useJemaat } from "../../hooks/useJemaat"; // Impor useJemaat
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Assume you have API endpoints for fetching kartu keluarga and rayon data
const fetchRayon = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/rayon`);
    console.log(`data rayon  : `, response.data.data);

    return response.data.data; // Assuming the response data is an array of rayon objects
};

const fetchKartuKeluarga = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/kartu-keluarga`);

    console.log(`data kartu keluarga  : `, response.data.data);

    return response.data.data; // Assuming the response data is an array of kartu keluarga objects
};

export const JemaatCreate : React.FC = () => {
    const {
        saveButtonProps,
        refineCore: { formLoading },
        register,
        control,
        handleSubmit,
        setError, // Digunakan untuk menangani error di form
        formState: { errors },
    } = useForm();

    const { createJemaat } = useJemaat(); // Gunakan hook useJemaat


    // Fetch rayon and kartu keluarga data
    const { data: rayonData, isLoading: isLoadingRayon } = useQuery({
        queryKey: ["rayon"], // Gunakan queryKey sebagai array
        queryFn: fetchRayon, // Gunakan queryFn untuk fungsi fetch
    });

    const { data: kartuKeluargaData, isLoading: isLoadingKartuKeluarga } = useQuery({
        queryKey: ["kartuKeluarga"], // Gunakan queryKey sebagai array
        queryFn: fetchKartuKeluarga, // Gunakan queryFn untuk fungsi fetch
    });

    const onSubmit = async (data: any) => {
        try {
            await createJemaat.mutateAsync(data);
            console.log("Data jemaat berhasil ditambahkan:", data);
        } catch (error: any) {
            console.error("Gagal menambahkan data jemaat:", error);

            // If error is a validation error from the backend, handle it
            if (error && error.errors) {
                Object.entries(error.errors).forEach(([field, message]) => {
                    console.log(`Setting error for field ${field}: ${message}`);

                    // Use setError to manually set backend validation errors
                    setError(field as string, {
                        type: "manual",
                        message: message as string,
                    });
                });
            } else {
                // If the error is not related to validation, you can handle it here (e.g., show a generic message)
                alert("An unknown error occurred while submitting the form.");
            }
        }
    };

    return (
        <Create isLoading={formLoading} saveButtonProps={{ ...saveButtonProps, onClick: handleSubmit(onSubmit) }}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                autoComplete="off"
            >
                <Typography variant="h6">Tambah Jemaat</Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            {...register("nama_jemaat", { required: "Nama jemaat wajib diisi." })}
                            label="Nama Jemaat"
                            variant="outlined"
                            fullWidth
                            error={!!errors.nama_jemaat}
                            helperText={errors.nama_jemaat?.message as string}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="tanggal_lahir"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Tanggal Lahir"
                                    type="date"
                                    variant="outlined"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    error={!!errors.tanggal_lahir}
                                    helperText={errors.tanggal_lahir?.message as string}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register("alamat", { required: "Alamat wajib diisi." })}
                            label="Alamat"
                            variant="outlined"
                            fullWidth
                            error={!!errors.alamat}
                            helperText={errors.alamat?.message as string}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            {...register("nomor_telepon")}
                            label="Nomor Telepon"
                            variant="outlined"
                            fullWidth
                            error={!!errors.nomor_telepon}
                            helperText={errors.nomor_telepon?.message as string}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            {...register("email", { required: "Email wajib diisi." })}
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            error={!!errors.email}
                            helperText={errors.email?.message as string}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            select
                            label="Status Keanggotaan"
                            {...register("status_keanggotaan", { required: "Status keanggotaan wajib diisi." })}
                            variant="outlined"
                            fullWidth
                            error={!!errors.status_keanggotaan}
                            helperText={errors.status_keanggotaan?.message as string}
                        >
                            {Object.values(StatusKeanggotaan).map((status) => (
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    {/* Kartu Keluarga Dropdown */}
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="kartu_keluargaid"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    label="Kartu Keluarga ID"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.kartu_keluargaid}
                                    helperText={errors.kartu_keluargaid?.message as string}
                                    disabled={isLoadingKartuKeluarga}
                                >
                                    {kartuKeluargaData?.map((kartu: any) => (
                                        <MenuItem key={kartu.id} value={kartu.id}>
                                            {kartu.nama_kepala_keluarga}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>

                    {/* Rayon Dropdown */}
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="rayonId"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    label="Rayon ID"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.rayonId}
                                    helperText={errors.rayonId?.message as string}
                                    disabled={isLoadingRayon}
                                >
                                    {rayonData?.map((rayon: any) => (
                                        <MenuItem key={rayon.id} value={rayon.id}>
                                            {rayon.nama_rayon}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Create>
    );
};