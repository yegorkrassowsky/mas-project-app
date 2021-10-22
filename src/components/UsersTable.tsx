import React from 'react'
import {connect} from 'react-redux'
import {useQuery} from 'react-query'
import {ThunkDispatchType, OpenTodosType, FilterParams} from '../types'
import {IState, IUserSet, IUser} from '../interfaces'
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
  openTodos: OpenTodosType
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

export const fetchUsers = async (filter: FilterParams): Promise<IUser[]> => {  
  const params = Object.fromEntries(Object.entries(filter).filter(value => !!value[1]))
  console.log('FETCHING USERS');
  
  return request.get('/users', {
    params
  })
    .then(response => {
      if(response.data === undefined) {
        throw new Error('Error on fetching')
      }
      return response.data
    })
}

const UsersTable: React.FC<UsersTableProps> = ({openTodos, filter}) => {
  const { isLoading, isError, data, error } = useQuery<IUser[]>(['users', filter], () => {
    return fetchUsers(filter)
  })

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

const mapStateToProps = (state: IState) => ({
  filter: state.filter.params,
})

const mapDispatchToProps = (dispatch: ThunkDispatchType) => ({
  openTodos: (user: IUserSet) => dispatch(openTodosAction(user)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable)