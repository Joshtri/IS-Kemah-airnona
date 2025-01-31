import { Edit } from "@refinedev/mui";
import { Box, TextField, Typography, Alert } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect } from "react";

export const JemaatEdit = () => {
    const {
        saveButtonProps,
        refineCore: { query, onFinish },
        register,
        formState: { errors },
        setValue,
        watch, // Untuk melihat nilai yang tersimpan dalam form
    } = useForm();

    const jemaatData = query?.data?.data.data;

    useEffect(() => {
        console.log("🔥 Data jemaat dari API:", jemaatData); // Debug API response

        if (jemaatData) {
            setValue("nama_jemaat", jemaatData?.nama_jemaat);

            // Konversi format tanggal dari ISO ke YYYY-MM-DD
            const formattedDate = jemaatData?.tanggal_lahir
                ? new Date(jemaatData.tanggal_lahir).toISOString().split("T")[0]
                : "";
            setValue("tanggal_lahir", formattedDate);

            setValue("alamat", jemaatData?.alamat);
            setValue("nomor_telepon", jemaatData?.nomor_telepon);
            setValue("email", jemaatData?.email);
            setValue("status_keanggotaan", jemaatData?.status_keanggotaan);
            setValue("kartu_keluargaid", jemaatData?.kartu_keluargaid);
            setValue("rayonId", jemaatData?.rayonId);
        }

        console.log("📌 Nilai dalam form setelah setValue:", watch()); // Debug nilai form
    }, [jemaatData, setValue]);

    const handleSubmit = (data: any) => {
        console.log("🚀 Data yang dikirim ke backend:", data); // Debug saat submit
        onFinish(data);
    };

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Typography variant="h6">Edit Jemaat</Typography>

                <TextField
                    {...register("nama_jemaat", { required: "Nama Jemaat wajib diisi" })}
                    label="Nama Jemaat"
                    variant="outlined"
                    fullWidth
                    error={!!errors.nama_jemaat}
                    helperText={errors.nama_jemaat?.message as string}
                />

                <TextField
                    {...register("tanggal_lahir", { required: "Tanggal Lahir wajib diisi" })}
                    label="Tanggal Lahir"
                    variant="outlined"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.tanggal_lahir}
                    helperText={errors.tanggal_lahir?.message as string}
                    onChange={(e) => setValue("tanggal_lahir", e.target.value)} // Pastikan tetap format YYYY-MM-DD
                />


                <TextField
                    {...register("alamat", { required: "Alamat wajib diisi" })}
                    label="Alamat"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    error={!!errors.alamat}
                    helperText={errors.alamat?.message as string}
                />

                <TextField
                    {...register("nomor_telepon", { required: "Nomor Telepon wajib diisi" })}
                    label="Nomor Telepon"
                    variant="outlined"
                    fullWidth
                    error={!!errors.nomor_telepon}
                    helperText={errors.nomor_telepon?.message as string}
                />

                <TextField
                    {...register("email", { required: "Email wajib diisi", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Email tidak valid" } })}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message as string}
                />

                <TextField
                    {...register("status_keanggotaan", { required: "Status Keanggotaan wajib diisi" })}
                    label="Status Keanggotaan"
                    variant="outlined"
                    fullWidth
                    error={!!errors.status_keanggotaan}
                    helperText={errors.status_keanggotaan?.message as string}
                />

                <TextField
                    {...register("kartu_keluargaid", { required: "Kartu Keluarga ID wajib diisi" })}
                    label="Kartu Keluarga ID"
                    variant="outlined"
                    fullWidth
                    error={!!errors.kartu_keluargaid}
                    helperText={errors.kartu_keluargaid?.message as string}
                />

                <TextField
                    {...register("rayonId", { required: "Rayon ID wajib diisi" })}
                    label="Rayon ID"
                    variant="outlined"
                    fullWidth
                    error={!!errors.rayonId}
                    helperText={errors.rayonId?.message as string}
                />

                {errors && Object.keys(errors).length > 0 && (
                    <Alert severity="error">Silakan perbaiki kesalahan di atas.</Alert>
                )}
            </Box>
        </Edit>
    );
};
