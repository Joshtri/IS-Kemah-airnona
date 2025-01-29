import { useLogin } from "@refinedev/core";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";

interface LoginFormValues {
    username: string;
    password: string;
}

export const LoginPage: React.FC = () => {
    const { mutate: login } = useLogin<LoginFormValues>();
    const [formValues, setFormValues] = useState<LoginFormValues>({
        username: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        login(formValues);
    };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(to right, #667eea, #764ba2)",
                padding: 2,
            }}
        >
            <Card sx={{ width: 400, boxShadow: 5, borderRadius: 3 }}>
                <CardContent>
                    <Typography variant="h4" align="center" gutterBottom>
                        Sistem Informasi Jemaat
                    </Typography>
                    <Typography variant="h6" align="center" gutterBottom>
                        Gereja Kemah Airnona
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom>
                        Welcome to the Sistem Informasi Jemaat Gereja Kemah Airnona. Please login to continue.
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
                    >
                        <TextField
                            label="Username"
                            name="username"
                            value={formValues.username}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formValues.password}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2, py: 1.5 }}
                        >
                            Login
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};
