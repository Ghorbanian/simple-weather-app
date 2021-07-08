import React, { useEffect, useState, useRef } from "react"
import { Alert, Container, Card, Col, Jumbotron, Form, FormControl, Button, Row } from "react-bootstrap"
import { callApi, setArrayCookie, getArrayCookie } from "../lib/utils"
import { ImageStyle } from "../lib/styles"

export default (props) => {
  const lonRef = useRef()
  const latRef = useRef()
  const [error, setError] = useState(null)
  const [data, setData] = useState([])

  const fetchData = async ({ lon, lat }) => {
    const response = await callApi(`/data/2.5/onecall?lon=${lon}&lat=${lat}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`, "GET")
    if (!response.isError) {
      response.daily = response.daily.slice(0, 3)
      setData((data) => [...data, response])
      return { isErr: false }
    } else {
      return { isErr: true, msg: "coordinates not valid" }
    }
  }

  const fetchAllData = async (coordinates) => {
    let dataArray = []
    for (let i = 0; i < coordinates.length; i++) {
      const { lon, lat } = coordinates[i]
      const response = await callApi(`/data/2.5/onecall?lon=${lon}&lat=${lat}&&appid=${process.env.REACT_APP_WEATHER_API_KEY}`, "GET")
      if (!response.isError) {
        response.daily = response.daily.slice(0, 3)
        dataArray.unshift(response)
      } else {
        console.error(response)
      }
    }
    setData(dataArray)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    const coordinates = { lon: lonRef.current.value, lat: latRef.current.value }
    let coordinatesTrackedArray = (getArrayCookie('coordinatesTracked')) ? (getArrayCookie('coordinatesTracked')) : ([])
    const result = await fetchData(coordinates)
    console.log(result)
    if (result.isErr) {
      setError(result.msg)
      return
    }
    coordinatesTrackedArray.unshift(coordinates)
    setArrayCookie('coordinatesTracked', coordinatesTrackedArray)

  };

  const removeCoordinate = async ({ lon, lat }) => {
    let coordinatesTrackedArray = (getArrayCookie('coordinatesTracked')) ? (getArrayCookie('coordinatesTracked')) : ([])
    for (let i = 0; i < coordinatesTrackedArray.length; i++) {
      const coords = coordinatesTrackedArray[i]
      if (coords.lon == lon && coords.lat == lat) {
        coordinatesTrackedArray.splice(i, 1)
        setArrayCookie('coordinatesTracked', coordinatesTrackedArray)
        break
      }
    }
    for (let i = 0; i < data.length; i++) {
      const coords = data[i]
      if (data.lon == lon && data.lat == lat) {
        setData((data) => [...data.filter((_, index) => index !== i)])
        return
      }
    }
    window.location.reload()
  };

  useEffect(() => {
    const coordinatesTrackedArray = getArrayCookie('coordinatesTracked')
    if (coordinatesTrackedArray && coordinatesTrackedArray.length > 0)
      fetchAllData(coordinatesTrackedArray)
  }, []);

  return (
    <Container>
      <Jumbotron>
        <div class={"card-title h5"} >
          Location Tracker
              <br />
          <br />
        </div>
        <Col lg="auto">
          <Form className="mr-auto text-center" onSubmit={handleSubmit}>
            <FormControl type="text" placeholder="longitude" className="mr-sm-2 text-center" ref={lonRef} />
            <br />
            <FormControl type="text" placeholder="laditude" className="mr-sm-2 text-center" ref={latRef} />
            <br />
            <Button variant="secondary" type="submit" >Track Location</Button>
            {error && (
              <>
                {console.log(error)}
                <br />
                <br />
                <Alert variant="danger">
                  {error}
                </Alert>
              </>
            )}
          </Form>
        </Col>
      </Jumbotron>
      <Container>
        {data && data.length > 0 && (
          <>
            {data.map((datum) => {
              return (
                <>
                  <br />
                  <Card style={{ width: "auto" }}>
                    <Card.Header>
                      Forecast for Coordinates Longitude {datum.lon} and Laditude {datum.lat}
                    </Card.Header>
                    <br />
                    <Card.Body>
                      <Row>
                        {datum.daily.map((day, index) => {
                          return (
                            <Col>
                              <Card.Img variant="top" style={ImageStyle} src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} />
                              <Card.Text>
                                day {index + 1}: {day.weather[0].description}
                              </Card.Text>
                            </Col>
                          )
                        })}
                      </Row>
                      <br />
                      <Button variant="secondary" type="submit" onClick={() => removeCoordinate({ lon: datum.lon, lat: datum.lat })} >Stop Tracking</Button>
                    </Card.Body>
                  </Card>

                </>
              )
            })}
          </>
        )}
        <br />
        <br />
      </Container>
    </Container>
  )
};