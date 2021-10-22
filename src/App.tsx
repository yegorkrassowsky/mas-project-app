import {Provider} from 'react-redux'
import {QueryClient, QueryClientProvider} from 'react-query'
import {store} from './store'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import UsersFilter from './components/UsersFilter'
import UsersTable from './components/UsersTable'
import TodosModal from './components/TodosModal'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <CssBaseline />
      <div className="App">
        <Container maxWidth="lg">
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <UsersFilter />
              <UsersTable />
              <TodosModal />
            </QueryClientProvider>
          </Provider>
        </Container>
      </div>
    </>
  )
}

export default App
