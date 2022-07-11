import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import {Container, Button, Typography} from '@mui/material';
import useStyles from './styles';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Homepage = () => {
  const classes = useStyles(); 
  const [isLoading, setLoading] = useState(false)
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
    <Container>
      <Typography variant="h3" className={classes.homeTitle}>Welcome back, {data.userName}</Typography>
      <Link className={classes.link} to="/student">
        <Button className={classes.btnStudent}>All student</Button>
      </Link>
    </Container>
  )
}

export default Homepage