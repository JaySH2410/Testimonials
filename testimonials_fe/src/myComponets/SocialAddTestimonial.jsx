import React, { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SheetClose } from "@/components/ui/sheet"


const SocialAddTestimonial = ({getReactVercelTweet}) => {

    const [tweetLink, setTweetLink] = useState('');

    async function getTweet() {
        try {
            const tweetId = tweetLink.split('/').pop();
            console.log(tweetId);
            const t = await getReactVercelTweet(tweetId, true);
            console.log(t);
        }
        catch (e) {
            console.log(e);
        }
    }

    
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            {/* <Tweet id="1838774450994450682"/> */}
            <Label htmlFor="email">Tweet Link</Label>
            <Input type="text" id="tweet" placeholder="Tweet Link" onChange={(e) => setTweetLink(e.target.value)} />
            <div className='flex flex-row-reverse gap-4 py-4'>
                <SheetClose asChild>
                    <Button className="col-span-1" onClick={getTweet}>Add Tweet</Button>
                </SheetClose>
            </div>
        </div>

    )
}

export default SocialAddTestimonial