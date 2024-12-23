import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes
import Addproject from "./components/Project/Addproject";
import { Provider } from "react-redux";
import store from "./store";
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/projectBoard/ProjectBoard";
import AddProjectTask from "./components/projectBoard/ProjectTask/AddProjectTask";
import UpdateProjectTask from "./components/projectBoard/ProjectTask/UpdateProjectTask";
import Loadingpage from "./components/Layout/Loadingpage";
import Register from "./components/Usermanagment/Register";
import Login from "./components/Usermanagment/Login";
import { jwtDecode } from 'jwt-decode'; import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/SecurityAction";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
    setJWTToken(jwtToken);
    const decoded_jwtToken = jwtDecode(jwtToken);
    store.dispatch({
        type: SET_CURRENT_USER,
        payload: decoded_jwtToken,
    });

    const currentTime = Date.now() / 1000;
    if (decoded_jwtToken.exp < currentTime) {
        //handle logout
        store.dispatch(logout());
        window.location.href = "/";
    }
}

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Header />
                    <Routes>
                        {
                            // Public Routes
                        }
                        <Route path="/" element={<Loadingpage />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />

                        {
                            // Private Routes
                        }
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/addProject" element={<Addproject />} />
                        <Route path="/updateProject/:id" element={<UpdateProject />} />
                        <Route path="/projectBoard/:id" element={<ProjectBoard />} />
                        <Route path="/addProjectTask/:id" element={<AddProjectTask />} />
                        <Route
                            path="/updateProjectTask/:backlog_id/:pt_id"
                            element={<UpdateProjectTask />}
                        />
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
