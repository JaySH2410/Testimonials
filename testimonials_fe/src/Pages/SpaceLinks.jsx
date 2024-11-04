import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import SpaceLinksPreview from '../myComponets/SpaceLinksPreview';
import SpaceLink from '../myComponets/SpaceLink';
import { useLocation } from 'react-router-dom';
// import { useToast } from "@/components/hooks/use-toast"
import useToast from "../hooks/useToast"

const SpaceLinks = ({ spaceId }) => {
    const location = useLocation();
    // const [copySuccess, setCopySuccess] = useState('');
    const myToast = useToast()

    const copyToClipboard = (_i) => {
        if(_i === 1) {
            const fullUrl = window.location.href;
            const baseUrl = fullUrl.substring(0, fullUrl.lastIndexOf('/')) + '/testimonialGrid?spaceId=' + spaceId;
            const textToCopy = baseUrl; // Text to be copied
            navigator.clipboard.writeText(textToCopy).then(() => {
                // setCopySuccess('Copied to clipboard!');
                console.log("copied");
                
            }).catch(err => {
                // setCopySuccess('Failed to copy!');
                console.error('Error copying to clipboard: ', err);
            });
        }
        else if (_i === 2) {
            const fullUrl = window.location.href;
            const baseUrl = fullUrl.substring(0, fullUrl.lastIndexOf('/')) + '/new?id=' + spaceId;
            console.log(location, fullUrl, baseUrl);

            const textToCopy = baseUrl; // Text to be copied
            navigator.clipboard.writeText(textToCopy).then(() => {
                // setCopySuccess('Copied to clipboard!');
                console.log("copied");
            }).catch(err => {
                // setCopySuccess('Failed to copy!');
                console.error('Error copying to clipboard: ', err);
            });

            // window.open(baseUrl, '_blank');
        }
        myToast({
            title: "Linked Copied to Clipboard",
            description: "Open in browser to check how it looks",
            duration: 10000
        })
        // setTimeout(() => { console.log("msg", copySuccess) }, [2000])
    };
    // useEffect(() => {
    //     console.log(EyeIcon);
    // }, [])
    return (
        <>
            <div className='flex flex-col gap-2'>
                <Card className="grid grid-cols-2 gap-2 px-2 py-1">
                    <div>
                        <CardTitle className="align-middle p-1 text-base">Testimonial Grid</CardTitle>
                        <CardDescription className="align-middle px-1">Link to your Testimonial Grid.</CardDescription>
                    </div>
                    <CardContent className="text-right p-1 hover:underline italic">
                        <SpaceLink handleClick={() => copyToClipboard(1)} />
                    </CardContent>
                </Card>

                <Card className="grid grid-cols-2 gap-2 px-2 py-1">
                    <div>
                        <CardTitle className="align-middle p-1 text-base">Collect Testimonial</CardTitle>
                        <CardDescription className="align-middle px-1">Link to your Collect Testimonial.</CardDescription>
                    </div>
                    <CardContent className="text-right p-1 hover:underline italic">
                        <SpaceLink handleClick={() => copyToClipboard(2)} />
                    </CardContent>
                </Card>

                <Card className="grid grid-cols-2 gap-2 px-2 py-1">
                    <div>
                        <CardTitle className="align-middle p-1 text-base">Embed Testimonial Grid</CardTitle>
                        <CardDescription className="align-middle px-1">Embed Testimonial Grid to your website.</CardDescription>
                    </div>
                    <CardContent className="text-right p-1 hover:underline italic">
                        <SpaceLinksPreview buttonDesc="Preview" type="Grid"/>
                    </CardContent>
                </Card>

                <Card className="grid grid-cols-2 gap-2 px-2 py-1">
                    <div>
                        <CardTitle className="align-middle p-1 text-base">Embed Collect Testimonial </CardTitle>
                        <CardDescription className="align-middle px-1">Embed Collect Testimonial to your website.</CardDescription>
                    </div>
                    <CardContent className="text-right p-1 hover:underline italic">
                        <SpaceLinksPreview buttonDesc="Preview" type="Collect"/>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default SpaceLinks