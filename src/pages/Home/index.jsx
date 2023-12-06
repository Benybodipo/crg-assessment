import { useEffect, useState } from "react";
import { Row, Col, Container, FormGroup, InputGroup, Form, Table } from "react-bootstrap";
import Item from "./Item";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';



const Home = () => {
    const [data, setData] =  useState(null);
    const [selectedItem, setSelectedItem] = useState();
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const fetchData = async () => {
        const response = await fetch('https://arthurfrost.qflo.co.za/php/getTimeline.php');
        const data = await response.json();

        setData(data?.Timeline)
    }

    const search = (e) => {
        if (e.target.value.trim() !== "") {
            const result = data.filter((item) => {
                return (item.Title.toLowerCase().trim().includes(e.target.value.trim().toLowerCase()))
            });

            if (result.length) {
                return setSearchResult([...result]);
            } else {
                return setSearchResult([]);
            }
        } 
        return setSearchResult([]);
    }


    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {}, [selectedItem])

    return (
        <>
        {data && (
            <Container className="pt-5">
                <Row>
                    <Col sm={8} style={{
                        height: '90vh',
                        overflowY: 'hidden'
                    }}>
                        <InputGroup className="mb-3" >
                            <InputGroup.Text id="basic-addon1">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="Search titles..."
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                onChange={(e) => search(e)}
                            />
                        </InputGroup>
                        <Row className="mt-5" style={{
                            height: '90%',
                            overflowY: 'scroll'
                        }}>
                            {searchResult.length ? (
                                searchResult.map((item) =>  (
                                    <Item key={item.Id}
                                        data={item}
                                        select={setSelectedItem}
                                    />
                                ))
                            ) : (
                                data.map((item) =>  (
                                    <Item key={item.Id}
                                        data={item}
                                        select={setSelectedItem}
                                    />
                                ))
                            )}
                            {}
                        </Row>
                    </Col>
                    <Col>
                        <img 
                            src={selectedItem ? `https://arthurfrost.qflo.co.za/${selectedItem.Icon}` :"https://placehold.co/600x400" }
                            alt="" 
                            style={{maxWidth: '100%'}}
                        />
                        <AudioPlayer 
                            src={selectedItem ? `https://arthurfrost.qflo.co.za/${selectedItem.Audio}` : ''}
                        />
                        {selectedItem && (
                            <Table>
                                <tbody>
                                    <tr>
                                        <th>Title:</th>
                                        <td>{selectedItem?.Title}</td>
                                    </tr>
                                    <tr>
                                        <th>Category</th>
                                        <td>{selectedItem?.Category}</td>
                                    </tr>
                                    <tr>
                                        <th>Date Ceated:</th>
                                        <td>{selectedItem?.CreateDate}</td>
                                    </tr>
                                    <tr>
                                        <th>Description</th>
                                        <td>{selectedItem?.Description.trim() ? selectedItem?.Description.trim() : "No description found" }</td>
                                    </tr>
                                </tbody>
                            </Table>
                        )}
                    </Col>
                </Row>
            </Container>
        )}
        </>
    )
}

export default Home;