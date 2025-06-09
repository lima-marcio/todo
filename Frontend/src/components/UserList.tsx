import React from "react";
import type { User } from "../types";
import UserItem from "./UserItem";

interface UserListProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: number) => void;
  onAddNewUser: () => void;
  onViewUserTasks: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  onEditUser,
  onDeleteUser,
  onAddNewUser,
  onViewUserTasks,
}) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Gerenciador de Usuários
        </h1>
        <button
          onClick={onAddNewUser}
          className="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 shadow-sm"
        >
          Adicionar Novo Usuário
        </button>
      </div>

      {users.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          Nenhum usuário cadastrado.
        </p>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              onEdit={onEditUser}
              onDelete={onDeleteUser}
              onViewTasks={onViewUserTasks}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
