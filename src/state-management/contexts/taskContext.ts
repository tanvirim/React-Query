import React from "react";
import { Task, TaskAction } from "../reducers/taskReducer";
import {Dispatch} from 'react'

interface  TaskContentType {

    tasks : Task[]
    dispatch: Dispatch<TaskAction>
}

const TasksContext = React.createContext<TaskContentType>({}as TaskContentType)

export default TasksContext