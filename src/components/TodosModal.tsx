import React, {useState} from 'react'
import {connect} from 'react-redux'
import {IState, IActive, ITodo, IName} from '../interfaces'
import {ThunkDispatchType, CloseTodosType} from '../types'
import {TodosLabels, TodosStatuses} from '../constants'
import {closeTodosAction} from '../actions/todosActions'
import TodosTable from './TodosTable'
import Loader from './Loader'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {useQuery} from 'react-query'
import {request} from '../store'

type TodosModalProps = {
  userId: number
  closeTodos: CloseTodosType
} & IActive & IName

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
  }),
)

const fetchTodos = async (userId: number): Promise<ITodo[]> => {
  console.log('FETCHING TODOS');
  return request.get(`/user/${userId}/todos`)
    .then(response => {
      if(response.data === undefined) {
        throw new Error('Error on fetching')
      }
      return response.data
    })
}

const TodosModal: React.FC<TodosModalProps> = ({active, userId, name, closeTodos}) => {
  const [statusFilter, setStatusFilter] = useState(0)
  const classes = useStyles()
  const { isLoading, data = [], isError, error } = useQuery<ITodo[]>(['todos', userId], () => {
    return fetchTodos(userId)
  })

  const filteredTodos = statusFilter === TodosStatuses.ALL ? data : data.filter(todo => {
    if (statusFilter === TodosStatuses.DONE && todo.completed) {
      return true
    }
    if(statusFilter === TodosStatuses.DOING && !todo.completed) {
      return true
    }
    return false
  })
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
      </DialogTitle>
      <DialogContent>
        {isLoading ? <Loader/> : <TodosTable todos={filteredTodos} />}
        {isError && <p>{`Error on loading: ${error}`}</p>}
      </DialogContent>
    </Dialog>
  )
}

const mapStateToProps = (state: IState) => ({...state.todos})

const mapDispatchToProps = (dispatch: ThunkDispatchType) => ({
  closeTodos: () => dispatch(closeTodosAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(TodosModal)