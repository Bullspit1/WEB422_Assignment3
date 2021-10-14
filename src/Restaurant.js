import { useParams } from "react-router-dom";

export default function Restaurant(){

    let { id } = useParams();

    return(
        <>
        <p>Restaurants id: {id}</p>
        </>
    );
}