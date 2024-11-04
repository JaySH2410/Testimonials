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
import { Heart, HeartOff } from 'lucide-react';
import StarButton from './StarButton';
import { set } from 'zod';


const TestimonialsCard = ({ spaceId, searchTerm, filterLiked, filterStarRating }) => {
    const [cardValue, setCardValue] = useState([]);
    const [filteredCardValue, setFilteredCardValue] = useState([]);
    useEffect(() => {
        getAllTestimonialsBySpaceId(spaceId);
    }, []);

    useEffect(() => {
        setFilteredCardValue(cardValue);
    }, [cardValue]);

    useEffect(() => {
        const filtered = cardValue.filter(item => {
            // Check if the search term matches
            const matchesSearch = item.tdesc.toLowerCase().includes(searchTerm.toLowerCase());

            // Check if the liked filter matches
            let matchesLiked;
            if (filterLiked === "Both") {
                matchesLiked = true; // Include all items
            } else if (filterLiked === "Yes") {
                matchesLiked = item.isLiked === true; // Only liked
            } else { // filterLiked === "No"
                matchesLiked = item.isLiked === false; // Only unliked
            }

            // Check if the star rating matches
            // console.log(item.stars, filterStarRating);
            
            const matchesStarRating = filterStarRating[item.stars] === true;

            // Return true if both conditions are satisfied
            return matchesSearch && matchesLiked && matchesStarRating;
        });


        setFilteredCardValue(filtered);
        // console.log(searchTerm, filterLiked, filtered); // Log filtered results
    }, [searchTerm, filterLiked, filterStarRating, cardValue]);

  
    // useEffect(() => {
    //     const filtered = cardValue.filter(item => {
    //         // Check if the star rating matches
    //         const matchesStarRating = item.stars === filterStarRating;
    //         return matchesStarRating;
    //     });
    // }, [filterStarRating]);
    
    const getAllTestimonialsBySpaceId = async (spaceId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/getAllTestimonialsBySpaceId?spaceId=${spaceId}&type=text`);
            const data = await response.json();
            setCardValue(data);
        } catch (err) {t
            console.log(err);
        }
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
                    type: "text"
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

    return (
        <div className='flex flex-col gap-2'>
            {filteredCardValue.map((card, index) => {
                // console.log(card);

                return (
                    <Card className="p-2">
                        {/* className="grid grid-rows-3 gap-2 px-2 py-1" */}
                        {/* Badge and Heart */}
                        <div className='flex flex-row justify-between p-2 auto-rows-auto'>
                            {/* <span>a</span> */}
                            <Badge className="w-auto h-6 bg-green-600">Text</Badge>
                            <Button variant="icon" onClick={() => { likeUnLikeTestimonial(card.id, !card.isLiked) }}>
                                {card.isLiked && <Heart fill="red" color='red' />}
                                {!card.isLiked && <HeartOff color='red' />}
                            </Button>
                        </div>
                        {/* Description and Stars */}
                        <div className='flex flex-row justify-between p-2 gap-2'>
                            <CardContent className="align-middle p-0">{card.tdesc}</CardContent>
                            <CardContent className="min-w-fit p-0 pl-2">
                                {/* <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"> */}
                                {card.stars !== "-1" &&
                                    [1, 2, 3, 4, 5].map((rating) => (
                                        <StarButton
                                            currentRating={parseInt(card.stars)}
                                            targetRating={rating}
                                            onClick={() => console.log("clicked")}
                                            isReadOnly={true}
                                        />
                                    ))
                                }
                                {/* TODO: use star component */}
                                {/* </span> */}
                            </CardContent>
                        </div>
                        {/* Submitted by and at*/}
                        <div className='flex flex-row justify-between p-2'>
                            <CardDescription className="align-middle p-0">Submitted By: {`${card.submittedBy} | ${card.submittedByEmail}`}</CardDescription>
                            <CardDescription className="align-middle p-0">Submitted On: {card.submittedOn}</CardDescription>
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}

export default TestimonialsCard