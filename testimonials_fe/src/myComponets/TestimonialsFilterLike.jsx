import React from 'react'
import { Label } from "@/components/ui/label"
// import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


const TestimonialsFilterLike = ({filterLiked, setFilterLiked}) => {
    return (
        <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="like" className="text-left">
                Liked
            </Label>
            <RadioGroup defaultValue={filterLiked} className="flex flex-row items-start gap-2">
                {/* className="grid grid-rows-1 gap-2" */}
                <div className="col-start-2 flex items-center space-x-2">
                    <RadioGroupItem value="Both" id="r1" className="p-0" onClick={() => setFilterLiked('Both')} />
                    <Label htmlFor="r1">Both</Label>
                </div >

                <div className="col-start-2 flex items-center space-x-2">
                    <RadioGroupItem value="Yes" id="r2" className="p-0" onClick={() => setFilterLiked('Yes')} />
                    <Label htmlFor="r2">Yes</Label>
                </div >

                <div className="col-start-2 flex items-center space-x-2">
                    <RadioGroupItem value="No" id="r3" className="p-0" onClick={() => setFilterLiked('No')} />
                    <Label htmlFor="r3">No</Label>
                </div >
            </RadioGroup>
        </div >
    )
}

export default TestimonialsFilterLike