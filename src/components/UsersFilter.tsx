import React, {useState} from 'react'
import {connect} from 'react-redux'
import {ThunkDispatchType, FilterParams, SetFilterType, ResetFilterType, ToggleFilterType} from '../types'
import {IState} from '../interfaces'
import {setFilterAction, resetFilterAction, toggleFilterAction} from '../actions/filterActions'
import Box from '@material-ui/core/Box'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    width: '100%',
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(1),
      width: '50ch',
      maxWidth: '100%',
    }
  },
  toggle: {
    marginLeft: '8px'
  },
  buttons: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))

type UsersFilterProps = {
  active: boolean
  setFilter: SetFilterType
  resetFilter: ResetFilterType
  toggleFilter: ToggleFilterType
}

const UsersFilter: React.FC<UsersFilterProps> = ({active, setFilter, resetFilter, toggleFilter}) => {
  const [username, setUsername] = useState('')
  const [website, setWebsite] = useState('')
  const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value)
  }
  const changeWebsite = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsite(e.currentTarget.value)
  }
  const handleReset = () => {
    resetFilter()
    setUsername('')
    setWebsite('')
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setUsername(prev => prev.trim())
    setWebsite(prev => prev.trim())
    setFilter({username, website})
  }
  const classes = useStyles()
  return (
    <Box my={2}>
      <Accordion expanded={active} onChange={toggleFilter}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
        <FormControlLabel
          className={classes.toggle}
          control={<Switch color="primary" checked={active} onClick={toggleFilter} />}
          label="Фильтр"
          labelPlacement="start"
          onClick={(event) => event.stopPropagation()}
          onFocus={(event) => event.stopPropagation()}
        />
        </AccordionSummary>
        <AccordionDetails>
          <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <TextField
                id="filter-username-input"
                label="Username"
                value={username}
                onChange={changeUsername}
              />
              <TextField
                id="filter-website-input"
                label="Website"
                value={website}
                onChange={changeWebsite}
              />
            </Grid>
            <Grid
              className={classes.buttons}
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <Button variant="contained" type="reset" onClick={handleReset}>Сбросить</Button>
              <Button variant="contained" color="primary" type="submit">Применить</Button>
            </Grid>
          </form>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

const mapStateToProps = (state: IState) => ({
  active: state.filter.active
})

const mapDispatchToProps = (dispatch: ThunkDispatchType) => ({
  setFilter: (params: FilterParams) => dispatch(setFilterAction(params)),
  resetFilter: () => dispatch(resetFilterAction()),
  toggleFilter: () => dispatch(toggleFilterAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersFilter)