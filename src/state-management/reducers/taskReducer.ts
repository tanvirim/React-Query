export interface Task {
    id: number;
    title: string;
  }


  interface AddTask  {
    type: 'ADD_ITEM';
    task: Task ;

  }

  interface DeleteTask {
    type: 'DELETE_ITEM' ;
    taskId : number ;
  }

export  type TaskAction = AddTask | DeleteTask
  

const taskReducer =(tasks : Task[] , action: TaskAction): Task[] =>{

    switch(action.type){
        case 'ADD_ITEM':
            return [...tasks , action.task]

        case 'DELETE_ITEM' :
            return tasks.filter(t=> t.id != action.taskId )

        default :
        return tasks
    }


}

export default taskReducer