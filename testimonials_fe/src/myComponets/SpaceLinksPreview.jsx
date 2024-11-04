import React, { useEffect } from 'react'
import gridImage from '../../public/grid.png';
import collectImage from '../../public/collect.png';
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
import { Button } from "@/components/ui/button"
import {
    EyeIcon,
    LinkIcon
} from '@heroicons/react/24/outline';
import { Eye } from 'lucide-react';

const SpaceLinksPreview = ({ buttonDesc, type }) => {
    // useEffect(() => {
    //     console.log(buttonDesc, children);

    // }, [])
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger className="">
                    {/* bg-blue-100 text-secondary-foreground hover:bg-blue-100/80 */}
                    <div className='flex flex-row-reverse gap-2'>
                        {/* <Button variant="bluesec"> */}
                        {buttonDesc}
                        {/* <EyeIcon className='w-5' /> */}
                        <Eye className='w-5' />
                        {/* </Button> */}
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Preview of {type === "Grid" ? "Testimonial Grid" : "Collect Testimonial"}</AlertDialogTitle>
                        <div className='flex flex-row justify-center'>
                            {type === "Grid" &&
                                <img src={gridImage} alt="Girl in a jacket"  />
                                // className='w-80 h-80'
                            }
                            {type === "Collect" &&
                                <img src={collectImage} alt="Girl in a jacket" />
                                // className='w-80 h-80' 
                            }
                        </div>
                        <AlertDialogTitle>Embed this to your website</AlertDialogTitle>
                        <AlertDialogDescription className="bg-primary text-primary-foreground rounded-md p-2">
                            <pre>
                                <code>
                                    {type === "Grid" &&
                                        `<iframe
id='testimonialto-grid'
src="http://localhost:5173/space/testimonialGrid?spaceId=11"
frameborder="0" scrolling="no" width="100%" height="100%">`}
                                    {type === "Collect" &&
                                        `<iframe
id='testimonialto-collect'
src="http://localhost:5173/space/new?id=11"
frameborder="0" scrolling="no" width="100%" height="100%">`}
                                    {/* {type === "Grid" &&  */}
                                    {/* &lt;iframe
                                    id='testimonialto-test490-tag-all-light'<br />
                                    src="http://localhost:5173/space/testimonialGrid?spaceId=11"<br />
                                    frameborder="0" scrolling="no" width="100%" height="100%"&gt; */}
                                    {/* } */}
                                    {/* {type === "Collect" &&  */}
                                    {/* &lt;iframe
                                    id='testimonialto-test490-tag-all-light'<br />
                                    src="http://localhost:5173/space/new?id=11"<br />
                                    frameborder="0" scrolling="no" width="100%" height="100%"&gt; */}
                                    {/* } */}

                                    {/* &lt;/div&gt; */}
                                </code>
                            </pre>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default SpaceLinksPreview