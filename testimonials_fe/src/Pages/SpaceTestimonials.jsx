
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import TestimonialsFilter from '../myComponets/TestimonialsFilter'
import Test from '../myComponets/test'
import { useNavigate } from "react-router-dom"
import TestimonialsCard from '../myComponets/TestimonialsCard'

const SpaceTestimonials = ({ spaceId, spaceName }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterLiked, setFilterLiked] = useState('Both');
    const [filterStarRating, setFilterStarRating] = useState({
        1: true,
        2: true,
        3: true,
        4: true,
        5: true
    });
    return (
        <div className='grid grid-cols-4 gap-2 py-2 px-1'>
            <Input
                className="col-span-2"
                type="email"
                placeholder="Search Testimonials"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Sheet >
                <Button className="col-span-1" onClick={() => { navigate(`/space/new?id=${spaceId}`) }}>Add Testimonial</Button>
                <SheetTrigger asChild>
                    <Button className="col-span-1">Filter</Button>
                    {/* variant="default" */}
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Filter Testimonials</SheetTitle>
                        <SheetDescription>
                            Filter Testimonials based on the following fields.
                        </SheetDescription>
                    </SheetHeader>
                    <Separator className="my-4" />
                    <SheetClose asChild>
                        <TestimonialsFilter
                            filterLiked={filterLiked}
                            setFilterLiked={setFilterLiked}
                            filterStarRating={filterStarRating}
                            setFilterStarRating={setFilterStarRating}
                        />
                    </SheetClose>
                </SheetContent>
            </Sheet>
            {/* <div></div> */}
            <div className='col-span-4 pt-4 px-44'>
                <TestimonialsCard
                    spaceId={spaceId}
                    searchTerm={searchTerm}
                    filterLiked={filterLiked}
                    filterStarRating={filterStarRating}
                />
            </div>
        </div>
    )
}

export default SpaceTestimonials