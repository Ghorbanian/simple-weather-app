import React, { useEffect, useState, useRef } from "react"
import { Alert, Jumbotron, Form, FormControl, Container, Card, Button, Col } from "react-bootstrap"
import { callApi } from "../lib/utils"
import MyLoader from "./MyLoader"
import { ImageStyle } from "../lib/styles"

export default (props) => {
  const zipcodeStringRef = useRef()
  const [currentCityZipcode, setCurrentCityZipcode] = useState(null)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const fetchData = async (zipcode) => {
    const response = await callApi(`/data/2.5/weather?zip=${zipcode}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`, "GET")
    if (!response.isError) {
      setData(response)
      setCurrentCityZipcode(zipcode)
    } else {
      setError(response.data.message)
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    const currentCityZipcode = zipcodeStringRef.current.value
    window.localStorage.setItem('currentCityZipcode', currentCityZipcode)
    fetchData(currentCityZipcode)

  };

  useEffect(() => {
    const currentCityZipcode = window.localStorage.getItem('currentCityZipcode')
    if (currentCityZipcode) {
      fetchData(currentCityZipcode);
    }
  }, []);

  return (
    <Container>
      {currentCityZipcode && (
        <>
          {!data && (
            <MyLoader />
          )}
          {data && (
            <>
              <Card>
                <Card.Title>Current Weather in {data.name}</Card.Title>
                <center>
                  <Card.Img variant="top" style={ImageStyle} src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} />
                </center>
                <Card.Body>
                  <Card.Text>
                    {data.weather[0].description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </>
          )}
        </>
      )}
      {!currentCityZipcode && (
        <>
          <div class={"card-title h5"}>Enter your zipcode below to see the current weather</div>
        </>
      )}
      <Container>
        <br />
        <Jumbotron>
          <div className="text-center">
            <Col lg="auto">
              <Form className="mr-auto text-center" onSubmit={handleSubmit}>
                <FormControl type="text" placeholder="Zipcode" className="mr-sm-2 text-center" ref={zipcodeStringRef} />
                <br />
                <Button variant="secondary" type="submit" >Set Current Zipcode</Button>
                {error && (
                  <>
                    <br />
                    <br />
                    <Alert variant="danger">
                      {error}
                    </Alert>
                  </>
                )}
              </Form>
            </Col>
          </div>
        </Jumbotron>
      </Container>
    </Container>
  )
};