import { useState, useEffect } from 'react';
import Web3 from 'web3';
import TodoListContract from '@/contracts/TodoList.json';

const Dashboard = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        await window.ethereum.enable();
        const provider = new Web3(window.ethereum);
        setWeb3(provider);

        const contractAddress = '0x699c4960351437d4D29F9B4dBf7D45d69102bB23'; // Replace with your actual contract address
        const todoListInstance = new provider.eth.Contract(
          TodoListContract,
          contractAddress
        );
        setContract(todoListInstance);

        const accounts = await provider.eth.getAccounts();
        setAccount(accounts[0]);

        loadTasks();
      } catch (error) {
        console.error(error);
      }
    };

    initWeb3();
  }, []);

  const loadTasks = async () => {
    if (contract) {
      const taskCount = await contract.methods.taskCount().call();
      const loadedTasks = [];

      for (let i = 1; i <= taskCount; i++) {
        const task = await contract.methods.tasks(i).call();
        loadedTasks.push(task);
      }

      setTasks(loadedTasks);
    }
  };

  const createTask = async () => {
    if (contract && taskInput && account) {
      await contract.methods.createTask(taskInput).send({ from: account });
      setTaskInput('');
      loadTasks();
    }
  };

  const deleteTask = async (taskId) => {
    if (contract && account) {
      await contract.methods.deleteTask(taskId).send({ from: account });
      loadTasks();
    }
  };

  const toggleTaskCompleted = async (taskId) => {
    if (contract && account) {
      await contract.methods.toggleTaskCompleted(taskId).send({ from: account });
      loadTasks();
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mt-8">Todo List</h1>
      <div className="mt-8">
        <div className="flex">
          <input
            type="text"
            placeholder="Enter task..."
            className="rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button
            className="px-4 bg-blue-500 text-white rounded-r-lg font-semibold uppercase tracking-wide hover:bg-blue-600"
            onClick={createTask}
          >
            Add Task
          </button>
        </div>
        <ul className="mt-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-2 border-b border-gray-200"
            >
              <span
                className={`flex-1 ${
                  task.completed ? 'line-through' : ''
                }`}
              >
                {task.content}
              </span>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded-lg font-semibold uppercase tracking-wide hover:bg-red-600"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
