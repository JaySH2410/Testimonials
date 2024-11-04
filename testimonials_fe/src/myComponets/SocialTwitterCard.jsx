import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, HeartOff, Repeat2, Check, CircleCheck } from 'lucide-react';
import { set } from 'react-hook-form'

const SocialTwitterCard = ({ xCardId, getReactVercelTweet, searchTerm, filterLiked }) => {

    const [cardValue, setCardValue] = useState([]);
    const [filteredCardValue, setFilteredCardValue] = useState([]);

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
        setCardValue(newCardValues);
    }

    const likeUnLikeTestimonial = async (id, isLiked) => {
        try {
            const response = await fetch("http://localhost:3000/api/likeUnlikeTestimonials", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    isLiked: isLiked,
                    type: "x"
                })
            });
            const data = await response.json();
            console.log(data);
            // setItems(prevItems =>
            //     prevItems.map(item =>
            //         item.id === id ? { ...item, isLiked: !item.isLiked } : item
            //     )
            // );
            setCardValue(prev =>
                prev.map(item =>
                    item.id === id ? { ...item, isLiked: data.isLiked } : item
                )
            )
            // setCardValue(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllTweets();
    }, [xCardId]);


    useEffect(() => {
        setFilteredCardValue(cardValue);
    }, [cardValue]);

    useEffect(() => {
        // console.log(filterLiked);
        
        const filtered = cardValue.filter(item => {
            // Check if the search term matches
            const matchesSearch = item.text.toLowerCase().includes(searchTerm.toLowerCase());

            // Check if the liked filter matches
            let matchesLiked;
            if (filterLiked === "Both") {
                matchesLiked = true; // Include all items
            } else if (filterLiked === "Yes") {
                matchesLiked = item.isLiked === true; // Only liked
            } else { // filterLiked === "No"
                matchesLiked = item.isLiked === false; // Only unliked
            }
            // console.log(matchesLiked);
            

            // Return true if both conditions are satisfied
            return matchesSearch && matchesLiked;
        });
        // console.log(filtered);
        

        setFilteredCardValue(filtered);
        // console.log(searchTerm, filterLiked, filtered); // Log filtered results
    }, [searchTerm, filterLiked, cardValue ]);// , cardValue]);


    return (
        <div className='flex flex-col gap-2'>
            {filteredCardValue.map((card, index) => {
                // console.log(cardValue);

                return (
                    <Card className="p-2">
                        <div className='flex flex-row justify-between p-2 auto-rows-auto'>
                            {/* <span>a</span> */}
                            <Badge className="w-auto h-6 ">X (formerly known as Twitter)</Badge>
                            <Button variant="icon" onClick={() => { likeUnLikeTestimonial(card.id, !card.isLiked) }}>
                                {card.isLiked && <Heart fill="red" color='red' />}
                                {!card.isLiked && <HeartOff color='red' />}
                            </Button>
                            {/* <Button variant="icon" onClick={() => { console.log("clicked") }}>
                        <Heart fill="red" color='red' />
                    </Button> */}
                        </div>
                        <CardContent className="align-middle p-0">
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
                                        {card.isVerified && <CircleCheck className='w-5 h-5 my-1' fill='#0ea5e9' stroke='white' />}
                                    </CardTitle>
                                    <CardDescription className="text-sm">{card.handle}</CardDescription>
                                </div>
                            </div>
                        </CardContent>
                        <Separator className="my-2" />
                        <CardContent className="align-middle px-0 py-0">
                            <CardDescription className="text-base text-slate-900">
                                {card.text}
                            </CardDescription>
                        </CardContent>
                        <Separator className="my-2" />
                        <CardDescription className="align-middle p-0 flex flex-row justify-evenly">
                            <div className='flex flex-row justify-start gap-2'>
                                <Heart fill="#f91880" color='#f91880' className='w-4' />
                                {card.xLikes}
                            </div>
                            <div className='flex flex-row justify-start gap-2'>
                                <Repeat2 color='#00a841' className='w-5' />
                                {card.xRetweets}
                            </div>
                        </CardDescription>
                    </Card>
                )
            })}
        </div>
    )
}

export default SocialTwitterCard