
import {useState, useEffect} from 'react';
import {useNavigate, useLocation, Link} from 'react-router-dom';
import {Box, Container, Button, Table, TableBody, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import useStyles from './styles'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const Students = () => {
    const classes = useStyles();

    const navigate = useNavigate();
    const location = useLocation();
    
    const axiosPrivate = useAxiosPrivate();

    const [students, setStudents] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        setLoading(true)

        const getStudents = async() => {
            try {
                const {data} = await axiosPrivate.get('/students',
                {signal:controller.signal}
                );
                isMounted && setStudents(data.student);
                setLoading(false)
            }catch(err) { 
              if(err?.response?.status === 401) {
                  navigate('/login', {state: {from: location}, replace: true})
              }
              
            }
        }

        getStudents();

        return () => {
          isMounted = false;
          controller.abort();
        }
    }, []);

    const handleDelete = async(id) => {
      setLoading(true)
      try {
        const response = await axiosPrivate.delete(`/students/${id}`);
        if(response.status === 200) {
          const newStudents = students.filter(student => student._id !== id);
          setStudents(newStudents);
          setLoading(false);
        }

      } catch(e) {
        console.log(e)
      }
    }

    const handleAdd = () => {
      navigate('/student/add')
    }
    return (
    <Box component="div">
      <Container>
        <Box className={classes.root} component="div">
          <Button className={classes.btnSuccess} onClick={handleAdd}>Add Student</Button>
          {/* if loading is === true */}
          {(isLoading) && 'loading ...'}
          {
            (students.length > 0  && !isLoading) ? (
              <Box component="div" mt={1}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell align="left">Name</StyledTableCell>
                        <StyledTableCell align="left">Lastname</StyledTableCell>
                        <StyledTableCell align="left">Actions</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {students.map((student) => (
                        <StyledTableRow key={student._id}>
                          <StyledTableCell component="th" scope="row">
                            {student._id}
                          </StyledTableCell>
                          <StyledTableCell align="left">{student.name}</StyledTableCell>
                          <StyledTableCell align="left">{student.lastName}</StyledTableCell>
                          <StyledTableCell align="left">
                            <Button className={classes.btnDelete} onClick={() => handleDelete(student._id)} fontWeight='fontWeightLight'>
                              <AiFillDelete /> Delete
                            </Button>
                            <Button className={classes.btnSuccess} fontWeight='fontWeightLight'>
                              <Link to={`/student/${student._id}`} style={{textDecoration: 'none', color: 'white'}}>
                                <AiFillEdit color="#fff"/> Edit
                              </Link>
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            ) : "No data"
          }
        </Box>
      </Container>
    </Box>  
  )
}

export default Students;