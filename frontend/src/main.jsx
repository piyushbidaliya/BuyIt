import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './route/routes.jsx'
import { store } from './store/store.jsx'
import { Provider } from 'react-redux'
import GlobalProvider from './provider/GlobalProvider'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GlobalProvider> 
      <RouterProvider router={routes} />
    </GlobalProvider>
  </Provider>
)
