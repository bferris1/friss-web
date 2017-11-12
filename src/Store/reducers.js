import { combineReducers } from 'redux'


const text = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TEXT':
      return [
        ...state,
        {
          text: action.text
        }
      ]
    default:
      return state
  }
}


const rootReducer = combineReducers({
  text
})

export default rootReducer
