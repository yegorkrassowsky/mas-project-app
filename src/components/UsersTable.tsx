import React from 'react'
import {connect} from 'react-redux'
import {UsersState, ThunkDispatchType, OpenTodosType, FilterUsersType} from '../types'
import {IState, IUserSet} from '../interfaces'
import {openTodosAction} from '../actions/todosActions'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

type UsersTableProps = {
  users: UsersState
  openTodos: OpenTodosType
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const UsersTable: React.FC<UsersTableProps> = ({users, openTodos}) => {
  const classes = useStyles()
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="Users table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Website</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow key={row.id} onClick={() => openTodos({id: row.id, name: row.name})}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.website}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const includesIgnoringCase = (string: string, includes:string) => {
  return string.toLowerCase().includes(includes.toLowerCase())
}

const filterUsers: FilterUsersType = (users, params) => {
  return users.filter(user => {
    if(params.username && ! includesIgnoringCase(user.username, params.username)) {
      return false
    }
    if(params.website && ! includesIgnoringCase(user.website, params.website)) {
      return false
    }
    return true
  })
}

const mapStateToProps = (state: IState) => ({
  users: state.filter.active ? filterUsers(state.users, state.filter.params) : state.users
})

const mapDispatchToProps = (dispatch: ThunkDispatchType) => ({
  openTodos: (user: IUserSet) => dispatch(openTodosAction(user)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable)