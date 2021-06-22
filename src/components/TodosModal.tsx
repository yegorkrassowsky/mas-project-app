import React, {useState} from 'react'
import {connect} from 'react-redux'
import {IState, IActive, ITodos, IName} from '../interfaces'
import {ThunkDispatchType, CloseTodosType} from '../types'
import {TodosLabels, TodosStatuses} from '../constants'
import {closeTodosAction} from '../actions/todosActions'
import TodosTable from './TodosTable'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'


type TodosModalProps = {
  closeTodos: CloseTodosType
} & IActive & ITodos & IName

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttons: {
      marginTop: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
)

const TodosModal: React.FC<TodosModalProps> = ({active, todos, name, closeTodos}) => {
  const [statusFilter, setStatusFilter] = useState(0)
  const classes = useStyles()
  const filteredTodos = statusFilter === TodosStatuses.ALL ? todos : todos.filter(todo => {
    if (statusFilter === TodosStatuses.DONE && todo.completed) {
      return true
    }
    if(statusFilter === TodosStatuses.DOING && !todo.completed) {
      return true
    }
    return false
  })
  return (
    <Dialog open={active} onClose={closeTodos} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        <>Задачи {name}</>
        <div className={classes.buttons}>
          <ButtonGroup color="primary" aria-label="large outlined primary button group">
            {TodosLabels.map((status, index) => {
              return <Button
                key={index}
                onClick={() => setStatusFilter(index)}
                variant={index === statusFilter ? 'outlined' : 'contained'}>{status}
              </Button>
            })}
          </ButtonGroup>
        </div>
      </DialogTitle>
      <DialogContent>
        <TodosTable todos={filteredTodos} />
      </DialogContent>
    </Dialog>
  )
}

const mapStateToProps = (state: IState) => ({
  active: state.todos.active,
  todos: state.todos.items,
  name: state.todos.name,
})

const mapDispatchToProps = (dispatch: ThunkDispatchType) => ({
  closeTodos: () => dispatch(closeTodosAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(TodosModal)