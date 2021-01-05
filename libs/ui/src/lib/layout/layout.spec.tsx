import { render } from '@testing-library/react';
import React from 'react';

import Layout from './layout';

describe('Layout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Layout session={{}}>Hello World</Layout>);
    expect(baseElement).toBeTruthy();
  });
});
