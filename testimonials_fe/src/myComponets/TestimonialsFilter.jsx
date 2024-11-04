import React from 'react'
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import TestimonialsFilterRating from './TestimonialsFilterRating'
import TestimonialsFilterLike from './TestimonialsFilterLike'
import useToast from '../hooks/useToast'
import { SheetClose } from "@/components/ui/sheet"

const TestimonialsFilter = ({ filterLiked, setFilterLiked, filterStarRating, setFilterStarRating, isSocial = false }) => {

    const myToast = useToast()
    const handleApplyFilter = () => {
        myToast({
            title: "Filter Applied",
            description: "Your filter has been applied",
            duration: 10000,
        });
    }

    return (

        <div className='flex flex-col jus'>
            {/* <ScrollArea className="h-4/5 w-100 rounded-md border"> */}

            {/* className="grid gap-4 py-4" */}
            {!isSocial &&
                <>
                    <TestimonialsFilterRating
                        filterStarRating={filterStarRating}
                        setFilterStarRating={setFilterStarRating}
                    />
                    <Separator className="col-span-2 my-4" />
                </>
            }
            <TestimonialsFilterLike
                filterLiked={filterLiked}
                setFilterLiked={setFilterLiked}
            />
            <div className='flex flex-row-reverse gap-4 py-4'>
                <SheetClose asChild>
                    <Button className="col-span-1" onClick={handleApplyFilter}>
                        Apply Filter
                        {/* <Button variant="secondary">Clear Filter</Button> */}
                    </Button>
                </SheetClose>
            </div>
            {/* </ScrollArea> */}
        </div >
    )
}

export default TestimonialsFilter