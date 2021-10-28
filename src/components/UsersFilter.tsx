import React, {useRef} from 'react'
import {SetFilterType, ResetFilterType, ToggleFilterType} from '../types'
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
  const username = useRef<HTMLInputElement>()
  const website = useRef<HTMLInputElement>()
  const handleReset = () => {
    resetFilter()
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFilter({
      username: username.current!.value,
      website: website.current!.value,
    })
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
                inputRef={username}
              />
              <TextField
                id="filter-website-input"
                label="Website"
                inputRef={website}
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

export default UsersFilter