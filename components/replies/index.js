import { useQueries } from '@/hooks/useQueries';
import {
  Spinner,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import Reply from './reply';

export default function Replies({ postId = null }) {
  if (postId === null) {
    return <></>
  }

  const { data, isLoading, isError } = useQueries({
    prefixUrl: `https://paace-f178cafcae7b.nevacloud.io/api/replies/post/${postId}`,
    headers: {
      "Authorization": `Bearer ${Cookies.get('user_token')}`
    }
  })

  return (
    <>
      {
        isLoading ? <Spinner /> :
          data?.data?.map((reply) => (
            <Reply reply={reply} key={reply?.id} />
          ))
      }
    </>
  );
}

