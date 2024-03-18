import { useQueries } from '@/hooks/useQueries';
import {
  Spinner,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import Post from './post';

export default function Posts({ type = 'all', userId = 0 }) {
  let url = `https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all`
  if (type !== 'all' && userId > 0) {
    url = `https://paace-f178cafcae7b.nevacloud.io/api/posts/${userId}`
  }

  const { data, isLoading, isError } = useQueries({
    prefixUrl: url,
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

