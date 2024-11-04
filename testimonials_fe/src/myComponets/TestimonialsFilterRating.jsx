import React from 'react'
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

const TestimonialsFilterRating = ({ filterStarRating, setFilterStarRating }) => {
    return (
        <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="star" className="text-left row-start-3">
                Rating
            </Label>
            <div className="col-start-2 flex items-center space-x-2">
                <Checkbox id="5" className="p-0" checked={filterStarRating[5]} onClick={() => setFilterStarRating(prev => ({ ...prev, 5: !filterStarRating[5] }))}/>
                <label
                    htmlFor="5"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    5 Stars
                </label>
            </div>
            <div className="col-start-2 flex items-center space-x-2">
                <Checkbox id="4" className="p-0" checked={filterStarRating[4]} onClick={() => setFilterStarRating(prev => ({ ...prev, 4: !filterStarRating[4] }))} />
                <label
                    htmlFor="4"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    4 Stars
                </label>
            </div>
            <div className="col-start-2 flex items-center space-x-2">
                <Checkbox id="3" className="p-0" checked={filterStarRating[3]} onClick={() => setFilterStarRating(prev => ({ ...prev, 3: !filterStarRating[3] }))}/>
                <label
                    htmlFor="3"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    3 Stars
                </label>
            </div>
            <div className="col-start-2 flex items-center space-x-2">
                <Checkbox id="2" className="p-0" checked={filterStarRating[2]} onClick={() => setFilterStarRating(prev => ({ ...prev, 2: !filterStarRating[2] }))}/>
                <label
                    htmlFor="2"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    2 Stars
                </label>
            </div>
            <div className="col-start-2 flex items-center space-x-2">
                <Checkbox id="1" className="p-0" checked={filterStarRating[1]} onClick={() => setFilterStarRating(prev => ({ ...prev, 1: !filterStarRating[1] }))}/>
                <label
                    htmlFor="1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    1 Star
                </label>
            </div>
        </div>
    )
}

export default TestimonialsFilterRating