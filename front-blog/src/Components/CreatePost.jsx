import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useParams } from "react-router-dom";
import useStore from "../Zustand/Store";
import { toast } from 'react-hot-toast';

const CreatePost = () => {
  const params = useParams()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const { createNewPost, updatePost } = useStore()


  const onSubmit = handleSubmit((data) => {
    console.log(data, " <=== data")
    if (params.id) {
        updatePost(data)
        toast.success('Post updated successfully')
      } else {
        createNewPost(data)
        toast.success('Post created successfully')
      }
  })
  const deleteTask = () => {
  }

  return (
    <div className='flex justify-center items-center h-[calc(80vh-1rem)] w-full'>        
      <form onSubmit={onSubmit} className='border border-pink-500 rounded-md bg-transparent p-10 w-2/3'>
        <header className='flex justify-between'>
          <h1 className='font-bold text-3xl m-auto'>{!params.id ? 'Create new Post' : 'Edit Post'}</h1>
          {params.id &&
            <button type='button' onClick={(e) => deleteTask(params.id)} className='bg-red-700 hover:bg-red-600 px-3 py-1 items-center w-24 h-11 rounded-lg text-center '>Delete</button>
          }
        </header>
        <input placeholder="Write your name" {...register('author', { required: true })} className='bg-gray-800 border-2 rounded-lg mt-10 py-4 px-4  focus:outline-none w-full' />
        {errors.title && <span className='block text-red-400 mb-2'>This field is required</span>}
        <input placeholder="Write a title" {...register('title', { required: true })} className='bg-gray-800 border-2 rounded-lg my-10 mb-8 py-4 px-4  focus:outline-none w-full' />
        {errors.title && <span className='block text-red-400 mb-2'>This field is required</span>}
        <textarea placeholder="Write a description" {...register('content', { required: true })} className='bg-gray-800 border-2 rounded-lg  mb-6 py-4 px-4 h-[150px]  focus:outline-none w-full'></textarea>
        {errors.description && <span className='block text-red-400 mb-2'>This field is required</span>}
        <button type='submit' className='font-bold text-white bg-pink-800 hover:bg-purple-600 px-14 py-4 rounded '>{!params.id ? 'Save' : 'Update'}</button>
      </form>            
    </div>
  )
}

export default CreatePost