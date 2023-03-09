import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function IndexToRecipesRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/recipe");
    })

    return (
        <>
        </>
    );
}