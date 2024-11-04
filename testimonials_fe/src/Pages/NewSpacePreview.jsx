import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AlertDialogTrigger, AlertDialog } from "@/components/ui/alert-dialog"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const NewSpacePreview = ({ formValue, isPreview = 1 }) => {
  return (
    <>
      <div className='flex flex-col align-top'>
        <Card>
          {isPreview === 1 &&
            <div className='flex flex-row justify-center p-2'>
              <Badge className="w-16 bg-green-600">Preview</Badge>
            </div>
          }
          {/* //add image */}
          <div className='flex flex items-center justify-center pt-4 px-4'>
            {/* <img className="object-cover w-16 h-16" src={formValue.picture} alt="testimonial" /> */}
            <Avatar className="items-center w-12 h-12">
              <AvatarImage src={formValue.picture} className="object-cover w-24 h-24" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <CardHeader className="flex flex-col items-center justify-center">
            <CardTitle className="text-4xl">{formValue.tname}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="flex flex-col items-center justify-center">
              {formValue.tdescription}
            </CardDescription>
            <Separator className="my-4" />
            <Label className="text-xl">
              Questions
            </Label>
            <li>{formValue.que1}</li>
            <li>{formValue.que2}</li>
            <li>{formValue.que3}</li>
          </CardContent>
          <div className="flex flex-colitems-center justify-center pb-4 px-8">
            {/* <AlertDialog> */}
              <AlertDialogTrigger className="grow bg-primary text-primary-foreground hover:bg-primary/90">
                {/* <Button > */}
                Send Testimonial
                {/* </Button> */}
              </AlertDialogTrigger>
            {/* </AlertDialog> */}
          </div>
        </Card >
      </div>
    </>
  )
}

export default NewSpacePreview