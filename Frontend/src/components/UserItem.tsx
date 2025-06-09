import React from "react";
import type { User } from "../types";

interface UserItemProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
  onViewTasks: (user: User) => void;
}

const UserItem: React.FC<UserItemProps> = ({
  user,
  onEdit,
  onDelete,
  onViewTasks,
}) => {
  return (
    <div className="p-4 border rounded-md bg-white shadow-sm flex justify-between items-center transition-shadow hover:shadow-md">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>
      <div className="space-x-2 flex-shrink-0">
        <button
          onClick={() => onViewTasks(user)}
          className="px-3 py-1 text-xs font-medium text-white bg-purple-500 rounded-md hover:bg-purple-600"
        >
          Ver Tarefas
        </button>
        <button
          onClick={() => onEdit(user)}
          className="px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="px-3 py-1 text-xs font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Deletar
        </button>
      </div>
    </div>
  );
};

export default UserItem;
