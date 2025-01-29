import { Box, TextField, Button, Typography } from "@mui/material";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useKartuKeluarga } from "../../hooks/useKartuKeluarga";
import { useNavigation, useNotification } from "@refinedev/core";

export const KartuKeluargaCreate: React.FC = () => {
    const {
        saveButtonProps,
        refineCore: { formLoading },
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { createKartuKeluarga } = useKartuKeluarga();
    const { push } = useNavigation();
    const { open } = useNotification();

    const onSubmit = async (data: any) => {
        try {
            console.log("Data yang dikirim:", data);
            createKartuKeluarga.mutate(data, {
                onSuccess: () => {
                    open?.({
                        type: "success",
                        message: "Berhasil",
                        description: "Data kartu keluarga berhasil ditambahkan",
                    });
                    push("/kartu-keluarga"); // Change this to your desired path
                },
            });
        } catch (error) {
            console.error("Error during form submission:", error);
        }
    };

    return (
        <Create isLoading={formLoading} saveButtonProps={{ ...saveButtonProps, onClick: handleSubmit(onSubmit) }}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >

                {/* Field Nama Kepala Keluarga */}
                <TextField
                    {...register("nama_kepala_keluarga", { required: "Nama Kepala Keluarga wajib diisi" })}
                    label="Nama Kepala Keluarga"
                    error={!!errors.nama_kepala_keluarga}
                    helperText={errors.nama_kepala_keluarga?.message as string}
                />

                {/* Field Nomor Kartu Keluarga */}
                <TextField
                    {...register("alamat_keluarga", { required: "Nomor Kartu Keluarga wajib diisi" })}
                    label="Alamat Keluarga"
                    error={!!errors.alamat_keluarga}
                    helperText={errors.alamat_keluarga?.message as string}
                />

                {/* Field Alamat */}
                <TextField
                    {...register("nomor_telepon_keluarga", { required: "Nomor telepon keluarga wajib diisi" })}
                    label="Nomor Telepon Keluarga"
                    error={!!errors.nomor_telepon_keluarga}
                    helperText={errors.nomor_telepon_keluarga?.message as string}
                />

                {/* Tombol Submit */}
                {/* <Button type="submit" variant="contained" color="primary">
                    Simpan
                </Button> */}
            </Box>
        </Create>
    );
};