import React, {useState} from 'react'
import {connect} from 'react-redux'
import {IState, IActive, ITodos, IName, ILoading, ITodoForm} from '../interfaces'
import {ThunkDispatchType, CloseTodosType, HandlePriorityType, HandleStatusType, HandleDescriptionType, SaveTodoType} from '../types'
import {TodosLabels, TodosStatuses} from '../constants'
import {closeTodosAction, saveTodoAction} from '../actions/todosActions'
import TodosTable from './TodosTable'
import TodoModal from './TodoModal'
import Loader from './Loader'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

type TodosModalProps = {
  closeTodos: CloseTodosType
  saveTodo: SaveTodoType
} & IActive & ITodos & IName & ILoading

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiDialog-paper': {
        flex: 1,
        height: '90%',
      },
    },
    heading: {
      marginTop: '12px'
    },
    buttons: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    addBtn: {
      display: 'flex',
      justifyContent: 'center',
    },
    empty: {
      textAlign: 'center'
    }
  }),
)

const TodosModal: React.FC<TodosModalProps> = ({loading, active, todos, name, closeTodos, saveTodo}) => {
  const [statusFilter, setStatusFilter] = useState(0)
  const classes = useStyles()
  const filteredTodos = statusFilter === TodosStatuses.ALL ? todos : todos.filter(todo => {
    if (statusFilter === TodosStatuses.DONE && todo.status === 5) {
      return true
    }
    if(statusFilter === TodosStatuses.DOING && todo.status !== 5) {
      return true
    }
    return false
  })
  const [editActive, setEditActive] = useState(false)
  const openTodoEdit = () => setEditActive(true)
  const closeTodoEdit = () => setEditActive(false)
  const defaults = {
    id: '',
    description: '',
    status: 1,
    priority: '0',
  }
  const [todoId, setTodoId] = useState(defaults.id)
  const [description, setDescription] = useState(defaults.description)
  const handleDescription: HandleDescriptionType = (event) => {
    setDescription(event.target.value)
  }
  const [status, setStatus] = useState(defaults.status)
  const handleStatus: HandleStatusType = (event) => {
    setStatus(event.target.checked ? 5 : 1)
  }
  const [priority, setPriority] = useState(defaults.priority)
  const handlePriority: HandlePriorityType = (event) => {
    setPriority(event.target.value as string)
  }
  const openAddModal = () => {
    setTodoId(defaults.id)
    setDescription(defaults.description)
    setStatus(defaults.status)
    setPriority(defaults.priority)
    openTodoEdit()
  }
  const openEditModal = ({id, description, status, priority}: ITodoForm) => {
    setTodoId(id!)
    setDescription(description)
    setStatus(status)
    setPriority(priority)
    openTodoEdit()
  }
  const handleSave = () => {
    const todo: ITodoForm = {description: description.trim(), status, priority}
    if(todoId){
      todo.id = todoId
    }
    saveTodo(todo)
    closeTodoEdit()
  }

  return (
    <Dialog className={classes.root} open={active} onClose={closeTodos} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
          wrap="nowrap"
        >
          <Typography className={classes.heading} variant="body1">Задачи {name}</Typography>
          <IconButton aria-label="close" onClick={closeTodos}>
            <CloseIcon />
          </IconButton>
        </Grid>
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
        <div className={classes.addBtn}>
          <IconButton aria-label="add" onClick={openAddModal}>
            <AddIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        {loading ? <Loader/> : filteredTodos.length > 0 ? <TodosTable todos={filteredTodos} openEditTodo={openEditModal} /> : <Typography className={classes.empty}>Задач нет</Typography>}
        <TodoModal
          onClose={closeTodoEdit}
          active={editActive}
          id={todoId}
          description={description}
          status={status}
          priority={priority}
          handleDescription={handleDescription}
          handleStatus={handleStatus}
          handlePriority={handlePriority}
          handleSave={handleSave}
        />
      </DialogContent>
    </Dialog>
  )
}

const mapStateToProps = (state: IState) => ({...state.todos, todos: state.todos.items})

const mapDispatchToProps = (dispatch: ThunkDispatchType) => ({
  closeTodos: () => dispatch(closeTodosAction()),
  saveTodo: (todo: ITodoForm) => dispatch(saveTodoAction(todo))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodosModal)