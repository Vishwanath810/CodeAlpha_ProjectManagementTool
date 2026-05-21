import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);

    const [projectData, setProjectData] = useState({
        title: "",
        description: "",
    });
    const [taskData, setTaskData] = useState({
  title: "",
  description: "",
  projectId: "",
});
const [selectedProject, setSelectedProject] = useState("");

const [comments, setComments] = useState([]);

const [commentText, setCommentText] = useState("");

const [selectedTask, setSelectedTask] = useState("");

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/projects"
      );

      setProjects(res.data);

      if (res.data.length > 0) {
        fetchTasks(res.data[0]._id);
      }

    } catch (error) {

      console.log(error);

    }

  };

  const fetchTasks = async (projectId) => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/tasks/${projectId}`
      );

      setTasks(res.data);

      setSelectedProject(projectId);

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {

  setProjectData({
    ...projectData,
    [e.target.name]: e.target.value,
  });

};

const handleTaskChange = (e) => {

  setTaskData({
    ...taskData,
    [e.target.name]: e.target.value,
  });

};

const createProject = async (e) => {

  e.preventDefault();

  try {

    await axios.post(
      "http://localhost:5000/api/projects/create",
      projectData
    );

    alert("Project Created");

    fetchProjects();

    setProjectData({
      title: "",
      description: "",
    });

  } catch (error) {

    console.log(error);

  }

};

const createTask = async (e) => {

  e.preventDefault();

  try {

    await axios.post(
      "http://localhost:5000/api/tasks/create",
      {
        ...taskData,
        projectId: selectedProject,
      }
    );

    alert("Task Created");

    fetchTasks(selectedProject);

    setTaskData({
      title: "",
      description: "",
    });

  } catch (error) {

    console.log(error);

  }

};

const updateTaskStatus = async (taskId, status) => {

  try {

    await axios.put(
      `http://localhost:5000/api/tasks/update/${taskId}`,
      {
        status,
      }
    );

    fetchTasks(selectedProject);

  } catch (error) {

    console.log(error);

  }

};

const deleteTask = async (taskId) => {

  try {

    await axios.delete(
      `http://localhost:5000/api/tasks/${taskId}`
    );

    fetchTasks(selectedProject);

  } catch (error) {

    console.log(error);

  }

};

const deleteProject = async (projectId) => {

  try {

    await axios.delete(
      `http://localhost:5000/api/projects/${projectId}`
    );

    fetchProjects();

  } catch (error) {

    console.log(error);

  }

};

const fetchComments = async (taskId) => {

  try {

    const res = await axios.get(
      `http://localhost:5000/api/comments/${taskId}`
    );

    setComments(res.data);

    setSelectedTask(taskId);

  } catch (error) {

    console.log(error);

  }

};

const createComment = async (e) => {

  e.preventDefault();

  try {

    await axios.post(
      "http://localhost:5000/api/comments/create",
      {
        text: commentText,
        taskId: selectedTask,
      }
    );

    setCommentText("");

    fetchComments(selectedTask);

  } catch (error) {

    console.log(error);

  }

};

return (
  <div className="min-h-screen bg-gray-100">

  <nav className="bg-black text-white p-5 flex justify-between items-center">

    <h1 className="text-3xl font-bold">
      Project Management Tool 🚀
    </h1>

    <button
      onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      }}
      className="bg-red-500 px-5 py-2 rounded"
    >
      Logout
    </button>

  </nav>

  <div className="p-10">

    <h1 className="text-4xl font-bold mb-8">
      Dashboard 🚀
    </h1>

    {/* Create Project Form */}

    <form
      onSubmit={createProject}
      className="bg-white p-6 rounded-xl shadow mb-8"
    >

      <h2 className="text-2xl font-bold mb-4">
        Create Project
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Project Title"
        value={projectData.title}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4"
      />

      <textarea
        name="description"
        placeholder="Project Description"
        value={projectData.description}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4"
      />

      <button className="bg-black text-white px-6 py-3 rounded">
        Create Project
      </button>

    </form>

    {/* Create Task Form */}

    <form
      onSubmit={createTask}
      className="bg-white p-6 rounded-xl shadow mb-8"
    >

      <h2 className="text-2xl font-bold mb-4">
        Create Task
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={taskData.title}
        onChange={handleTaskChange}
        className="w-full border p-3 rounded mb-4"
      />

      <textarea
        name="description"
        placeholder="Task Description"
        value={taskData.description}
        onChange={handleTaskChange}
        className="w-full border p-3 rounded mb-4"
      />

      <button className="bg-black text-white px-6 py-3 rounded">
        Create Task
      </button>

    </form>

    <div className="grid grid-cols-2 gap-8">

      {/* Projects Section */}

      <div>

        <h2 className="text-2xl font-bold mb-4">
          Projects
        </h2>

        <div className="space-y-4">

          {projects.map((project) => (

            <div
              key={project._id}
              className="bg-white p-5 rounded-xl shadow cursor-pointer"
              onClick={() => fetchTasks(project._id)}
            >

              <h3 className="text-xl font-bold">
                {project.title}
              </h3>

              <p className="text-gray-600">
                {project.description}
              </p>

              <button
                onClick={(e) => {
                e.stopPropagation();
                deleteProject(project._id);
                }}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
>
                Delete
              </button>

            </div>

          ))}

        </div>

      </div>

      {/* Tasks Section */}

      <div>

        <h2 className="text-2xl font-bold mb-4">
          Tasks
        </h2>

        <div className="space-y-4">

          {tasks.map((task) => (

            <div
              key={task._id}
              className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl transition"        
            >

              <h3 className="text-xl font-bold mb-2">
                {task.title}
              </h3>

              <p className="text-gray-600 mb-4">
                {task.description}
              </p>

              <div className="flex items-center">

                <select
                  value={task.status}
                  onChange={(e) =>
                    updateTaskStatus(
                      task._id,
                      e.target.value
                    )
                  }
                  className="border p-2 rounded"
                >

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                </select>

                <button
                  onClick={() => fetchComments(task._id)}

                  className="ml-4 bg-black text-white px-4 py-2 rounded"
                >
                  Comments
                </button>
                <button
                    onClick={() => deleteTask(task._id)}
                    className="ml-4 bg-red-500 text-white px-4 py-2 rounded"
                    >
                    Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

    {/* Comments Section */}

    <div className="mt-10 bg-white p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-4">
        Comments
      </h2>

      <form
        onSubmit={createComment}
        className="mb-6"
      >

        <input
          type="text"
          placeholder="Add Comment"
          value={commentText}
          onChange={(e) =>
            setCommentText(e.target.value)
          }
          className="w-full border p-3 rounded mb-4"
        />

        <button className="bg-black text-white px-6 py-3 rounded">
          Add Comment
        </button>

      </form>

      <div className="space-y-4">

        {comments.map((comment) => (

          <div
            key={comment._id}
            className="bg-gray-100 p-4 rounded"
          >

            {comment.text}

          </div>

        ))}

      </div>

    </div>

  </div>
  </div>
);
}

export default Dashboard;