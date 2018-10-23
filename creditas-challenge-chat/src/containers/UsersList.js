import { connect } from 'react-redux'
import UsersListComponent from '../components/UsersList'

export const UsersList = connect(state => ({
  users: state.users
}), {})(UsersListComponent)
