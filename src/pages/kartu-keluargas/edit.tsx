import { Edit } from "@refinedev/mui";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";

import { useEffect } from "react";

export const KartuKeluargaEdit = () => {
    const {
        saveButtonProps,
        refineCore: { query, onFinish },
        register,
        formState: { errors },
        setValue, // Tambahkan setValue untuk mengatur ulang nilai form
    } = useForm();

    const kartuKeluargaData = query?.data?.data.data;

    useEffect(() => {
        if (kartuKeluargaData) {
            setValue("nama_kepala_keluarga", kartuKeluargaData.nama_kepala_keluarga);
            setValue("alamat_keluarga", kartuKeluargaData.alamat_keluarga);
            setValue("nomor_telepon_keluarga", kartuKeluargaData.nomor_telepon_keluarga);
        }
    }, [kartuKeluargaData, setValue]); // Setiap kali data berubah, update form

    return (
        <Edit saveButtonProps={saveButtonProps} >
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                autoComplete="off"
                onSubmit={onFinish}
            >
                {/* <Typography variant="h6">Edit Kartu Keluarga</Typography> */}

                <TextField
                    label="Nama Kepala Keluarga"
                    {...register("nama_kepala_keluarga", { required: "Nama Kepala Keluarga is required" })}
                    error={!!errors.nama_kepala_keluarga}
                    helperText={errors.nama_kepala_keluarga?.message || ""}
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true, // Mengatur label agar tidak tertutupi oleh nilai
                    }}
                />

                <TextField
                    label="Alamat Keluarga"
                    {...register("alamat_keluarga", { required: "Alamat Keluarga is required" })}
                    error={!!errors.alamat_keluarga}
                    helperText={errors.alamat_keluarga?.message || ""}
                    variant="outlined"
                    multiline
                    rows={4}
                    InputLabelProps={{
                        shrink: true, // Mengatur label agar tidak tertutupi oleh nilai
                    }}
                />

                <TextField
                    label="Nomor Telepon Keluarga"
                    {...register("nomor_telepon_keluarga", { required: "Nomor Telepon Keluarga is required" })}
                    error={!!errors.nomor_telepon_keluarga}
                    helperText={errors.nomor_telepon_keluarga?.message || ""}
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true, // Mengatur label agar tidak tertutupi oleh nilai
                    }}
                />

                {/* <Button type="submit" variant="contained" color="primary" {...saveButtonProps}>
                    Save
                </Button> */}

                {errors && Object.keys(errors).length > 0 && (
                    <Alert severity="error">Please fix the errors above.</Alert>
                )}
            </Box>
        </Edit>
    );
};
