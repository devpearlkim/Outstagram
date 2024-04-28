import { Navigate, Outlet, useLocation } from 'react-router-dom';
import PageLayout from './layouts/PageLayout/PageLayout';
import { useAuthStore } from './store/authStore.js';
function App() {
  const authUser = useAuthStore((state) => state.user);
  const { pathname } = useLocation();

  // 홈페이지 && 로그아웃 => 로그인 화면 이동
  if (pathname === '/' && !authUser) {
    return <Navigate to={'/auth'} />;
  }

  // 로그인페이지 && 로그인 => 홈으로 이동
  if (pathname === '/auth' && authUser) {
    return <Navigate to={'/'} />;
  }

  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}

export default App;
