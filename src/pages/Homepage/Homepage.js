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
      <Typography variant="h4">What does the app do?</Typography>
      <Typography variant="subtile1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>


    </Container>
  )
}

export default Homepage;