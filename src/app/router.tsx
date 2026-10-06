import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import LandingPage from '../pages/LandingPage'
import ExamPage from '../pages/ExamPage'
import PracticePage from '../pages/PracticePage'
import FailuresPage from '../pages/FailuresPage'
import HistoryPage from '../pages/HistoryPage'
import ResultPage from '../pages/ResultPage'
import PrivacidadPage from '../pages/PrivacidadPage'
import AcercaDePage from '../pages/AcercaDePage'
import NotFoundPage from '../pages/NotFoundPage'

/**
 * Rutas de la aplicación.
 *
 * /simulacro, /practica y /fallos: motor de examen.
 * /historial y /resultado/:id: resultados, revisión e informe PDF.
 */
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <LandingPage /> },
      {
        path: 'simulacro',
        element: <ExamPage />,
      },
      {
        path: 'practica',
        element: <PracticePage />,
      },
      {
        path: 'fallos',
        element: <FailuresPage />,
      },
      {
        path: 'historial',
        element: <HistoryPage />,
      },
      {
        path: 'resultado/:id',
        element: <ResultPage />,
      },
      { path: 'privacidad', element: <PrivacidadPage /> },
      { path: 'acerca-de', element: <AcercaDePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
