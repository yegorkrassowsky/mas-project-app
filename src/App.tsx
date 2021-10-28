import {QueryClient, QueryClientProvider} from 'react-query'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import UsersTable from './components/UsersTable'
import TodosModal from './components/TodosModal'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <CssBaseline />
      <div className="App">
        <Container maxWidth="lg">
          <QueryClientProvider client={queryClient}>
            <UsersTable />
            <TodosModal />
          </QueryClientProvider>
        </Container>
      </div>
    </>
  )
}

export default App
