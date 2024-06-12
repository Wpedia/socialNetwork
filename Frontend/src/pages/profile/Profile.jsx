import React from 'react'
import UserProfileCard from '../../components/profile/UserProfileCard'
import UserProfilePost from '../../components/profile/UserProfilePost'
import { UserProfilePostForm } from '../../components/profile/UserProfilePostForm'
import { UserProfileSidebar } from '../../components/profile/UserProfileSidebar'
import { useAuthContext } from '../../context/AuthContext'
import { useParams } from 'react-router-dom';
import PhotoInterface from '../../components/profile/PhotoInterface/PhotoInterface'
import useGetViewedProfile from '../../hooks/useGetViewedProfile'



const Profile = () => {

  const { profileId } = useParams();
  const { authUser } = useAuthContext();

  const userIdToFetch = profileId !== undefined ? profileId : authUser._id;
  const isAuthUserProfile = userIdToFetch === authUser._id

  const { loading, error, profile, user } = useGetViewedProfile(userIdToFetch);

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  return (
    <div>
      {
        loading ? (
            <div className='loading loading-spinner absolute'></div>
        ) : (
          <div className="pb-8 px-5 py-5">
            <UserProfileCard isAuthUserProfile={isAuthUserProfile} userId={authUser._id} viewedProfile={profile} viewedUser={user} />
            <div className="grid grid-cols-5 h-full gap-3">
              <div className="lg:col-span-3 sm:col-span-3">
                <div>
                  <PhotoInterface viewedProfile={profile} viewedUser={user} />
                </div>
                {authUser._id === userIdToFetch && <UserProfilePostForm authorId={authUser._id} viewedProfile={profile} viewedUser={user} />}
                <div className="">
                  <UserProfilePost isAuthUserProfile={isAuthUserProfile} authUser={authUser} viewedProfile={profile} viewedUser={user} />
                </div>
              </div>
              <UserProfileSidebar userIdToFetch={userIdToFetch} viewedProfile={profile} viewedUser={user} />
            </div>
          </div>

        )}
    </div>
  )
}

export default Profile