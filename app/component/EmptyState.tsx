"use client"

import React from 'react' 
import { Button } from './modal/Button'
interface EmptyStateProps {
  title?: string
  reset?: ()=> void
}

export const EmptyState = ({title, reset}: EmptyStateProps) => {
  return(
    <div className='mt-60 shadow-md relative z-40 rounded-md flex flex-col  items-center justify-center py-10 gap-5'>
        <h3 className='w-full text-lg lg:text-xl text-center text-gray-800/75 text-bold'>{title}</h3>
        <Button onClick={reset} danger >go back</Button>
    </div>
  )
}
