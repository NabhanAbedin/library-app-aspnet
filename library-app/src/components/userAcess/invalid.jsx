import { AlertCircle } from "lucide-react";

const InValid = ({ invalidName }) => {

    return (
        <div className="invalid">
            <AlertCircle className="invalid-icon" />
            <p>Invalid {invalidName}</p>
        </div>
    );
};

export default InValid;