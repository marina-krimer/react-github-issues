import store from '../store/configureStore'
import * as actions from '../actions/logOnActions'


export const logOnUserChanged = value => {
  store.dispatch(actions.setLogOnUser(value))
}


export const logOnRepositoryChanged = (params) => {
  store.dispatch(actions.setLogOnRepository(params))
}
