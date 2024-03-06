import { Typography } from "@mui/material"

interface ErrorMessageProps {
    message: string | null
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <Typography variant="button">
            {message}
        </Typography>
    )
}

export default ErrorMessage
