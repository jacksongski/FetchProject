import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

export default function CreateAccount() {
  //   form variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [occupation, setOccupation] = useState("");
  const [state, setState] = useState("");

  //   GET returns
  const [occupations, setOccupations] = useState([]);
  const [states, setStates] = useState([]);

  //   GET from API on page load
  useEffect(() => {
    fetch("https://frontend-take-home.fetchrewards.com/form")
      .then((res) => res.json())
      .then((json) => {
        setOccupations(json.occupations);
        setStates(json.states);
      });
  }, []);

  //   POST with input from form
  function submitForm() {
    fetch("https://frontend-take-home.fetchrewards.com/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        occupation: occupation,
        state: state,
      }),
    }).then((res) => {
      if (res.status === 201) {
        return alert("Account created!");
      } else {
        return alert("Account creation failed.");
      }
    });
  }

  //   CreateAccount component
  return (
    <Row className="mt-3">
      <Col></Col>
      <Col>
        <Form className="form">
          <h2>Create an Account</h2>

          <Form.Group className="mt-5">
            <Form.Label htmlFor="registerName">Name</Form.Label>
            <Form.Control
              placeholder="Enter full name"
              value={name}
              isValid={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mt-5">
            <Form.Label htmlFor="registerEmail">Email</Form.Label>
            <Form.Control
              placeholder="Enter email"
              type="email"
              value={email}
              isValid={email.includes("@")}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mt-5">
            <Form.Label htmlFor="registerPassword">Password</Form.Label>
            <Form.Control
              placeholder="Enter password"
              type="password"
              value={password}
              isValid={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mt-5">
            <Form.Label htmlFor="registerOccupation">Occupation</Form.Label>
            <Form.Select
              isValid={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            >
              <option value="">Select an occupation</option>
              {occupations.map((occ, i) => {
                return (
                  <option key={i} value={occ}>
                    {occ}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mt-5">
            <Form.Label htmlFor="registerState">State</Form.Label>
            <Form.Select
              isValid={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="">Select a state</option>
              {states.map((state) => {
                return (
                  <option
                    key={state.abbreviation}
                    value={JSON.stringify(state)}
                  >
                    {state.abbreviation + " - " + state.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <Button
            className="mt-5"
            disabled={!name || !email || !password || !occupation || !state}
            onClick={() => submitForm()}
          >
            Create Account
          </Button>
        </Form>
      </Col>
      <Col></Col>
    </Row>
  );
}
