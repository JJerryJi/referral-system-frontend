import {Alert, Button} from '@mui/material'
import { useNavigate } from 'react-router-dom'

function Unauthorized(){
    const navigate = useNavigate()
    return (
    <>
    <Alert severity='error'>You are not authorized to view this page. Please sign in again!</Alert>
    <Button onClick={()=>{navigate('/sign-in')}}>Redirect to sign in page</Button>
    </>
    )

}
export default Unauthorized