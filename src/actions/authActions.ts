import {LoginActionType} from '../types'
import {request} from '../store'
import {AuthActionTypes} from '../constants'
import {fetchUsers} from '../actions/usersActions'


// export const login: LoginActionType = (credentials) => {
//   return (dispatch) => {
//     sessionStorage.removeItem('token')
//     dispatch(setUsersLoading(true))
//     request.post(loginEndpoint, credentials)
//       .then(response => {
//         if(response.data.success !== undefined) {
//           sessionStorage.setItem('token', response.data.success.token)
//           dispatch({type: AuthActionTypes.LOGIN})
//           dispatch(fetchUsers())
//         }
//       })
//       .catch(err => {})
//       .then(() => dispatch(setUsersLoading(false)))
//   }
// }

