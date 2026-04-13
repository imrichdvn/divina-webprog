import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Home Structure
import Layout from './components/Layout';
import ArticlePage from './pages/ArticlePage';
import ArticleListPage from './pages/ArticleListPAge';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

import NotFoundPage from './pages/NotFoundPage';


const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      // This shows the list of all articles
      { path: 'articles', element: <ArticleListPage /> },
      // This shows a single article. Note the :name parameter!
      { path: 'articles/:name', element: <ArticlePage /> },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
