import { useQueries } from '@/hooks/useQueries';
import {
  Center,
  Spinner,
  Text
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import Reply from './reply';
import { useEffect, useState } from 'react';

export default function Replies({ postId = null, isFetch = true, setIsFetch = null }) {
  if (postId === null) {
    return <></>
  }

  let data, isLoading, isError;
  useEffect(() => {
    ({ data, isLoading, isError } = useQueries({
      prefixUrl: `https://paace-f178cafcae7b.nevacloud.io/api/replies/post/${postId}`,
      headers: {
        "Authorization": `Bearer ${Cookies.get('user_token')}`
      }
    }))

    setIsFetch(false)
  }, isFetch)

  return (
    <>
      {
        isLoading ? <Center> <Spinner /> </Center> :
          data?.data?.length === 0 ?
            <Text align='center' mt={2}>No Replies</Text> :
            data?.data?.map((reply) => (
              <Reply reply={reply} key={reply?.id} />
            ))
      }
    </>
  );
}

