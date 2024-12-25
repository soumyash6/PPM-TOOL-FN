import React, { Component } from "react";
import ProjectTask from "./ProjectTask/ProjectTask";
import PropTypes from "prop-types";

class Backlog extends Component {
    render() {
        const { project_tasks = [] } = this.props; // Ensure project_tasks is an array

        const tasks = project_tasks.map(project_task => (
            <ProjectTask
                key={project_task.id}
                project_task={project_task}
            ></ProjectTask>
        ));

        const progess_Tasks = [];
        const done_Tasks = [];
        const todo_Tasks = [];

        for (let index = 0; index < tasks.length; index++) {
            const element = tasks[index];
            if (element.props.project_task.status === "TO_DO") {
                todo_Tasks.push(element);
            }
            if (element.props.project_task.status === "IN_PROGRESS") {
                progess_Tasks.push(element);
            }
            if (element.props.project_task.status === "DONE") {
                done_Tasks.push(element);
            }
        }

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-secondary text-white">
                            <h3>TO DO</h3>
                        </div>
                    </div>
                    {todo_Tasks}
                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-primary text-white">
                            <h3>In Progress</h3>
                        </div>
                    </div>
                    {progess_Tasks}
                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-success text-white">
                            <h3>Done</h3>
                        </div>
                    </div>
                    {done_Tasks}
                </div>
            </div>
        );
    }
}

Backlog.propTypes = {
    project_tasks: PropTypes.array.isRequired
};

export default Backlog;