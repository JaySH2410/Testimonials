import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import StarButton from '../myComponets/StarButton';
import { useLocation, useNavigate } from 'react-router-dom';
// import { useToast } from "@/components/hooks/use-toast"
import useToast from "../hooks/useToast"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import NewSpace from './NewSpace'
import NewSpacePreview from './NewSpacePreview'
// import { set } from 'react-hook-form'


const Testimonials = () => {
    const myToast = useToast()
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const id = query.get('id');

    useEffect(() => {
        getSpaceDetailsById(id);
    }, []);

    const displayInitialValue = {
        id: undefined,
        userId: undefined,
        sname: undefined,
        tname: undefined,
        tdescription: undefined,
        picture: undefined,
        isStarRating: true,
        que1: undefined,
        que2: undefined,
        que3: undefined,
    }
    const [displayValue, setDisplayValue] = useState(displayInitialValue);

    const initialValues = {
        spaceId: displayValue.id,
        starRate: displayValue.isStarRating ? 5 : -1,
        tdesc: undefined,
        submittedBy: undefined,
        submittedByEmail: undefined,
    }

    const [formValue, setFormValue] = useState(initialValues);

    async function getSpaceDetailsById(id) {
        try {
            const response = await fetch(`http://localhost:3000/api/getSpaceDetailsById?id=${id}`);
            const data = await response.json();
            console.log(data);
            setDisplayValue(prev => ({
                ...prev,
                id: data[0].id,
                userId: data[0].userId,
                sname: data[0].sname,
                tname: data[0].tname,
                tdescription: data[0].tdescription,
                picture: data[0].picture,
                isStarRating: data[0].isStarRating,
                que1: data[0].que1,
                que2: data[0].que2,
                que3: data[0].que3
            }));
        } catch (err) {
            console.log(err);
        }
    }

    async function createTestimonials(formValue) {
        try {
            const response = await fetch("http://localhost:3000/api/createTestimonials", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    spaceId: displayValue.id,
                    starRate: formValue.starRate,
                    tdesc: formValue.tdesc,
                    submittedBy: formValue.submittedBy,
                    submittedByEmail: formValue.submittedByEmail
                })
            });
            const data = await response.json();
            console.log(data);
            myToast({
                title: "Testimonial Created",
                description: "Thank you for your feedback",
                duration: 10000
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    function handleChange(e) {
        // console.log(e.target.id, e.target.value);
        // console.log(displayValue.id);
        console.log({
            spaceId: displayValue.id,
            starRate: formValue.starRate,
            tdesc: formValue.tdesc,
            submittedBy: formValue.submittedBy,
            submittedByEmail: formValue.submittedByEmail
        });

        // console.log(formValue);

        const { id, value } = e.target;
        setFormValue(prev => ({
            ...prev,
            [id]: value
        }))
    }

    function handleStarChange(e) {
        setFormValue(prev => ({ ...prev, starRate: e }))
    }

    function handleSubmit(e) {
        console.log(formValue);
        createTestimonials(formValue);
        setFormValue(initialValues)
        // navigate('da')
        // e.preventDefault(); // TODO: create the testimonial
    }

    return (
        <>
            <div className='flex flex-col gap-2 px-80 py-8'>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <NewSpacePreview formValue={displayValue} isPreview={0} />
                    </AlertDialogTrigger>
                    <AlertDialogContent className="grow">
                        {/* className="opacity-0" */}
                        {/* <Card> */}
                        <div className='flex flex-row justify-between'>
                            <CardHeader className="flex flex-col items-center justify-center py-2">
                                <CardTitle className="text-4xl">{displayValue.tname}</CardTitle>
                            </CardHeader>
                            <div className='flex flex items-center justify-center pt-4 px-4'>
                                <Avatar className="items-center w-12 h-12">
                                    <AvatarImage src={displayValue.picture} className="object-cover" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                        <CardContent>
                            <Label className="text-xl">
                                Questions
                            </Label>
                            <li>{displayValue.que1}</li>
                            <li>{displayValue.que2}</li>
                            <li>{displayValue.que3}</li>
                            <Separator className="my-4" />
                            {displayValue.isStarRating && <div className='flex flex-row justify-between'>
                                <Label htmlFor="rating" className="text-base pt-2">Rating</Label>
                                <div>
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <StarButton
                                            id="starRate"
                                            key={rating}
                                            currentRating={formValue.starRate}
                                            targetRating={rating}
                                            onClick={(e) => handleStarChange(e)}
                                            isReadOnly={false}
                                        />
                                    ))}
                                </div>
                            </div>}
                            <div className='pt-2'>
                                <Label htmlFor="tdesc" className="text-base">Description</Label>
                                <Textarea
                                    id="tdesc"
                                    placeholder="Type your Description here."
                                    onChange={handleChange}
                                    value={formValue.tdesc}
                                />
                            </div>
                            <div className='pt-2'>
                                <Label htmlFor="submittedBy" className="text-base">Name</Label>
                                <Input
                                    id="submittedBy"
                                    placeholder="Your Name"
                                    onChange={handleChange}
                                    value={formValue.submittedBy}
                                />
                            </div>
                            <div className='pt-2'>
                                <Label htmlFor="submittedByEmail" className="text-base">Email</Label>
                                <Input
                                    id="submittedByEmail"
                                    placeholder="Your Email"
                                    onChange={handleChange}
                                    value={formValue.submittedByEmail}
                                />
                            </div>
                            <div className='flex flex-row-reverse pt-4'>
                                <AlertDialogAction onClick={handleSubmit}>
                                    {/* <Button type="submit" > */}
                                    Send
                                    {/* </Button> */}
                                </AlertDialogAction>
                            </div>
                        </CardContent>
                        {/* </Card> */}
                    </AlertDialogContent>
                </AlertDialog>
            </div >
        </>
        // <></>
    )
}

export default Testimonials