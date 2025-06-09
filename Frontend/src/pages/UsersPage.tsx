import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { User, UserFormData } from "../types";
import { getUsers, createUser, updateUser, deleteUser } from "../services/api";

// Componentes de UI que esta página orquestra
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";
import Modal from "../components/Modal";

const UsersPage: React.FC = () => {
  // --- Estados para gerenciar a página ---
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Começa como true para mostrar o loading inicial
  const [error, setError] = useState<string | null>(null);

  // Estados para o modal de criação/edição
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Hook para navegação programática
  // const navigate = useNavigate();

  // --- Lógica de busca de dados ---
  const fetchUsers = async () => {
    try {
      // Reinicia os estados de erro e loading a cada busca
      setError(null);
      setIsLoading(true);
      const response = await getUsers();
      setUsers(response.data);
    } catch (err) {
      setError("Falha ao carregar usuários. Tente novamente mais tarde.");
      console.error(err);
    } finally {
      // Garante que o loading seja desativado ao final, com sucesso ou erro
      setIsLoading(false);
    }
  };

  // Efeito para buscar os dados quando o componente é montado pela primeira vez
  useEffect(() => {
    fetchUsers();
  }, []);

  // --- Funções manipuladoras de eventos (Handlers) ---

  const handleOpenModal = (user: User | null) => {
    setEditingUser(user); // Se user for null, é um novo usuário. Se não, é edição.
    setIsUserModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsUserModalOpen(false);
    setEditingUser(null);
  };

  const handleUserSubmit = async (userData: UserFormData) => {
    try {
      if (editingUser?.id) {
        // Se há um usuário em edição, atualiza
        await updateUser(editingUser.id, userData);
      } else {
        // Senão, cria um novo
        await createUser(userData);
      }
      fetchUsers(); // Recarrega a lista de usuários após a operação
      handleCloseModal(); // Fecha o modal
    } catch (err: any) {
      alert(`Erro ao salvar usuário: ${err.message}`);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (
      window.confirm(
        "Tem certeza que deseja deletar este usuário? Esta ação não pode ser desfeita."
      )
    ) {
      try {
        await deleteUser(userId);
        fetchUsers(); // Recarrega a lista
      } catch (err: any) {
        alert(`Erro ao deletar usuário: ${err.message}`);
      }
    }
  };

  // Handler para navegar para a página de tarefas do usuário
  const handleViewUserTasks = (user: User) => {
    console.log(`Visualizando tarefas do usuário: ${user.name}`);
    // navigate(`/users/${user.id}`);
  };

  // --- Renderização ---

  if (isLoading) {
    return (
      <p className="text-center text-blue-500 mt-10 text-lg">
        Carregando usuários...
      </p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10 text-lg">{error}</p>;
  }

  return (
    <div>
      {/* O componente inteligente (UsersPage) renderiza o componente de apresentação (UserList) */}
      <UserList
        users={users}
        onEditUser={(user) => handleOpenModal(user)}
        onDeleteUser={handleDeleteUser}
        onAddNewUser={() => handleOpenModal(null)}
        onViewUserTasks={handleViewUserTasks}
      />

      {/* O modal também é controlado por esta página */}
      <Modal
        isOpen={isUserModalOpen}
        onClose={handleCloseModal}
        title={editingUser ? "Editar Usuário" : "Adicionar Novo Usuário"}
      >
        <UserForm
          onSubmit={handleUserSubmit}
          initialData={
            editingUser
              ? { name: editingUser.name, email: editingUser.email }
              : undefined
          }
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default UsersPage;
