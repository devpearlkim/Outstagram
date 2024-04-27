import { Outlet } from 'react-router-dom';
import PageLayout from './layouts/PageLayout/PageLayout';

function App() {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}

export default App;
