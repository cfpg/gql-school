import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./App.scss";

// Main Deps
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from "./containers/AppLayout";

// Containers
import IndexContainer from "./containers/IndexContainer";
import StudentsContainer from "./containers/StudentsContainer";
import TeachersContainer from "./containers/TeachersContainer";

function App() {
  const apolloClient = new ApolloClient({
    uri: "http://localhost:4141"
  });

  return (
    <Router>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Route path="/" exact component={IndexContainer} />

          <Route path="/students" component={StudentsContainer} />
          <Route path="/teachers" component={TeachersContainer} />
        </Layout>
      </ApolloProvider>
    </Router>
  );
}

export default App;
