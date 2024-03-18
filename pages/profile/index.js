import PostInput from '@/components/post-input';
import Posts from '@/components/posts';
import ProfileBox from '@/components/profile';
import { UserContext } from '@/context/userContext';
import dynamic from 'next/dynamic';
import { useContext } from 'react';

const LayoutComponent = dynamic(() => import("@/components/layout"))

export default function Profile() {
  const userData = useContext(UserContext)

  return (
    <>
      <LayoutComponent metaTitle="Profile">
        <ProfileBox userData={userData} />
        <PostInput />
        <Posts type='me' userId={userData?.id} />
      </LayoutComponent>
    </>
  );
}
