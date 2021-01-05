import { Layout } from '@boilerplate/ui';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useSession } from 'next-auth/client';
import React from 'react';

export default function Index() {
  const [ session, loading ] = useSession()

  return (
    <Layout session={session}>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js example
          </Typography>
        </Box>
      </Container>
    </Layout>
  );
}
