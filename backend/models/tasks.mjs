// model for tasks
import mongoose from "mongoose";

const taskSchema = mongoose.Schema([{
    taskLabel: {
        type: String,
        required: true
    }
}]);

const taskModel = mongoose.model('tasks', taskSchema);

export default taskModel;