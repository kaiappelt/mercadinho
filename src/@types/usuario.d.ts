export interface IUser {
  nome: string;
  foto: string;
  id: number;
  valor: number;
  unidade: number;
}

export type UserContextType = {
  user: IUser[];
  saveTodo: (user: IUser) => void;
  updateTodo: (id: number) => void;
};
