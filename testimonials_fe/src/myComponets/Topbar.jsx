import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"


const Topbar = () => {
    return (
        <>
            <div className='w-full flex flex-row-reverse items-center p-4 gap-4'>
                <HoverCard>
                    <HoverCardTrigger>
                        <Avatar className="items-center justify-center">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </HoverCardTrigger>
                    <HoverCardContent>
                        Lorem Ipsum
                    </HoverCardContent>
                </HoverCard>
            </div >
        </>
    )
}

export default Topbar