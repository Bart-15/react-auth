import {Outlet} from 'react-router-dom';
import {useState, useEffect} from 'react';
import useRefreshToken from '../../hooks/useRefreshToken';
import useAuth from '../../hooks/useAuth';
import {Spinner} from '../../components'
const PersistLogin = () => {
    const [isLoading, setLoading] = useState(true);
    const refresh = useRefreshToken();
    const {auth} = useAuth();


    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();

            }catch(error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setLoading(false);
    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`auth data: ${JSON.stringify(auth)}`);

    }, [isLoading]);



    return (
        <>
        {
            isLoading ? (<Spinner />) : <Outlet />
        }
        </>
    )
}

export default PersistLogin;