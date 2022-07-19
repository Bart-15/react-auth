import {useState, useEffect} from 'react';
import useAxiosPrivate from  '../../hooks/useAxiosPrivate';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {Container, Typography, Paper, Box, Checkbox, FormControlLabel} from '@mui/material';

const EditUser = ({roles}) => {
    let { id } = useParams();

    const navigate = useNavigate();
    const location = useLocation();

    const axiosPrivate = useAxiosPrivate();

    const [data, setData] = useState({});
    const [userRoles, setUserRoles] = useState({});
    const [isLoading, setLoading] = useState(false);

    const [adminChecked, setAdminChecked] = useState(false);
    const [editorChecked, setEditorChecked] = useState(false);
    const [userChecked, setUserChecked] = useState(false);

    useEffect(() => {
        // check if there's an ID and isValid === true
        if(id){
          if(id.length === 24 &&  !isNaN(Number('0x' + id))){
              return;
          } else {
            navigate(-1)
          }
        }
      }, [])

      //fetch user data;
      useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        setLoading(true);

        const getUser = async() => {
            try {
                const {data} = await axiosPrivate(`/user/${id}`,
                {signal:controller.signal}
                );
                setLoading(false);
                if(isMounted) {
                    setData(data)
                    setUserRoles(data?.roles); 
                    setUserChecked(data?.roles?.User ? true : false);
                    setAdminChecked(data?.roles?.Admin ? true : false)
                    setEditorChecked(data?.roles?.Editor ? true : false)
                }
                
            } catch (err) {
                if(err?.response?.status === 401) {
                    navigate('/login', {state: {from: location}, replace: true})
                } 
            }
        }

        getUser();

        // clean up func
        return () => {
            isMounted =  false;
            controller.abort();
        }

      }, [])


    
        
    const fetchRoles = (roles) => {
        let result = [];
        for(let x in roles) {
        result.push(x);
        }

        return result.join(', ');
    }


    useEffect(() => {
        if(adminChecked){
            let newRoles = Object.assign({}, userRoles, {"Admin": 5000});
            setUserRoles(newRoles);
        } else {
           setUserRoles(current => {
            const copy = {...current};
            delete copy['Admin'];
            return copy;
           })
        }

    }, [adminChecked])

    useEffect(() => {
        if(editorChecked){
            let newRoles = Object.assign({}, userRoles, {"Editor": 4000});
            setUserRoles(newRoles);
        } else {
           setUserRoles(current => {
            const copy = {...current};
            delete copy['Editor'];
            return copy;
           })
        }

    }, [editorChecked])

    useEffect(() => {
        if(userChecked){
            let newRoles = Object.assign({}, userRoles, {"User": 5000});
            setUserRoles(newRoles);
        } else {
           setUserRoles(current => {
            const copy = {...current};
            delete copy['Editor'];
            return copy;
           })
        }

    }, [userChecked])

    console.log("####userRoles", userRoles)
    return ( 
        <>
            <Container>
                <Typography variant="h3">Edit roles</Typography>
                {
                    (!data || isLoading) ? "Loading ..." : (
                        <Paper elevation={12} component="div">
                           <Box component="div">
                               <Typography variant="subtitle1">Username: {data?.userName}</Typography>
                               <Typography variant="subtitle1">Email: {data?.email}</Typography>
                               <Typography variant="subtitle1">Current Role: {fetchRoles(data?.roles)}</Typography>

                               <Box component="div">
                               <FormControlLabel 
                                  disabled={true}
                                  control={<Checkbox
                                      checked={userChecked}
                                      onChange={() => setUserChecked(!userChecked)}
                                  />}
                                  label="User"
                                  labelPlacement="end"
                               /> <br />
                               <FormControlLabel 
                                  control={<Checkbox 
                                      checked={adminChecked}
                                      onChange={() => setAdminChecked(!adminChecked)}
                                  />}
                                  label="Admin"
                                  labelPlacement="end"
                               /> <br />
                                <FormControlLabel 
                                  control={<Checkbox 
                                      checked={editorChecked}
                                      onChange={() => setEditorChecked(!editorChecked)}
                                  />}
                                  label="Editor"
                                  labelPlacement="end"
                               /> 
                               </Box>
                           </Box>
                        </Paper>
                    )
                }
            </Container>
        </>
     );
}
 
export default EditUser;