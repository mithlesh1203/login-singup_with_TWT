import React, { useEffect, useState } from 'react';
import { Button, Input, Select } from 'antd';
import { api } from '../../Api';

const { Option } = Select;

function UserTodo() {
    const [tasks, setTasks] = useState([]);
    const [taskData, setTaskData] = useState({
        startDate: '',
        endDate: '',
        desc: '',
        status: 'pending',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleStatusChange = (value) => {
        setTaskData((prevData) => ({ ...prevData, status: value }));
    };

    const handleSubmit = async () => {
        if (!taskData.startDate || !taskData.endDate || !taskData.desc) {
            console.log('All fields are required.');
            return;
        }

        // Check if startDate is less than endDate
        const startDate = new Date(taskData.startDate);
        const endDate = new Date(taskData.endDate);

        if (startDate >= endDate) {
            console.log('Start date must be before end date.');
            return;
        }

        try {
            const response = await api.post('/daily-task-detail', taskData);
            if (response.status === 200) {
                getTodo()
            } else {
                console.log('Invalid response:', response);
            }
        } catch (error) {
            console.error('Error during task creation:', error);
        }

        setTaskData({
            startDate: '',
            endDate: '',
            desc: '',
            status: 'pending',
        });
    };
    const getTodo = async () => {
        const response = await api.get('/daily-todo-detail');
        setTasks(response.data)
    }


    useEffect(() => {
        getTodo()
    }, [tasks]);

    return (
        <div className="app-container">
            <h2>Todo App</h2>
            <div className="task-form">
                <div>
                    <label>Start Date:</label>
                    <Input
                        type="date"
                        name="startDate"
                        value={taskData.startDate}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <Input
                        type="date"
                        name="endDate"
                        value={taskData.endDate}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <Input name="desc" value={taskData.desc} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Status:</label>
                    <Select value={taskData.status} onChange={handleStatusChange}>
                        <Option value="done">Done</Option>
                        <Option value="pending">Pending</Option>
                        <Option value="in progress">In Progress</Option>
                        <Option value="completed">Completed</Option>
                    </Select>
                </div>
                <div className="button-container">
                    <Button type="primary" onClick={handleSubmit}>
                        Add Task
                    </Button>
                </div>
            </div>
            <div className="task-list">
                <h3>Task List</h3>
                {tasks.map((task, index) => (
                    <div key={index} className="task-item">
                        <div>
                            <strong>Start Date:</strong> {task.startDate}
                        </div>
                        <div>
                            <strong>End Date:</strong> {task.endDate}
                        </div>
                        <div>
                            <strong>Description:</strong> {task.desc}
                        </div>
                        <div>
                            <strong>Status:</strong> {task.status}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserTodo;
