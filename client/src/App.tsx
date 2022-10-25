import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import MainLayout from "./layouts/Main"
import Router from "./Router"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Router />
      </MainLayout>
    </QueryClientProvider>
  )
}
