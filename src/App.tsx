import {Provider} from 'react-redux'
import {store} from './store'
import {fetchUsers} from './actions/usersActions'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import UsersFilter from './components/UsersFilter'
import UsersTable from './components/UsersTable'
import TodosModal from './components/TodosModal'

store.dispatch(fetchUsers())

function App() {
  return (
    <>
      <CssBaseline />
      <div className="App">
        <Container maxWidth="lg">
          <Provider store={store}>
            <UsersFilter />
            <UsersTable />
            <TodosModal />
          </Provider>
        </Container>
      </div>
    </>
  )
}

export default App
