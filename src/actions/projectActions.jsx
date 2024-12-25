import axios from "axios";
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from "./types";
import { useNavigate } from "react-router-dom";

export const createProject = (project, navigate) => async dispatch => {
    try {
        await axios.post("/api/project", project);
        navigate("/dashboard");
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

export const getAllProject = () => async dispatch => {
    try {
        const res = await axios.get("/api/project/All");
        dispatch({
            type: GET_PROJECTS,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: GET_PROJECTS,
            payload: error.response ? error.response.data : { error: "An error occurred" }
        });
    }
};

export const getProject = (id, navigate) => async dispatch => {
    try {
        const res = await axios.get(`/api/project/${id}`);
        dispatch({
            type: GET_PROJECT,
            payload: res.data
        });
    } catch (error) {
        navigate("/dashboard");
    }
};

export const deleteProject = id => async dispatch => {
    if (window.confirm("Are you sure?")) {
        try {
            await axios.delete(`/api/project/${id}`);
            dispatch({
                type: DELETE_PROJECT,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: GET_ERRORS,
                payload: err.response ? err.response.data : { error: "An error occurred" }
            });
        }
    }
};