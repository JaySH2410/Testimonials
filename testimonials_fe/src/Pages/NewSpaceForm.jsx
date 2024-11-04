import React, { useContext } from 'react'
import {
    PlusIcon
} from '@heroicons/react/24/outline';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { SpaceContext } from '../hooks/useContext'
// import { useToast } from "@/components/hooks/use-toast"
import useToast from "../hooks/useToast"
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { userContext } from '../hooks/useContext';

const NewSpaceForm = ({ formValue, handleChange, setDashboardNavFlag, isEditFlag = 0 }) => {
    const myToast  = useToast()
    const navigate = useNavigate()
    const { user } = useContext(userContext);
    const { spaces, setSpaces } = useContext(SpaceContext);

    console.log("in new space form:", formValue);


    const createSpace = async (newSpace) => {
        try {
            const response = await fetch("http://localhost:3000/api/createSpace", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    userId: newSpace.userId,
                    sname: newSpace.link,
                    tname: newSpace.tname,
                    tdescription: newSpace.tdescription,
                    picture: newSpace.picture,
                    isStarRating: newSpace.isStarRating,
                    que1: newSpace.que1,
                    que2: newSpace.que2,
                    que3: newSpace.que3
                })
            });

            const data = await response.json();
            return data;
        }
        catch (err) {
            console.log(err);
        }
    }

    const editSpace = async (space) => {
        // console.log(space);

        try {
            const response = await fetch("http://localhost:3000/api/editSpace", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    id: space.id,
                    userId: space.userId,
                    sname: space.link,
                    tname: space.tname,
                    tdescription: space.tdescription,
                    picture: space.picture,
                    isStarRating: space.isStarRating,
                    que1: space.que1,
                    que2: space.que2,
                    que3: space.que3
                })
            });
            const data = await response.json();
            return data;
        }
        catch (err) {
            console.log(err);
        }
    }

    async function onSubmit(e) {
        console.log(formValue);
        
        const space = {
            id: formValue.id,
            userId: user.id,
            link: formValue.sname,
            tname: formValue.tname,
            tdescription: formValue.tdescription,
            picture: formValue.picture,
            isStarRating: formValue.isStarRating,
            que1: formValue.que1,
            que2: formValue.que2,
            que3: formValue.que3
        }
        console.log(space);

        if (isEditFlag === 0) {
            const newSpace = await createSpace(space);
            myToast({
                title: "New Space Created",
                description: `Name: ${newSpace.name}`,
                duration: 10000
            })
            setSpaces((prev) => [...prev, space]);
        } else {
            const editedSpace = await editSpace(space);
            myToast({
                title: "Space Edited",
                description: `Name: ${editedSpace.name}`,
                duration: 10000
            })
            setDashboardNavFlag(true);//TODO: Bug when clicked onSubmit for editting space, navbar not updating

        }
        navigate(`/dashboard`);

    }

    return (
        <>
            <Card className="">
                <CardHeader>
                    <CardTitle>{isEditFlag ? "Edit Space" : "Create New Space"}</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* <form onSubmit={onSubmit}> */}
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="sname">Space Name</Label>
                            <Input
                                id="sname"
                                placeholder="Name of your space"
                                onChange={handleChange}
                                value={formValue.sname}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="tname">Testimonial Name</Label>
                            <Input
                                id="tname"
                                placeholder="Name of your Testimonial"
                                onChange={handleChange}
                                value={formValue.tname}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="tdescription">Testimonial Description</Label>
                            <Textarea
                                id="tdescription"
                                placeholder="Type your Description here."
                                onChange={handleChange}
                                value={formValue.tdescription}
                            />
                        </div>
                        <div className='grid grid-cols-3 gap-6 justify-items-start'>
                            <div>
                                <Label htmlFor="picture">Select Picture</Label>
                                <Input id="picture" type="file" onChange={handleChange} />
                            </div>
                            {/* <img className="object-cover w-16 h-16" src={formValue.file} alt="testimonial" /> */}
                            <Avatar className="items-center w-12 h-12">
                                <AvatarImage src={formValue.picture} className="object-cover" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-row space-x-4 items-center justify-center'>
                                <Label htmlFor="isStarRating">Star Rating</Label>
                                <Switch
                                    className="p-0"//keep this p-0, otherwise visual bug
                                    id="isStarRating"
                                    onClick={handleChange}
                                    checked={formValue.isStarRating}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="que">Questions</Label>
                            <Input
                                id="que1"
                                placeholder="Type your Question here."
                                onChange={handleChange}
                                value={formValue.que1}
                            />
                            <Input
                                id="que2"
                                placeholder="Type your Question here."
                                onChange={handleChange}
                                value={formValue.que2}
                            />
                            <Input
                                id="que3"
                                placeholder="Type your Question here."
                                onChange={handleChange}
                                value={formValue.que3}
                            />
                        </div>

                    </div>
                    <div className='flex flex-row-reverse py-4'>
                        <Button type="submit" onClick={onSubmit}>
                            {isEditFlag ? "Update Space" : "Create Space"}
                        </Button>
                    </div>
                    {/* </form> */}
                </CardContent>
            </Card>
        </>
    )
}

export default NewSpaceForm;