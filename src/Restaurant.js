import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useState, useEffect } from "react";
import { Card, CardDeck } from 'react-bootstrap';

export default function Restaurant(){

    let { id } = useParams();

    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        fetch(`https://serene-dawn-47935.herokuapp.com/api/restaurants/${id}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            setLoading(false);
            if(data.hasOwnProperty("_id")){
                setRestaurant(data);
            }else{
                setRestaurant(null);
            }
        });
    }, [id]);

    return(
        <>

    {
    loading ?
    <Card>
        <Card.Body>
            <Card.Text>Loading Restarant Data...</Card.Text>
        </Card.Body>
    </Card>
    :
    restaurant === null ? 
    <Card>
        <Card.Body>
            <Card.Text>Unable to find Restaurant with id: {id}...</Card.Text>
        </Card.Body>
    </Card>
    :
    <>
        <Card>
            <Card.Body>
            <Card.Title>{restaurant.name}</Card.Title>
            <Card.Text>{restaurant.address.building + " " + restaurant.address.street}</Card.Text>
            </Card.Body>
        </Card>

        <MapContainer style={{"height": "400px"}} center={[restaurant.address.coord[1], restaurant.address.coord[0]]} zoom={13} 
        scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[restaurant.address.coord[1], restaurant.address.coord[0]]}></Marker>
        </MapContainer>

        <br />

        <CardDeck>
            {
            restaurant.grades.map((restaurantData, index) => 
                <Card key={index}>
                    <Card.Body>
                    <Card.Text>
                        Grade: {restaurantData.grade}
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <Card.Text>
                        Compleated: {restaurantData.date}
                    </Card.Text>
                    </Card.Footer>
                </Card>
                )
            }
        </CardDeck>
    </> 
    }

        </>
    );
}