/** 제스트에서 환경변수 읽어오는 문제 -> vitest */
import { expect, test } from 'vitest';
import SuggestedUser from '../components/SuggestedUsers/SuggestedUser';
import { StaticRouter } from 'react-router-dom/server';
import { render } from '@testing-library/react';

test('displays a default thumbnail', async () => {
  const suggestedUser = render(
    <StaticRouter>
      <SuggestedUser />
    </StaticRouter>
  );

  const userThumbnail = await suggestedUser.findByTestId('thumbnail');
  expect(userThumbnail.src).toContain('none.jpg');
  suggestedUser.unmount();
});

test('displays a non-default thumbnail', async () => {
  const suggestedUser = render(
    <StaticRouter>
      <SuggestedUser user={{ profilePicURL: 'something.jpg' }} />
    </StaticRouter>
  );

  const userThumbnail = await suggestedUser.findByTestId('thumbnail');
  expect(userThumbnail.src).toContain('something.jpg');
  suggestedUser.unmount();
});
