import Alert from 'react-bootstrap/Alert';

function Alert1({ alertModal, setAlertModal }) {
    const { status, message, variant } = alertModal;
    if (status) {
        return (
            <Alert variant={variant} onClose={() => setAlertModal({ status: false, message: "", variant: "" })} dismissible>
                {message}
            </Alert>
        );
    }
}

export default Alert1