import { useOutletContext } from 'react-router-dom';
import ProfileCard from '../../components/ProfileCard';
const PersonalInfo = () => {
    const [{ user, handleLogout, setUser }] = useOutletContext();
    // const handleDelete = () => {
    //     axios.delete('http://localhost:8080/api/user', {
    //         headers: {
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`
    //         }
    //     }).then((res) => {
    //         console.log(res);
    //         handleLogout();
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // }
    return (
    <>
        <ProfileCard {...{ user, handleLogout, setUser }} />
    </>
    )

}
export default PersonalInfo;