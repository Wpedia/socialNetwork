import React from 'react'
import useProfileStore from '../../../zustand/useProfileStore';

const PhotoInterface = ({ viewedUser }) => {
    const photos = viewedUser.photos.reverse()

    return (
        <div className="bg-white p-4 border-b border-r rounded-t">
            <h2 className="text-xl font-semibold mb-4">Фотографии</h2>
            <div className="grid grid-cols-3 xl:grid-cols-6 xl:gap-24">
                {photos.slice(0, 6).map((photo, index) => (
                    <div key={index} className="relative w-28 aspect-w-1 aspect-h-1">
                        <img src={`../../../../public/uploads/` + photo} alt={`Photo ${index + 1}`} className="object-cover w-full h-full rounded" />
                    </div>
                ))}
            </div>
            <button
                className="mt-4 bg-slate-200 text-black px-4 py-2 rounded hover:bg-slate-300"
                onClick={() => document.getElementById('photosModal').showModal()}>
                Показать все
            </button>
            <dialog id="photosModal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <div className="grid grid-cols-4 gap-1">
                        {photos.map((photo, index) => (
                            <div
                                key={index} className="relative w-28 aspect-w-1 aspect-h-1"
                                onClick={() => document.getElementById(`modal-` + index).showModal()}>
                                <img
                                    src={`../../../../public/uploads/` + photo}
                                    alt={`Photo ${index + 1}`}
                                    className="object-cover w-full h-full rounded" />
                                <dialog id={`modal-` + index} className="w-11/12 bg-black overflow-y-hidden">
                                    <div className='flex justify-center'> 
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">✕</button>
                                        </form>
                                        <img src={`../../../../public/uploads/` + photo}
                                            alt={`Photo ${index + 1}`} 
                                        className='h-screen'/>
                                    </div>
                                </dialog>
                            </div>
                        ))}
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default PhotoInterface