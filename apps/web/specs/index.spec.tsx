import { render } from '@testing-library/react';
import client, { Session } from "next-auth/client";
import React from 'react';

import Index from '../pages/index';

jest.mock("next-auth/client");

describe('Index', () => {
  it('should render successfully', () => {
    const mockSession: Session = {
      expires: "1",
      user: { email: "john@doe.com", name: "John Doe" },
    };

    (client.useSession as jest.Mock).mockReturnValueOnce([mockSession, false]);

    const { baseElement } = render(<Index />);
    expect(baseElement).toBeTruthy();
  });
});
