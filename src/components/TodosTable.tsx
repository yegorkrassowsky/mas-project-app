import React from 'react'
import {ITodos} from '../interfaces'
import {OpenEditTodoType} from '../types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined'
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

type TodosTableProps = {
  openEditTodo: OpenEditTodoType
} & ITodos

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    marginBottom: '20px',
    '& .MuiTableRow-root': {
      cursor: 'pointer',
    }
  },
  statusColumn: {
    width: '78px',
    textAlign: 'right',
  }
}))

const TodosTable: React.FC<TodosTableProps> = ({todos, openEditTodo}) => {
  const classes = useStyles()
  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table size="small" aria-label="Todos table">
        <TableHead>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell className={classes.statusColumn}>Статус</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((row) => (
            <TableRow key={row.id} onDoubleClick={() => openEditTodo(row)}>
              <TableCell>{row.description}</TableCell>
              <TableCell className={classes.statusColumn}>{row.status === 5 ? <CheckBoxOutlinedIcon/> : <CheckBoxOutlineBlankOutlinedIcon/>}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TodosTable