import PostInput from '@/components/post-input';
import Posts from '@/components/posts';
import ProfileBox from '@/components/profile';
import { useQueries } from '@/hooks/useQueries';
import { Spinner } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const LayoutComponent = dynamic(() => import("@/components/layout"))

export default function Profile() {
  const router = useRouter();
  const { id } = router?.query

  const { data, isLoading } = useQueries({
    prefixUrl: `https://paace-f178cafcae7b.nevacloud.io/api/user/${id}`,
    headers: {
      "Authorization": `Bearer ${Cookies.get('user_token')}`
    },
  })

  return (
    <LayoutComponent metaTitle="Profile">
      {
        isLoading ? <Spinner /> : (
          <ProfileBox userData={data?.data} />
        )
      }
      <PostInput />
      <Posts type="user" userId={data?.data?.id} />
    </LayoutComponent>
  );
}
