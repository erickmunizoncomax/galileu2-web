import { BrowserRouter, Route, Routes } from 'react-router-dom'
import routes from './routes'

const appApiUrl = import.meta.env.VITE_APP_API_URL;
console.log(appApiUrl);

const App = () => {
  return (
    <Routes>
      {
        routes.map((route, index) => (
          <Route key={index}
                 path={route.path}
                 element={route.element} />
        ))
      }
    </Routes>
  )
}

const ApplicationWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

export default ApplicationWrapper
