import React from 'react'
import {CloseTodosType, HandlePriorityType, HandleStatusType, HandleDescriptionType, HandleSaveTodoType} from '../types'
import {IStatus, IDescription, IPriority} from '../interfaces'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiBackdrop-root': {
        background: 'transparent',
      },
      '& .MuiDialog-paper': {
        flex: 1,
        width: '80%',
        height: '300px',
        maxWidth: '520px',
      },
    },
    priority: {
      display: 'flex',
    }
}))

type TodoModalProps = {
  onClose: CloseTodosType
  active: boolean
  handleDescription: HandleDescriptionType
  handleStatus: HandleStatusType
  handlePriority: HandlePriorityType
  handleSave: HandleSaveTodoType
  id?: string | null
} & IStatus & IPriority & IDescription

const TodoModal: React.FC<TodoModalProps> = ({onClose, active, description, status, priority, handleDescription, handleStatus, handlePriority, handleSave, id = null}) => {
  const classes = useStyles()
  const titleText = id ? 'Редактировать задачу' : 'Новая задача'
  const descriptionError = description.trim().length === 0
  return (
    <Dialog className={classes.root} open={active} onClose={onClose} aria-labelledby="form-dialog-edit-title">
      <DialogTitle id="form-dialog-title">{titleText}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="todo-title"
          label="Название"
          type="text"
          fullWidth
          value={description}
          error={descriptionError}
          helperText={descriptionError ? 'Пожалуйста, заполните поле' : ''}
          onChange={handleDescription}
        />
        {id &&
          <FormControlLabel
            control={
            <Checkbox
              checked={status === 5}
              onChange={handleStatus}
              color="primary"
            />
            }
            label="Выполнено"
          />
        }
        <FormControl className={classes.priority}>
          <InputLabel id="todo-priority-label">Приоритет</InputLabel>
          <Select
            labelId="todo-priority-label"
            id="todo-priority"
            value={priority}
            onChange={handlePriority}
          >
            <MenuItem value={0}>Без приоритета</MenuItem>
            <MenuItem value={1}>Низкий</MenuItem>
            <MenuItem value={2}>Средний</MenuItem>
            <MenuItem value={3}>Высокий</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Отмена</Button>
        <Button onClick={handleSave} color="primary" disabled={descriptionError}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  )
}

export default TodoModal