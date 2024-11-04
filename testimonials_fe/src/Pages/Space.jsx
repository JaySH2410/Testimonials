import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    EnvelopeOpenIcon,
    LinkIcon,
    GlobeAsiaAustraliaIcon,
    PencilSquareIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';
import { Boxes, Link, MailOpen, PenSquare, SquarePen } from 'lucide-react';
import SpaceTestimonials from './SpaceTestimonials';
import SpaceSocial from './SpaceSocial';
import SpaceLinks from './SpaceLinks';
import NewSpaceForm from './NewSpaceForm';
import NewSpace from './NewSpace';

const Space = ({ value, setDashboardNavFlag }) => {
    // console.log(value);
    const initialValues = {
        id: value.id,
        userId: value.userId,
        sname: value.sname,
        tname: value.tname,
        tdescription: value.tdescription,
        picture: value.picture,
        isStarRating: value.isStarRating,
        que1: value.que1,
        que2: value.que2,
        que3: value.que3,
    }
    const [formValue, setFormValue] = useState(initialValues);
    function handleChange(e) {
        // console.log(e.target.id);

        if (e.target.id === "isStarRating") {
            setFormValue({
                ...formValue,
                [e.target.id]: !formValue.isStarRating
            })
        } else if (e.target.id === "picture") {
            console.log("clicked");
            console.log(e.target.files);

            var file = e.target.files[0];
            var reader = new FileReader();
            reader.onloadend = function () {
                setFormValue({
                    ...formValue,
                    picture: reader.result
                })
                console.log('RESULT', reader.result)
            }
            reader.readAsDataURL(file);
            // console.log(t);

        }
        else {
            setFormValue({
                ...formValue,
                [e.target.id]: e.target.value
            })
        }
    }

    const [spaceValue, setSpaceValue] = useState(value);
    return (
        <>
            <div className='flex flex-col overflow-auto'>
                <Tabs defaultValue="testimonials" className="">
                    <TabsList className="grid w-full grid-cols-4 gap-1 h-12">
                        <TabsTrigger value="testimonials" className="gap-2 hover:bg-sky-100 hover:text-blue-600">
                            {/* <EnvelopeOpenIcon className="w-4" /> */}
                            <MailOpen className='w-4' />
                            Testimonials
                        </TabsTrigger>
                        <TabsTrigger value="integrations" className="gap-2 hover:bg-sky-100 hover:text-blue-600">
                            {/* <UserGroupIcon className='w-4' /> */}
                            <Boxes className='w-4' />
                            Socials
                        </TabsTrigger>
                        <TabsTrigger value="links" className="gap-2 hover:bg-sky-100 hover:text-blue-600">
                            {/* <LinkIcon className='w-4' /> */}
                            <Link className='w-4' />
                            Links
                        </TabsTrigger>
                        <TabsTrigger value="edit" className="gap-2 hover:bg-sky-100 hover:text-blue-600">
                            {/* <PencilSquareIcon className='w-4' /> */}
                            <PenSquare className='w-4' />
                            Edit
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="testimonials"><SpaceTestimonials spaceId={formValue.id} spaceName={value.sname} /></TabsContent>
                    <TabsContent value="integrations"><SpaceSocial spaceId={formValue.id}/></TabsContent>
                    <TabsContent value="links"><SpaceLinks spaceId={formValue.id}/></TabsContent>
                    <TabsContent value="edit">
                        {/* <NewSpace setDashboardNavFlag={setDashboardNavFlag} /> */}
                        <NewSpaceForm
                            isEditFlag={1}
                            formValue={formValue}
                            handleChange={handleChange}
                            setDashboardNavFlag={setDashboardNavFlag}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}

export default Space