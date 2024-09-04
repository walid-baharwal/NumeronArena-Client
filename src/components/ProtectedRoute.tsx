import { useTypedSelector } from '@/store/store';
import React,{useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authentication = true} : {children?: React.ReactNode, authentication?: boolean}) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useTypedSelector(state => state.auth.status)

    useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigate('/auth/signin');
        }
        else if(!authentication && authStatus !== authentication){
            navigate('/');
        }
        setLoader(false)
  
    }, [navigate,authStatus, authentication])
    
  return loader ? <h1></h1> :<> {children}</>
}

