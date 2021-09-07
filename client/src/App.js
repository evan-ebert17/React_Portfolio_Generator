import React, {useState, useEffect} from 'react';
import './App.css';
import './Portfolio.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Portfolio from './components/Portfolio/index';
// import AboutMeForm from './components/Forms/AboutMeForm';
// import SkillsForm from './components/Forms/SkillsForm';
import EducationForm from './components/Forms/EducationForm';
// import Sidebar from './components/Sidebar/sidebar';
import Conditionals from './components/Sidebar/sidebarConditionals';
// import ContactForm from './components/Forms/ContactForm';
// import ProjectForm from './components/Forms/ProjectForm';
// import ExperienceForm from './components/Forms/ExperienceForm';
// import MainPage from './components/MainPage/mainPage';
import Auth from './utils/auth';
import Public from './components/Portfolio/Public';



import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import ExperienceForm from './components/Forms/ExperienceForm';




export default function App() {

  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    let status=Auth.loggedIn()
    console.log(status)
    setLoggedIn(status)
  },[])

  const httpLink = createHttpLink({
    uri: "/graphql",
  });
  // Construct request middleware that will attach the JWT token to every request as an `authorization` header
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("id_token");
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
  const client = new ApolloClient({
    // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        {!isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/portfolio/:email" component={Public} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={Portfolio} />
            <Route exact path="/conditionals" component={Conditionals} />
            <Route exact path="/portfolio/:email" component={Public} />
          </Switch>
        )}
      </Router>
      {/* <Portfolio /> */}

      {/* <AboutMeForm/> */}
      {/* <ProjectForm/> */}
      {/* <SkillsForm/> */}
      {/* <ExperienceForm/> */}
      {/* <EducationForm/> */}
      {/* <ContactForm/> */}
      {/* <Conditionals /> */}
    </ApolloProvider>

    // <ApolloProvider client={client}>
    //    <Router>
    //      <div className="App">
    //        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
    //          <div className="container">
    //            <Link className="navbar-brand" to={"/sign-in"}>Portfolio-Maker</Link>
    //            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
    //              <ul className="navbar-nav ml-auto">
    //                <li className="nav-item">
    //                  <Link className="nav-link" to={"/sign-in"}>Login</Link>
    //                </li>
    //                <li className="nav-item">
    //                  <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
    //                </li>
    //              </ul>
    //            </div>
    //          </div>
    //        </nav>

    //        <div className="auth-wrapper">
    //          <div className="auth-inner">
    //            <Switch>
    //              <Route exact path='/' component={Login} />
    //              <Route path="/sign-in" component={Login} />
    //              <Route path="/sign-up" component={SignUp} />
    //            </Switch>
    //          </div>
    //        </div>
    //      </div>
    //   </Router>
    //  </ApolloProvider>
  );
}








// function App() {
//   return (
//     <>
//     <div className="App">
//       <h3>Build Sign Up & Login UI Template in React</h3>
//     </div>
//     <Navbar />
//     <Footer />
//     </>
//   );
// }

// export default App;


