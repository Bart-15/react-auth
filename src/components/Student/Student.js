
import {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {Box, Typography} from '@mui/material';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Student = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getStudents = async() => {
            try {
                const {data} = await axiosPrivate.get('/students',
                {signal:controller.signal}
                );
                console.log("####data",data)
                isMounted && setStudents(data);
            }catch(err) { 
              console.log(err);
              // navigate('/login', {state: {from: location}, replace: true})
              
            }
        }

        getStudents();

        return () => {
          isMounted = false;
          controller.abort();
        }
    }, [])

  return (
    <Box component="div">
      {students.length === 0 ? "No data" : (
        <Typography variant="text">Fetch me now</Typography>
      )}
    </Box>  
  )
}

export default Student