import AppView from '../views/AppView.jsx';
import {Container} from 'flux/utils';
import TodoActions from '../data/TodoActions.jsx';
import TodoDraftStore from '../data/TodoDraftStore.jsx';
import TodoEditStore from '../data/TodoEditStore.jsx';
import TodoStore from '../data/TodoStore.jsx';

function getStores() {
  return [
    TodoEditStore,
    TodoDraftStore,
    TodoStore,
  ];
}

function getState() {
  return {
    draft: TodoDraftStore.getState(),
    editing: TodoEditStore.getState(),
    todos: TodoStore.getState(),

    onAdd: TodoActions.addTodo,
    onDeleteCompletedTodos: TodoActions.deleteCompletedTodos,
    onDeleteTodo: TodoActions.deleteTodo,
    onEditTodo: TodoActions.editTodo,
    onStartEditingTodo: TodoActions.startEditingTodo,
    onStopEditingTodo: TodoActions.stopEditingTodo,
    onToggleAllTodos: TodoActions.toggleAllTodos,
    onToggleTodo: TodoActions.toggleTodo,
    onUpdateDraft: TodoActions.updateDraft,
  };
}

export default Container.createFunctional(AppView, getStores, getState);
