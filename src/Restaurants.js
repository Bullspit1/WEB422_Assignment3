import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom'
import queryString from 'query-string';
import { Card, Table, Pagination } from 'react-bootstrap';

export default function Restaurants(){

    let history = useHistory();

    let location = useLocation();
    let query = queryString.parse(location.search);

    const [restaurants, setRestaurants] = useState(null);
    const [page, setPage] = useState(1);
    const perPage = 10;

    let borough = undefined;

    if(query.borough){
        borough = query.borough;
    }

    useEffect(()=>{
        // console.log(borough);
        // if(borough === undefined){
        //     console.log(`https://serene-dawn-47935.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}${borough === undefined ? "" : ("&borough=" + borough.charAt(0).toUpperCase() + borough.slice(1))}`);
        // }
        fetch(`https://serene-dawn-47935.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}${borough === undefined ? "" : ("&borough=" + borough.charAt(0).toUpperCase() + borough.slice(1))}`)
        .then(res => res.json())
        .then(data => {
            // console.log(`https://serene-dawn-47935.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}${borough === undefined ? "" : ("&borough=" + borough.charAt(0).toUpperCase() + borough.slice(1))}`);
            // console.log(data)
            setRestaurants(data);
            // console.log(restaurants.length);
        });
        // console.log(query.borough);
    }, [page, borough]);

    function previousPage(){
        // console.log("clicked prev " + (page > 1));
        if(page > 1){
            setPage(prev => prev - 1);
        }
    }

    function nextPage(){
        // console.log("clicked next " + (page >= 1));
        if(page >= 1){
            setPage(prev => prev + 1);
        }
    }

    return(
        <>
        {restaurants === null ? 
        <Card>
            <Card.Body>
                <Card.Text>Loading Restarants.</Card.Text>
            </Card.Body>
        </Card>
        : 
        restaurants.length === 0 ? 
            <Card>
                <Card.Body>
                    <Card.Text>No Restaurants Found.</Card.Text>
                </Card.Body>
            </Card>
            :
            <>
            <Card>
            <Card.Body>
            <Card.Title>Restaurant List</Card.Title>
            <Card.Text>Full list of restaurants. Optinally sorted by borough.</Card.Text>
            </Card.Body>
        </Card>
        <br />
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Borough</th>
                <th>Cusine</th>
                </tr>
            </thead>
            <tbody>
                {
                restaurants.map(restaurant =>
                    <tr key={restaurant._id} onClick={()=>{ history.push(`/restaurant/${restaurant._id}`)}}>
                        <td>{restaurant.name}</td>
                        <td>{restaurant.address.building + " " + restaurant.address.street}</td>
                        <td>{restaurant.borough}</td>
                        <td>{restaurant.cuisine}</td>
                    </tr>
                )
                }
            </tbody>
        </Table>

        <Pagination>
            <Pagination.Prev onClick={previousPage}/>
                <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={nextPage}/>
        </Pagination>
        </>
        }
        
        
        
        </>
    );
}