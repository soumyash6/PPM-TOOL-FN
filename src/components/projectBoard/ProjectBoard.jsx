import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import Backlog from "./Backlog";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "../../actions/backlogActions";

class ProjectBoard extends Component {
    constructor() {
        super();
        this.state = {
            errors: {}
        };
    }

    componentDidMount() {
        const { id } = this.props.params;
        this.props.getBacklog(id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    render() {
        const { id } = this.props.params;
        const { project_tasks = [] } = this.props.backlog; // Ensure project_tasks is an array
        const { errors } = this.state;

        let boardContent;

        const boardAlgol = (errors, project_tasks) => {
            if (project_tasks.length < 1) {
                if (errors.projectnotFound) {
                    return (
                        <div className="alert alert-danger text-center" role="alert">
                            {errors.projectnotFound}
                        </div>
                    );
                } else {
                    return (
                        <div className="alert alert-danger text-center" role="alert">
                            No Project Task On This Board
                        </div>
                    );
                }
            } else {
                return <Backlog project_tasks={project_tasks}></Backlog>;
            }
        };

        boardContent = boardAlgol(errors, project_tasks);

        return (
            <div className="container">
                <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Create Project Task</i>
                </Link>
                <br />
                <hr />
                {boardContent}
                <div className="container"></div>
            </div>
        );
    }
}

ProjectBoard.propTypes = {
    backlog: PropTypes.object.isRequired,
    getBacklog: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    backlog: state.backlog,
    errors: state.errors
});

const ProjectBoardWithParams = props => {
    const params = useParams();
    return <ProjectBoard {...props} params={params} />;
};

export default connect(mapStateToProps, { getBacklog })(ProjectBoardWithParams);