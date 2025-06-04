import { useUser } from '../context/user.context'
import { Navigate } from 'react-router'

export const ProtectedRoute = ({ children }) => {
    const { user } = useUser()
    if (!user.isLoggedIn) {
        return <Navigate to="/login" />
    }
    return (
        <>  {children}</>
    )
}
