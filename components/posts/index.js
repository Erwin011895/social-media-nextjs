import { useQueries } from '@/hooks/useQueries';
import {
  Spinner,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import Post from './post';

export default function Posts({ type = 'all' }) {
  const { data, isLoading, isError } = useQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/posts?type=" + type,
    headers: {
      "Authorization": `Bearer ${Cookies.get('user_token')}`
    },
  })

  return (
    <>
      {
        isLoading ? <Spinner /> :
          data?.data?.map((post) => (
            <Post post={post} key={post?.id} />
          ))
      }
    </>
  );
}

