import {Alert, Button, Typography} from '@mui/material'
import { useNavigate } from 'react-router-dom'

function Unauthorized(){
    const navigate = useNavigate()
    return (
    <>
    <Typography>You are not authorized to view this page. Please sign in again!</Typography>

    <Button onClick={()=>{navigate('/sign-in')}}>Redirect to sign in page</Button>
    </>
    )

}
export default Unauthorized