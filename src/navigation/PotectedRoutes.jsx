import { Navigate} from 'react-router-dom'

export const ProtectedRoute = ({user, children}) => {   
    console.log(user)
    if(!user){
        return <Navigate to="/"/>
    }
    
    return children


}