import React from 'react'
import {
    LinkIcon
} from '@heroicons/react/24/outline';
import { Link } from 'lucide-react';
import { Button } from "@/components/ui/button"

const SpaceLink = ({ handleClick }) => {
    return (
        <div>
            <Button variant="secondary" onClick={handleClick}>
                <div className='flex flex-row-reverse gap-2'>
                    Link
                    {/* <LinkIcon className='w-5' /> */}
                    <Link className='w-4' />
                </div>
            </Button>
        </div>
    )
}

export default SpaceLink