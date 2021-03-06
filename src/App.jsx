import React, { Component } from "react";
import classes from "./App.module.css";
import PersonsList from "./Components/PersonsList";
import Cockpit from "./Components/Cockpit";
import WithClass from "./hoc/WithClass";
import AuthContext from "./context/authContext";

class App extends Component {
  constructor(props) {
    super(props);
    console.log("[App.jsx], constructor");
  }

  state = {
    persons: [
      { id: 1, name: "Janko", age: 36 },
      { id: 2, name: "Helena", age: 28 },
      { id: 3, name: "Nikica", age: 29 },
    ],
    showPersons: false,
    showCockpit: true,
    counter: 0,
    authenticated: false,
  };

  static getDerivedStateFromProps(props, state) {
    console.log("[App.jsx], getDerivedStateFromProps", props);
    return state;
  }

  componentDidMount() {
    console.log("[App.jsx], componentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[App.jsx], shouldComponentUpdate");
    return true;
  }

  componentDidUpdate() {
    console.log("[App.jsx], componentDidUpdate");
  }

  loginHandler = () => {
    this.setState({ authenticated: true });
  };

  changeNameHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex],
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return {
        persons: persons,
        counter: prevState.counter + 1,
      };
    });
  };

  togglePersonsHandler = () => {
    const displayPersons = this.state.showPersons;
    this.setState({ showPersons: !displayPersons });
  };

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  render() {
    console.log("[App.jsx], rendering...");
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          <PersonsList
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.changeNameHandler}
          />
        </div>
      );
    }

    return (
      <>
        <button
          onClick={() => {
            this.setState({ showCockpit: false });
          }}
        >
          Remove Cockpit
        </button>
        <AuthContext.Provider
          value={{
            authenticated: this.state.authenticated,
            login: this.loginHandler,
          }}
        >
          {this.state.showCockpit ? (
            <Cockpit
              title={this.props.appTitle}
              persons={this.state.persons}
              showPersons={this.state.showPersons}
              clicked={this.togglePersonsHandler}
            />
          ) : null}
          {persons}
        </AuthContext.Provider>
      </>
    );
  }
}

export default WithClass(App, classes.App);
