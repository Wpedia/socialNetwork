import React from 'react'

const MessagesSkeletons = () => {
    return (
        <>
            <div className='flex gap-3 items-center'>
                <div className='skeleton w-10 h-10 rounded-full shrink-0 bg-gray-400'></div>
                <div className='flex flex-col gap-1'>
                    <div className='h-4 w-40 skeleton bg-gray-400'></div>
                    <div className='h-4 w-40 skeleton bg-gray-400'></div>
                </div>
            </div>
            <div className='flex gap-3 items-center justify-end'>
                <div className='flex flex-col gap-1'>
                    <div className='skeleton w-40 h-4 bg-gray-400'></div>
                </div>
                <div className='skeleton w-10 h-10 shrink-0 rounded-full bg-gray-400'></div>
            </div>
        </>
    )
}

export default MessagesSkeletons