import { useParams } from 'react-router-dom';
import ProfileCard from '../../components/ProfileCard';
import { UserContext } from "../../Contexts/userContext";
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
const PersonalInfo = () => {

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
    const [profileUser, setProfileUser] = useState();
    const params = useParams();
    const context = useContext(UserContext);


    useEffect(() => {
        context.username && params.username !== context.username && axios.get(`http://localhost:8080/api/user/${params.username}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                setProfileUser(res.data);
            }).catch((err) => {
                console.log(err);
            })

    }, [context, params.username])

    return (
        <>
            <ProfileCard  {...(params.username !== context.username) ? profileUser : context} currentOwner={params.username === context.username} />
        </>
    )

}
export default PersonalInfo;