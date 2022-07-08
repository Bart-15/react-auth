import React from 'react'
import {Link} from 'react-router-dom';
import {Container, Button, Typography} from '@mui/material';
import Student from '../../components/Student/Student';
import useRefreshToken from '../../hooks/useRefreshToken';

const Homepage = () => {
  const refresh = useRefreshToken();
  return (
    <Container>
      <Typography variant="h3">Home Page</Typography>
      <Link to="/editor">
        <Button>Go to editor</Button>
      </Link>
      <Student />
      <Button onClick={() => refresh()}>Get me a new token</Button>
    </Container>
  )
}

export default Homepage