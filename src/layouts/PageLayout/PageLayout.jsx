import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';

export default function PageLayout({ children }) {
  const { pathname } = useLocation();
  return (
    <Flex>
      {/* 왼쪽: 사이드바 */}
      {pathname === '/auth' ? null : (
        <Box w={{ base: '70px', md: '240px' }}>
          <Sidebar />
        </Box>
      )}
      {/* 오른쪽: 콘텐츠 */}
      <Box flex={1} w={{ base: 'calc(100% - 70px)', md: 'calc(100%-240px)' }}>
        {children}
      </Box>
    </Flex>
  );
}
