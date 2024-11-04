import React, { useState, useEffect } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Heart, Repeat2, CircleCheck } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import StarButton from '../myComponets/StarButton';
import Masonry from 'react-masonry-css';
import "../masonary.css";
import SocialTwitterCard from '../myComponets/SocialTwitterCard';
import SpaceSocial from './SpaceSocial';


const TestimonialGrid = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [xTestimonials, setXTestimonials] = useState([]);
    const [xCardId, setXCardId] = useState([]);
    // const [testimonial1, setTestimonial1] = useState([]);
    // const [testimonial2, setTestimonial2] = useState([]);
    // const [testimonial3, setTestimonial3] = useState([]);
    // const [testimonial4, setTestimonial4] = useState([]);
    const query = new URLSearchParams(location.search);
    const spaceId = query.get('spaceId');
    useEffect(() => {
        getLikedTestimonialsBySpaceId();
        getLikedXTestimonialsBySpaceId();
    }, []);

    useEffect(() => {
        getAllTweets();
    }, [xCardId]);

    async function getAllTweets() {
        const newCardValues = await Promise.all(
            xCardId.map(async (card) => {
                const temp = await getReactVercelTweet(card.xId, false);
                return {
                    id: card.id,
                    name: temp.user.name,
                    handle: "@" + temp.user.screen_name,
                    text: temp.text,
                    isVerified: temp.user.is_blue_verified,
                    picture: temp.user.profile_image_url_https,
                    xLikes: temp.favorite_count,
                    xRetweets: temp.conversation_count,
                    isLiked: card.isLiked,
                };
            })
        );
        setXTestimonials(newCardValues);
    }


    async function getReactVercelTweet(tweetId, newReq = false) {
        try {

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


    const getLikedTestimonialsBySpaceId = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/getLikedTestimonialsBySpaceId?spaceId=${spaceId}&type=text`);
            const data = await response.json();
            setTestimonials(data);
        } catch (err) {
            console.log(err);
        }
    }

    const getLikedXTestimonialsBySpaceId = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/getLikedTestimonialsBySpaceId?spaceId=${spaceId}&type=x`);
            const data = await response.json();
            // setXTestimonials(data);
            setXCardId(data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Masonry
                breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {/* <div> */}
                {testimonials.map((testimonial) => (
                    <div className='h-auto' key={testimonial.id}>
                        <Card className="p-0">
                            <CardHeader className="pb-2">
                                <CardTitle>{testimonial.submittedBy}</CardTitle>
                                <div className='flex flex-row justify-start'>
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <StarButton
                                            id="starRate"
                                            key={rating}
                                            currentRating={testimonial.stars}
                                            targetRating={rating}
                                            onClick={(e) => console.log("clicked")}
                                            isReadOnly={true}
                                        />
                                    ))}
                                </div>
                            </CardHeader>
                            <CardContent className="pb-0 italic">
                                {testimonial.tdesc}
                            </CardContent>
                            <CardContent className="pt-4 pl-6 pb-0 text-zinc-500">
                                {testimonial.submittedOn}
                            </CardContent>
                            <CardFooter></CardFooter>
                        </Card>
                    </div>
                ))}
                {xTestimonials.map((card) => (
                    <div className='h-auto' key={card.id}>
                        <Card className="p-0">
                            <CardHeader className="pb-2">
                                <div className='flex flex-row justify-start gap-2'>
                                    <Avatar className="items-center justify-start w-12 h-12">
                                        <AvatarImage src={card.picture} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className='flex flex-col'>
                                        <CardTitle className="text-xl flex flex-row gap-2">
                                            {card.name}
                                            {/* <Badge className="rounded-full bg-blue-400 hover:bg-blue-400  h-6 w-6">
                                    <Check />
                                </Badge> */}
                                            {card.isVerified && <CircleCheck className='w-5 h-5 my-1 min-w-6 ' fill='#0ea5e9' stroke='white' />}
                                        </CardTitle>
                                        <CardDescription className="text-sm">{card.handle}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <Separator className="my-2" />
                            <CardContent className="pb-0 italic">
                                <CardDescription className="text-base text-slate-900">
                                    {card.text}
                                </CardDescription>
                            </CardContent>
                            <Separator className="my-2" />
                            <CardDescription className="align-middle p-0 flex flex-row justify-evenly">
                                <div className='flex flex-row justify-start gap-2'>
                                    <Heart fill="#f91880" color='#f91880' className='w-4 pb-2' />
                                    {card.xLikes}
                                </div>
                                <div className='flex flex-row justify-start gap-2'>
                                    <Repeat2 color='#00a841' className='w-5 pb-1' />
                                    {card.xRetweets}
                                </div>
                            </CardDescription>
                        </Card>
                    </div>
                ))}
                {/* <SocialTwitterCard
                        xCardId={xTestimonials}
                        getReactVercelTweet={getReactVercelTweet}
                    /> */}
                {/* </div> */}
            </Masonry>
        </>
    )
}

export default TestimonialGrid