import React, { useState, useEffect } from 'react'
import { Tweet } from 'react-tweet'
import {
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import SocialAddTestimonial from '../myComponets/SocialAddTestimonial';
import SocialCards from '../myComponets/SocialCards';
import TestimonialsFilter from '../myComponets/TestimonialsFilter';
// import { get } from 'http';

const SpaceSocial = ({ spaceId }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterLiked, setFilterLiked] = useState('Both');
    // const [tweetList, setTweetList] = useState([]);

    const [xCardId, setXCardId] = useState([]);
    const [filteredCardValue, setFilteredCardValue] = useState([]);

    useEffect(() => {
        getXTestimonialsBySpaceId(spaceId);
    }, []);

    const getXTestimonialsBySpaceId = async (spaceId) => {
        try {
            console.log("siojn");

            const response = await fetch(`http://localhost:3000/api/getAllTestimonialsBySpaceId?spaceId=${spaceId}&type=x`);
            const data = await response.json();
            setXCardId(data);
        } catch (err) {
            // t
            console.log(err);
        }
    }

    async function createXTestimonials(tweetId) {
        try {
            const response = await fetch("http://localhost:3000/api/createXTestimonials", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    spaceId: spaceId,
                    xId: tweetId,
                })
            });
            const data = await response.json();
            console.log(data);
            getXTestimonialsBySpaceId(spaceId);
        }
        catch (err) {
            console.log(err);
        }
    }


    async function getReactVercelTweet(tweetId, newReq = false) {
        try {
            if (newReq) {
                createXTestimonials(tweetId);
            }
            const response = await fetch(`https://react-tweet.vercel.app/api/tweet/${tweetId}`);
            const data = await response.json();
            // console.log(data.data);
            // getXTestimonialsBySpaceId(spaceId);
            return data.data;

        }
        catch (e) {
            console.log(e);
        }
    }


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
                <SheetTrigger asChild>
                    <Button className="col-span-1">Add Testimonial</Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Add Testimonials</SheetTitle>
                        <SheetDescription>
                            Add Testimonials from Twitter.
                        </SheetDescription>
                    </SheetHeader>
                    <Separator className="my-4" />
                    <SheetClose asChild>
                        <SocialAddTestimonial getReactVercelTweet={getReactVercelTweet} />
                    </SheetClose>
                </SheetContent>
            </Sheet>
            <Sheet className="bg-blue-100">
                <SheetTrigger asChild>
                    <Button className="col-span-1">Filter Testimonial</Button>
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
                            isSocial={true}
                        />
                    </SheetClose>
                </SheetContent>
            </Sheet>
            <div className='col-span-4 pt-4 px-44'>
                <SocialCards
                    xCardId={xCardId}
                    getReactVercelTweet={getReactVercelTweet}
                    searchTerm={searchTerm}
                    filterLiked={filterLiked}
                />
                {/* {xCardValue.map((tweetId, index) => ( */}
                {/* <Tweet
                        // key={index}
                        id="1838774450994450682"
                    /> */}
                {/* ))} */}
            </div>
        </div>
        // <div>iSpaceIntegrations</div>
        // <div className='flex flex-row items-center justify-center p-4'>
        //     <Button className="col-span-1">Add Integration</Button>
        // </div>
    )
}

export default SpaceSocial