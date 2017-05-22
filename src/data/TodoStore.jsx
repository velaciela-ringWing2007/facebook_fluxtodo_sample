import Counter from './Counter.jsx';
import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';
import Todo from './Todo.jsx';
import TodoActionTypes from './TodoActionTypes.jsx';
import TodoDispatcher from './TodoDispatcher.jsx';

class TodoStore extends ReduceStore {
  constructor() {
    super(TodoDispatcher);
  }

  getInitialState() {
    return Immutable.OrderedMap();
  }

  reduce(state, action) {
    switch (action.type) {
      case TodoActionTypes.ADD_TODO:
        // Don't add todos with no text.
        if (!action.text) {
          return state;
        }
        const id = Counter.increment();
        return state.set(id, new Todo({
          id,
          text: action.text,
          complete: false,
        }));

      case TodoActionTypes.DELETE_COMPLETED_TODOS:
        return state.filter(todo => !todo.complete);

      case TodoActionTypes.DELETE_TODO:
        return state.delete(action.id);

      case TodoActionTypes.EDIT_TODO:
        return state.setIn([action.id, 'text'], action.text);

      case TodoActionTypes.TOGGLE_ALL_TODOS:
        const areAllComplete = state.every(todo => todo.complete);
        return state.map(todo => todo.set('complete', !areAllComplete));

      case TodoActionTypes.TOGGLE_TODO:
        return state.update(
            action.id,
            todo => todo.set('complete', !todo.complete),
        );

      default:
        return state;
    }
  }
}

export default new TodoStore();
