import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ToastContainer } from './components/ui/Toast'
import { HomePage } from './features/public/HomePage'
import { PublicPage } from './features/public/PublicPage'
import { NotFoundPage } from './features/public/NotFoundPage'
import { AppWorkspacePage } from './features/app/AppWorkspacePage'
import { appRouteSummaries, publicPages } from './content/publicContent'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {publicPages.map((page) => (
          <Route key={page.path} path={page.path} element={<PublicPage path={page.path} />} />
        ))}
        {appRouteSummaries.map((route) => (
          <Route key={route.path} path={route.path} element={<AppWorkspacePage />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
