import axios from "../axios"; // Import the configured Axios instance
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import { jwtDecode } from 'jwt-decode';

export const createUser = (newUsr, history) => async dispatch => {
    var config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        await axios.post("/api/users/register", newUsr, config);
        history.push("/login");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response ? err.response.data : { error: "An error occurred" }
        });
    }
};

export const login = LoginRequest => async dispatch => {
    try {
        // post => Login Request
        const res = await axios.post("/api/users/login", LoginRequest);
        // extract token from res.data
        const { token } = res.data;
        // store the token in the localStorage
        localStorage.setItem("jwtToken", token);
        // set our token in header ***
        setJWTToken(token);
        // decode token on React
        const decoded = jwtDecode(token);
        // dispatch to our securityReducer
        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response ? err.response.data : { error: "An error occurred" }
        });
    }
};

export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setJWTToken(false);
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    });
};