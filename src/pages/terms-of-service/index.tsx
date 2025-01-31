


import { Container, Typography } from "@mui/material";
import React from "react";

export const TermOfServicePage: React.FC = () => {
    return (

        <Container>
        <Typography variant="h1" gutterBottom>
            Terms of Service
        </Typography>
        <Typography variant="body1" paragraph>
            Welcome to Sistem Informasi Jemaat Kemah Airnona. By using our services, you agree to the following terms and conditions:
        </Typography>
        <Typography variant="h2" gutterBottom>
            1. Acceptance of Terms
        </Typography>
        <Typography variant="body1" paragraph>
            By accessing and using our services, you accept and agree to be bound by the terms and provision of this agreement.
        </Typography>
        <Typography variant="h2" gutterBottom>
            2. Description of Service
        </Typography>
        <Typography variant="body1" paragraph>
            We provide a platform for managing and accessing information related to Jemaat Kemah Airnona.
        </Typography>
        <Typography variant="h2" gutterBottom>
            3. User Responsibilities
        </Typography>
        <Typography variant="body1" paragraph>
            Users are responsible for maintaining the confidentiality of their account and password and for restricting access to their computer.
        </Typography>
        <Typography variant="h2" gutterBottom>
            4. Modifications to Service
        </Typography>
        <Typography variant="body1" paragraph>
            We reserve the right to modify or discontinue the service with or without notice at any time.
        </Typography>
        <Typography variant="h2" gutterBottom>
            5. Termination
        </Typography>
        <Typography variant="body1" paragraph>
            We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever.
        </Typography>
        <Typography variant="h2" gutterBottom>
            6. Governing Law
        </Typography>
        <Typography variant="body1" paragraph>
            These terms shall be governed and construed in accordance with the laws of Indonesia, without regard to its conflict of law provisions.
        </Typography>
        <Typography variant="h2" gutterBottom>
            7. Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
            If you have any questions about these Terms, please contact us at support@kemahairnona.com.
        </Typography>
    </Container>

    );
};
