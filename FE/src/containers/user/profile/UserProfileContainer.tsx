import React, { useState } from 'react'
import UserProfile from '../../../components/user/profile/UserProfile'
import { selectUser } from '../../../features/users'
import { useSelector } from 'react-redux'

export default function UserProfileContainer() {
    const [buttonState, setIsMyInfoOn] = useState<string>('info')
    const stateHandler = (section: string) => { setIsMyInfoOn(section) }
    const loginUser = useSelector(selectUser)
    console.log(loginUser)
    return <UserProfile buttonState={buttonState} stateHandler={stateHandler} />
}
