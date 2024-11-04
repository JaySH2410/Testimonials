import React, { useContext, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Heading from '../myComponets/Heading';
import { Link } from 'react-router-dom';
import { SpaceContext, userContext } from '../hooks/useContext'


const totalTestimonials = 50;

const testimonials = [
  {
    description: "Total Testimonials",
    title: 50,
  },
  {
    description: "Text",
    title: 40,
  },
  {
    description: "Video",
    title: 10,
  },
]
// const spaces = [
//   {
//     description: "From the blog",
//     title: "Jay's Blog",
//     image: "https://github.com/shadcn.png",
//     link: "loremipsum"
//   },
//   {
//     description: "From Testimonials product",
//     title: "Testimonials",
//     image: "https://github.com/shadcn.png",
//     link: "ipsumlorem"
//   }
// ]
const Home = ({ handleClick }) => {
  const { spaces, setSpaces } = useContext(SpaceContext);
  const { user } = useContext(userContext);

  useEffect(() => {
    getSpaces();
  }, [])

  const getSpaces = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/getAllSpacesByUserId?userId=${user.id}`);
      const data = await response.json();
      setSpaces(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='p-3 grid grid-cols-3 gap-5'>
      <div className='col-span-3 pt-4'>
        <Heading>Your Testimonials</Heading>
      </div>
      {
        testimonials.map((testimonial, index) => {
          return (
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{testimonial.description}</CardDescription>
                <CardTitle className="text-4xl">{testimonial.title}</CardTitle>
              </CardHeader>
              <CardFooter>
                <Progress value={(testimonial.title / totalTestimonials) * 100} />
              </CardFooter>
            </Card>
          )
        })
      }
      <div className='col-span-3 pt-4'>
        <Heading>Your Spaces</Heading>
      </div>
      {spaces.map((space, index) => {
        return (
          //  
          <Link to={`/space/${space.sname}`} key={index} onClick={(e) => handleClick(space.sname)}>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>{space.tdescription}</CardDescription>
                <div className='flex flex-cols justify-between'>
                  <CardTitle className="text-2xl">{space.tname}</CardTitle>
                  <Avatar className="items-center justify-center">
                    <AvatarImage src={space.picture} className="object-cover" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
              </CardHeader>
            </Card>
          </Link>
        )
      })}

    </div>
  )
}

export default Home