import React, {useState} from 'react'
import {useQuery} from 'react-query'
import {OpenTodosType, FilterParams} from '../types'
import {IUser} from '../interfaces'
import Loader from './Loader'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import {useGlobalState} from '../store'
import {request} from '../store'
import UsersFilter from './UsersFilter'

type UsersTableProps = {}

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

const defaultFilter = {
  username: '',
  website: '',
}

const UsersTable: React.FC<UsersTableProps> = () => {
  const {todos} = useGlobalState()
  const openTodos: OpenTodosType = ({userId, name}) => {
    todos.set({
      active: true,
      userId,
      name,
    })
  }
  const [filter, setFilter] = useState<FilterParams>(defaultFilter)
  const [filterActive, setFilterActive] = useState(false)
  const toggleFilter = () => setFilterActive(prev => !prev)
  const handleFilter = (filter: FilterParams) => setFilter(filter)
  const resetFilter = () => setFilter(defaultFilter)
  const { isLoading, isError, data, error } = useQuery<IUser[]>(['users', filter, filterActive], () => {
    return fetchUsers(filterActive ? filter : defaultFilter)
  })

  const classes = useStyles()
  if(isLoading) {
    return <Loader/>
  }

  if(isError) {
    return <p>{`Error on loading: ${error}`}</p>
  }

  return (
    <>
      <UsersFilter active={filterActive} toggleFilter={toggleFilter} setFilter={handleFilter} resetFilter={resetFilter} />
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
              <TableRow className={classes.row} key={row.id} onClick={() => openTodos({userId: row.id, name: row.name})}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.website}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default UsersTable