import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./Campo.css";

function Campo(name, link) {
    return (
        <Link to={link}>
            <Button variant="primary">{name}</Button>
        </Link>
    );
}

export default Campo;