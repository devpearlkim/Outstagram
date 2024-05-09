/**
 * @jest-environment jsdom
 */

import { expect, test } from '@jest/globals';
import { render } from '@testing-library/react';
// // import { StaticRouter } from 'react-router-dom/server';
import ProfileHeader from '../components/Profile/ProfileHeader';

test('displays a default thumbnail', async () => {
  const profileHeader = render(<ProfileHeader />);

  const profileThumbnail = await profileHeader.findByTestId('thumbnail');
  expect(profileThumbnail).toContain('none.jpg');
});
