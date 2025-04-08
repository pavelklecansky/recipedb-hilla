import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function IndexToRecipesRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/recipe");
  });

  return <></>;
}
