import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { useNavigation, useNotification } from "@refinedev/core";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";

export const RayonCreate = () => {
    const {
        saveButtonProps,
        refineCore: { formLoading },
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { push } = useNavigation();
    const { open } = useNotification();

    const onSubmit = async (data: Record<string, any>) => {
        try {
            console.log("buat tambah data rayon...", data);
            // Simpan data ke server atau lakukan operasi lainnya
            // Misalnya, menggunakan refineCore untuk mengirim data ke API
            // await refineCore.mutate({
            //     resource: "rayon",
            //     mutationMode: "optimistic",
            //     values: data,
            // });

            // Berikan notifikasi sukses
            open?.({
                message: "Data Rayon berhasil ditambahkan",
                type: "success",
            });

            // Redirect ke halaman lain setelah berhasil
            push("/rayon");
        } catch (error) {
            // Berikan notifikasi kesalahan
            open?.({
                message: "Gagal menambahkan data Rayon",
                description: (error as any).message || "Terjadi kesalahan tidak terduga",
                type: "error",
            });
        }
    };

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Typography variant="h6">Tambah Rayon</Typography>

                {/* Field Nama Rayon */}
                <TextField
                    {...register("nama_rayon", { required: "Nama Rayon wajib diisi" })}
                    label="Nama Rayon"
                    variant="outlined"
                    fullWidth
                    error={!!errors.nama_rayon}
                    helperText={errors.nama_rayon?.message as string}
                />

                {/* Field Wilayah */}
                <TextField
                    {...register("wilayah", { required: "Wilayah wajib diisi" })}
                    label="Wilayah"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    error={!!errors.wilayah}
                    helperText={errors.wilayah?.message as string}
                />

                {/* Tombol Simpan */}
                {/* <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    {...saveButtonProps}
                >
                    Simpan
                </Button> */}

                {/* Menampilkan pesan kesalahan jika ada */}
                {errors && Object.keys(errors).length > 0 && (
                    <Alert severity="error">Silakan perbaiki kesalahan di atas.</Alert>
                )}
            </Box>
        </Create>
    );
};
