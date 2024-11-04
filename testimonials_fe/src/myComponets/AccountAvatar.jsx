import React, { useContext } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { userContext } from '../hooks/useContext'

const AccountAvatar = () => {
    const { user, setUser } = useContext(userContext);
    return (
        <>
            <HoverCard>
                <HoverCardTrigger>
                    <Avatar className="items-center justify-center">
                        <AvatarImage src={user.picture} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </HoverCardTrigger>
                <HoverCardContent>
                    Name: {user.name}
                    <br />
                    Email: {user.email}
                </HoverCardContent>
            </HoverCard></>
    )
}

export default AccountAvatar