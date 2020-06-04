import React from "react";
import Context from "../context/context";
import { Link } from "react-router-dom";
import {
  Box,
  Header,
  Button,
  ResponsiveContext,
  Form,
  DropButton,
  Text,
  FormField,
  TextInput,
} from "grommet";
import { Cart, Menu } from "grommet-icons";
import Modal from "../modal/modal";
import "./Header.css";
import axios from "axios";

class Header1 extends React.Component {
  //This will enable the use of context-functions and states
  static contextType = Context;

  state = {
    showModal: false,
    username: "",
    email: "",
    password: "",

  };

  //To open modal call this function on a button
  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  handelInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  };

  resetInputFields = () => {
    this.setState({
      username: "",
      email: "",
      password: "",
    });
  };

  successfullyCreatedUser = () => {
    alert("You were successfully registered!");
  };

  submitRegister = (event) => {
    event.preventDefault();

    const inputValues = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };

    axios({
      url: "http://localhost:5000/register",
      method: "POST",
      data: inputValues,
    })
      .then(() => {
        this.resetInputFields();
        this.successfullyCreatedUser();
        this.toggleModal();
      })
      .catch(() => {
        alert("Username already taken, choose another one.");
      });
  };


  //Place modal-content in here
  get modal() {
    if (this.state.showModal) {
      return (
        <Modal>
          <Box
            style={{
              display: "flex",
              position: "absolute",
              left: "33vw",
              top: "25%",
            }}
            background="dark-1"
            width="30rem"
            height="30rem"
            align="center"
          >
            <Button onClick={() => {this.toggleModal()}}>Close</Button>
            <h1>Register</h1>
            <Form onSubmit={this.submitRegister}>
              <FormField label="Username">
                <TextInput 
                placeholder="type a username"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handelInputChange}
                required />
              </FormField>
              <FormField label="E-mail">
                <TextInput 
                placeholder="type your email"
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handelInputChange}
                required
                 />
              </FormField>
              <FormField label="Password">
                <TextInput 
                placeholder="type a password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handelInputChange}
                required 
                />
              </FormField>
              <Button
                label="Register"
                type="submit"
              ></Button>
            </Form>
          </Box>
        </Modal>
      );
    }
    return undefined;
  }

  render() {

    const renderItems = () => (
      <Box>
        <Text>
          <Link to="/"><Button>Home</Button></Link>
        </Text>
        <Text>
          <Link to="/"><Button>Login</Button></Link>
        </Text> 
        <Text>
          <Link to="/"><Button>Logout</Button></Link>
        </Text>
      </Box>
    )

    const MenuItem = () => (
      <Box height="36px" width="12px" align="center">
        <Menu color="white"/>
      </Box>
    )

    const HamburgerButton = () => (
      <DropButton
        alignSelf="center"
        margin={{ vertical: "small" }}
        dropContent={renderItems()}
        dropProps={{ align: { top: "bottom" } }}
      >
        <MenuItem />
      </DropButton>
    )

    return (
      <>
        <ResponsiveContext.Consumer>
          {(size) => (
            <Header
              justify="between"
              background="purple"
              pad="small"
              height="15rem"
            >
              <Box fill>
                <Box fill="vertical" width="xxsmall">
                  <HamburgerButton />
                  <Box flex />
              </Box>
              </Box>
              <Box>
                <Link to="/">
                <h1>Love Peace & Records</h1>
                </Link>
              </Box>
              <Box
                direction="row"
                align="center"
                justify="center"
                margin={{ left: "large" }}
              >
                <Cart color="plain" size="medium" />
                {size !== "small" && (
                  <Button
                    primary
                    margin="small"
                    color="dark-1"
                    label="Checkout"
                  ></Button>
                )}
                <Button
                  onClick={() => {
                    this.toggleModal();
                  }}
                  primary
                  label="Register"
                ></Button>
              </Box>
            </Header>
          )}
        </ResponsiveContext.Consumer>
        {this.modal}
      </>
    );
  }
}

export default Header1;
