import React from 'react'
import { SidebarTrigger } from './sidebar'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { session } from '@/service/auth.service'
import Image from 'next/image'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu'
import { auth, signOut } from '@/lib/auth'

export default async function MainHeader() {
  let content = await auth();
  return (
    <>
      <SidebarTrigger className=" p-4 m-1" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="">
            <AvatarImage src={content?.user?.image as string} alt='' className="" />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" className=" mr-6">
          <DropdownMenuItem className=" text-[12px] cursor-pointer">Rephase</DropdownMenuItem>
          <DropdownMenuItem className=" text-[12px] cursor-pointer">Regenerate</DropdownMenuItem>
          <DropdownMenuItem className=" text-[12px] cursor-pointer" onClick={async () => {
            "use server"
            await signOut()
          }}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>

  )
}

