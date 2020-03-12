import React from 'react'

const Profile = ({authUser}) => {
    console.log(authUser)
    return(
        <div>nickname: {authUser.nickname}</div>
    )
}

export default Profile