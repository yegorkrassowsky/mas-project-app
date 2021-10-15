import React from 'react'
import {connect} from 'react-redux'
import {useQuery} from 'react-query'
import {ThunkDispatchType, OpenTodosType, FilterParams, FilterUsersType} from '../types'
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
import {request} from '../store'

type UsersTableProps = {
  filter: FilterParams
  users: IUser[]
  openTodos: OpenTodosType
} & ILoading

type Params = {
  [key: string]: string
}

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

export const fetchUsers = async (args: any) => {  
  const [query, params] = args.queryKey
  return request.get('/users', {
    params
  })
    .then(response => {
      if(response.data !== undefined) {
        return response.data
      }
    })
}

const UsersTable: React.FC<UsersTableProps> = ({loading, users, openTodos, filter}) => {
  const params: Params = {}
  if(filter.username) params.username = filter.username
  if(filter.website) params.website = filter.website
  
  const { isLoading, isError, data, error } = useQuery<IUser[]>(['users', params], fetchUsers)
  
  const classes = useStyles()
  if(isLoading) {
    return <Loader/>
  }

  if(isError) {
    return <p>{`Error on loading: ${error}`}</p>
  }

  return (
    <TableContainer className={classes.root} component={Paper}>
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
          {data && data.map((row) => (
            <TableRow className={classes.row} key={row.id} onClick={() => openTodos({id: row.id, name: row.name})}>
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
  filter: state.filter.params,
  loading: state.users.loading,
  users: state.filter.active ? filterUsers(state.users.items, state.filter.params) : state.users.items
})

const mapDispatchToProps = (dispatch: ThunkDispatchType) => ({
  openTodos: (user: IUserSet) => dispatch(openTodosAction(user)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable)