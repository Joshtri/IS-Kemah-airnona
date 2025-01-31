import { Edit } from "@refinedev/mui";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect } from "react";

export const RayonEdit = () => {
    const {
        saveButtonProps,
        refineCore: { query, onFinish },
        register,
        setValue,
        formState: { errors },
    } = useForm();

    const rayonData = query?.data?.data.data;

    useEffect(() => {
        if (rayonData) {
            setValue("nama_rayon", rayonData?.nama_rayon);
            setValue("wilayah", rayonData?.wilayah);
        }
    }, [rayonData, setValue]);

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                autoComplete="off"
                onSubmit={onFinish}
            >
                <Typography variant="h6">Edit Rayon</Typography>

                <TextField
                    {...register("nama_rayon", { required: "Nama Rayon is required" })}
                    label="Nama Rayon"
                    error={!!errors.nama_rayon}
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true, // Mengatur label agar tidak tertutupi oleh nilai
                    }}
                />

                <TextField
                    {...register("wilayah", { required: "Wilayah is required" })}
                    label="Wilayah"
                    error={!!errors.wilayah}
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true, // Mengatur label agar tidak tertutupi oleh nilai
                    }}
                    
                />

                <Button type="submit" variant="contained" color="primary" {...saveButtonProps}>
                    Save
                </Button>

                {errors && Object.keys(errors).length > 0 && (
                    <Alert severity="error">Please fix the errors above.</Alert>
                )}
            </Box>
        </Edit>
    );
};
