import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../actions/SecurityAction";
import PropTypes from "prop-types";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [user, setUser] = useState({
        username: "",
        fullName: "",
        password: "",
        confirmPassword: "",
        errors: {}
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const errors = useSelector(state => state.errors);
    const security = useSelector(state => state.security);

    useEffect(() => {
        if (security.validToken) {
            navigate("/dashboard");
        }
    }, [security, navigate]);

    useEffect(() => {
        if (errors) {
            setUser(prevState => ({ ...prevState, errors }));
            setIsSubmitting(false); // Re-enable the button if there are errors
        }
    }, [errors]);

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = e => {
        e.preventDefault();
        setIsSubmitting(true); // Disable the button on submit
        const newUser = {
            username: user.username,
            fullName: user.fullName,
            password: user.password,
            confirmPassword: user.confirmPassword
        };

        dispatch(createUser(newUser, navigate));
    };

    return (
        <div className="register">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">Create your Account</p>
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className={classnames("form-control form-control-lg", {
                                        "is-invalid": user.errors.fullName
                                    })}
                                    placeholder="Full Name"
                                    name="fullName"
                                    value={user.fullName}
                                    onChange={onChange}
                                />
                                {user.errors.fullName && (
                                    <div className="invalid-feedback">{user.errors.fullName}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className={classnames("form-control form-control-lg", {
                                        "is-invalid": user.errors.username
                                    })}
                                    placeholder="Email Address (Username)"
                                    name="username"
                                    value={user.username}
                                    onChange={onChange}
                                />
                                {user.errors.username && (
                                    <div className="invalid-feedback">{user.errors.username}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className={classnames("form-control form-control-lg", {
                                        "is-invalid": user.errors.password
                                    })}
                                    placeholder="Password"
                                    name="password"
                                    value={user.password}
                                    onChange={onChange}
                                />
                                {user.errors.password && (
                                    <div className="invalid-feedback">{user.errors.password}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className={classnames("form-control form-control-lg", {
                                        "is-invalid": user.errors.confirmPassword
                                    })}
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    value={user.confirmPassword}
                                    onChange={onChange}
                                />
                                {user.errors.confirmPassword && (
                                    <div className="invalid-feedback">
                                        {user.errors.confirmPassword}
                                    </div>
                                )}
                            </div>
                            <input
                                type="submit"
                                className="btn btn-info btn-block mt-4"
                                disabled={isSubmitting}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

Register.propTypes = {
    createUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
};

export default Register;