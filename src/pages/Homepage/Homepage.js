import {useEffect, useState} from 'react'
import {Container, Typography, Grid, List, ListItem, ListItemText} from '@mui/material';
import Spinner from '../../components/Spinner/Spinner';
import useStyles from './styles';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Homepage = () => {
  const classes = useStyles(); 
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const controller = new AbortController();

    
    const getUser = async() => {
      try {
        const {data} = await axiosPrivate.get('/user',
        {signal:controller.signal});
        isMounted && setData(data);
        setLoading(false)

      }catch (e) {
        console.log(e)
      }
    }

    getUser();

    return () => {
      isMounted =  false;
      setLoading(false);
      controller.abort();
    }

  }, [])

  return (
    <Container className={classes.root}>
      {isLoading && (<Spinner />)}
      {
        (data && !isLoading) && (
          <>
            <Typography variant="h3" className={classes.homeTitle}>Welcome back, {data.userName}</Typography>
            <Typography variant="h4">What does the app do?🚀</Typography>
            <Grid container>
              <Grid item>
                <List>
                  <ListItem>
                    <ListItemText className={classes.txt}>🔥 Super admin can create, read, update and delete the student's data and also, super admin has a right to change the roles of every user.</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText className={classes.txt}>👤 Ordinary user can't visit the students and other protected routes.</ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText className={classes.txt}>👀 The editor can do CRUD operations in the student's route, but only the super admin does have access to user routes.</ListItemText>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </>
        )
      }
    </Container>
  )
}


export default Homepage;