import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Navbar from '../../components/Navbar/Navbar';

export default function PageLayout({ children }) {
  const pathname = useLocation();
  const user = useAuthStore((state) => state.user);
  const renderSidebar = pathname !== '/auth' && user;
  const renderNavbar = pathname !== '/auth' && !user;

  return (
    <Flex flexDir={renderNavbar ? 'column' : 'row'}>
      {/* 왼쪽: 사이드바 */}
      {renderSidebar ? (
        <Box w={{ base: '70px', md: '240px' }}>
          <Sidebar />
        </Box>
      ) : null}
      {/* Nav */}
      {renderNavbar ? <Navbar /> : null}
      {/* 오른쪽: 콘텐츠 */}
      <Box
        flex={1}
        w={{ base: 'calc(100% - 70px)', md: 'calc(100%-240px)' }}
        mx={'auto'}
      >
        {children}
      </Box>
    </Flex>
  );
}
