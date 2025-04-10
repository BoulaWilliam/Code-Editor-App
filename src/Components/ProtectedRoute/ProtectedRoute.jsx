import { Navigate } from 'react-router-dom'
import { useContext } from 'react';
import { userContext } from './../../Contexts/UserContext/User.context';

export default function ProtectedRoute({ children }) {

    let {token} = useContext(userContext)
    if(token){
        return children
    }else{
        return <Navigate to="/login"/>
    }
}
