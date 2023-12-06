import React from 'react'
import { Card, Col } from 'react-bootstrap'

const Item = ({data, select}) => {
    const base_url = 'https://arthurfrost.qflo.co.za'
    return (
        <Col sm={4} className='mb-4'>
            <Card>
                <Card.Img variant='top' src={data.Image ? `https://arthurfrost.qflo.co.za/${data.Image}` :"https://placehold.co/430x150"}/>
                <Card.Body>
                    <Card.Title>{data?.Title}</Card.Title>
                    <Card.Text>
                        <p className="category mb-2">
                            <strong>Category: </strong>
                            {data?.Category}
                        </p>
                        <p className="description mb-2"> 
                            <strong>Date create: </strong> 
                            {data?.CreateDate}
                        </p>
                        <p className="duration" style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: "center"
                        }}>
                            <i class="fa-regular fa-circle-play" 
                                style={{
                                    fontSize: '2rem',
                                    cursor: 'pointer'
                                }}
                                onClick={() => select(data)}
                            ></i>
                            <small className="text-muted" style={{display: 'inline-block', marginLeft: '5px'}}>Press the icon to play...</small>
                        </p>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Item