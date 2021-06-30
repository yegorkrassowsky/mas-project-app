import React from 'react'
import {connect} from 'react-redux'
import {ThunkDispatchType, OpenTodosType, FilterUsersType} from '../types'
import {IState, IUserSet, IUser, ILoading} from '../interfaces'
import {openTodosAction} from '../actions/todosActions'
import Loader from './Loader'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

type UsersTableProps = {
  users: IUser[]
  openTodos: OpenTodosType
} & ILoading

const useStyles = makeStyles({
  root: {
    marginBottom: '20px',
  },
  table: {
    minWidth: 650,
    '& .MuiTableCell-root': {
      width: '25%',
    }
  },
  row: {
    cursor: 'pointer',
  }
})

const UsersTable: React.FC<UsersTableProps> = ({loading, users, openTodos}) => {
  const classes = useStyles()
  if(loading) {
    return <Loader/>
  }
  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table className={classes.table} size="small" aria-label="Users table">
        <TableHead>
          <TableRow>
            <TableCell>Имя</TableCell>
            <TableCell>Должность</TableCell>
            <TableCell>Служебный телефон</TableCell>
            <TableCell>Мобильный телефон</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow className={classes.row} key={row.id} onClick={() => openTodos({id: row.id, name: row.name})}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.post}</TableCell>
              <TableCell>{row.phone ? row.phone : '-'}</TableCell>
              <TableCell>{row.mobile ? row.mobile : '-'}</TableCell>
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
    if(params.name && ! includesIgnoringCase(user.name, params.name)) {
      return false
    }
    if(params.post && ! includesIgnoringCase(user.post, params.post)) {
      return false
    }
    return true
  })
}

const mapStateToProps = (state: IState) => ({
  loading: state.users.loading,
  users: state.filter.active ? filterUsers(state.users.items, state.filter.params) : state.users.items
})

const mapDispatchToProps = (dispatch: ThunkDispatchType) => ({
  openTodos: (user: IUserSet) => dispatch(openTodosAction(user)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable)