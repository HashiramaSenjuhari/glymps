import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../dropdown-menu'
import { Avatar, AvatarImage } from '../avatar'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../accordion'
import Image from 'next/image'
import Link from 'next/link'

const Output = ({ question, answer, youtubelink }: { question: string, answer: string, youtubelink: string }) => {
  console.log(youtubelink)
  return (
    <div>
      <div className=" flex gap-x-4">
        <div className=" flex flex-col justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className=" flex justify-center items-center cursor-pointer select-none">
                <AvatarImage src="/option.svg" className=" w-4 h-4"></AvatarImage>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="left" className=" mr-6">
              <DropdownMenuItem className=" text-[12px] cursor-pointer">Rephase</DropdownMenuItem>
              <DropdownMenuItem className=" text-[12px] cursor-pointer">Regenerate</DropdownMenuItem>
              <DropdownMenuItem className=" text-[12px] cursor-pointer">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
        <div className=" font-medium">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <p className=" p-4">
                  {question}
                </p>
              </AccordionTrigger>
              <AccordionContent className=" p-4 flex flex-col gap-y-6">
                <div>
                  {answer}
                </div>
                <hr />
                <div className=' flex gap-x-4 items-center pb-2'>
                  <Image src={"/youtube.svg"} alt='' width={21} height={21} />
                  <Link href={youtubelink as string} className=' hover:underline'>{youtubelink}</Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

export default Output
