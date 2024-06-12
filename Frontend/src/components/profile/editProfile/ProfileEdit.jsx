import React from 'react'
import Status from '../status/Status'
import FullnameEdit from './FullnameEdit'
import { FaRocketchat } from "react-icons/fa";
import { MdOutlineEditNotifications } from "react-icons/md";
import { MdSecurity } from "react-icons/md";
import { MdOutlineDevices } from "react-icons/md";



const ProfileEdit = ({ avatar, userId, isAuthUserProfile, viewedUser, viewedProfile }) => {

    return (
        <dialog id="my_modal_4" className="modal p-3">
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Профиль</h3>
                <div className='flex flex-row items-center gap-5 p-3 pb-0'>
                    <p>Аватар:</p>
                    <img
                        src={`../../../../public/uploads/${avatar}`}
                        alt="Avatar"
                        className="w-20 h-20 rounded-full mr-4 cursor-pointer"
                        onClick={() => document.getElementById('my_modal_3').showModal()}
                    />
                </div>
                <div className='flex flex-row items-center gap-5 p-3'>
                    <p>Имя:</p>
                    <FullnameEdit  isAuthUserProfile={isAuthUserProfile}
                     viewedUser={viewedUser}/>
                </div>
                <h3 className="font-bold text-lg mt-5">Настройки</h3>
                <button className="mt-3 w-full text-start btn">Чаты<FaRocketchat/></button>
                <button className="mt-3 w-full text-start btn">Кондефициальность<MdSecurity/></button>
                <button className="mt-3 w-full text-start btn">Уведомления<MdOutlineEditNotifications/></button>
                <button className="mt-3 w-full text-start btn">Устройства<MdOutlineDevices/></button>
            
            </div>
        </dialog>
    )
}

export default ProfileEdit