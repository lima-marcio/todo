// import React, { useState, useEffect } from "react";
// import type { Task } from "../types";
// import {
//   getTasksByUser,
//   createTask,
//   updateTask,
//   deleteTask,
// } from "../services/api";
// import TaskItem from "./TaskItem";
// import TaskForm from "./TaskForm";
// import Modal from "./Modal"; // Ajuste o caminho conforme necessário

// interface TaskListProps {
//   userId: string;
//   userName?: string;
// }

// const TaskList: React.FC<TaskListProps> = ({ userId, userName }) => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingTask, setEditingTask] = useState<Task | null>(null);

//   const fetchTasks = async () => {
//     if (!userId) return;
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await getTasksByUser(userId);
//       setTasks(response.data);
//     } catch (err) {
//       setError("Falha ao carregar tarefas.");
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, [userId]);

//   const handleOpenModal = (task: Task | null) => {
//     setEditingTask(task);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setEditingTask(null);
//   };

//   const handleTaskSubmit = async (taskData: Omit<Task, "id" | "userId">) => {
//     try {
//       if (editingTask?.id) {
//         await updateTask(editingTask.id, taskData);
//       } else {
//         await createTask({ ...taskData, userId: parseInt(userId, 10) });
//       }
//       fetchTasks();
//       handleCloseModal();
//     } catch (err: any) {
//       alert(`Erro ao salvar tarefa: ${err.message}`);
//     }
//   };

//   const handleDeleteTask = async (taskId: number) => {
//     if (window.confirm("Tem certeza que deseja deletar esta tarefa?")) {
//       try {
//         await deleteTask(taskId);
//         fetchTasks();
//       } catch (err: any) {
//         alert(`Erro ao deletar tarefa: ${err.message}`);
//       }
//     }
//   };

//   if (isLoading)
//     return (
//       <p className="text-center text-blue-500 mt-10">Carregando tarefas...</p>
//     );
//   if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

//   return (
//     <div className="p-4 border border-gray-300 rounded-lg shadow-md mt-6 bg-gray-50">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-semibold text-gray-800">
//           Tarefas de {userName || "Usuário"}
//         </h2>
//         <button
//           onClick={() => handleOpenModal(null)}
//           className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
//         >
//           Adicionar Nova Tarefa
//         </button>
//       </div>
//       {tasks.length === 0 ? (
//         <p className="text-gray-600">Nenhuma tarefa encontrada.</p>
//       ) : (
//         <div className="space-y-3">
//           {tasks.map((task) => (
//             <TaskItem
//               key={task.id}
//               task={task}
//               onEdit={() => handleOpenModal(task)}
//               onDelete={handleDeleteTask}
//             />
//           ))}
//         </div>
//       )}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         title={editingTask ? "Editar Tarefa" : "Adicionar Tarefa"}
//       >
//         <TaskForm
//           onSubmit={handleTaskSubmit}
//           initialData={
//             editingTask
//               ? {
//                   title: editingTask.title,
//                   description: editingTask.description,
//                   completed: editingTask.completed,
//                 }
//               : undefined
//           }
//           onCancel={handleCloseModal}
//         />
//       </Modal>
//     </div>
//   );
// };

// export default TaskList;
