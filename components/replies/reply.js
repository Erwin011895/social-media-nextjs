import {
  Avatar,
  Card,
  CardBody,
  Flex,
  Tag,
  TagLabel,
  Text,
} from '@chakra-ui/react';
import { format } from 'date-fns'
import Link from 'next/link';

export default function Reply({ reply = {} }) {

  return (
    <Card width='full' mb={'2'} key={reply?.id}>
      <CardBody padding='2'>
        <Flex flexDir='column'>
          <Link href={'/profile/' + (reply?.is_own_reply ? '' : reply?.user?.id)}>
            <Tag size='lg' colorScheme='gray' borderRadius='full' mr={2}>
              <Avatar
                size='xs'
                name={reply?.user?.name}
                ml={-1}
                mr={2}
              />
              <TagLabel>{reply?.user?.name} {reply?.is_own_reply && '(You)'}</TagLabel>
            </Tag>
          </Link>
          <Text fontSize='xs'>{format(reply?.created_at, "E LLL d yyyy")}</Text>
          <Text>{reply?.description}</Text>
        </Flex>
      </CardBody>
    </Card>
  );
}

// const sampleReplies = {
//   "success": true,
//   "data": [
//     {
//       "id": 203,
//       "description": "JUARAAA !!!!!",
//       "posts_id": 1,
//       "users_id": 88,
//       "deleted_at": null,
//       "created_at": "2024-01-05T17:36:37.000000Z",
//       "updated_at": "2024-01-05T17:36:37.000000Z",
//       "is_own_reply": false,
//       "user": {
//         "id": 88,
//         "name": "sheva",
//         "email": "sheva@gmail.com"
//       }
//     },
//     {
//       "id": 176,
//       "description": "JUARAAA !!!!!",
//       "posts_id": 1,
//       "users_id": 88,
//       "deleted_at": null,
//       "created_at": "2024-01-05T06:40:21.000000Z",
//       "updated_at": "2024-01-05T06:40:21.000000Z",
//       "is_own_reply": false,
//       "user": {
//         "id": 88,
//         "name": "sheva",
//         "email": "sheva@gmail.com"
//       }
//     }
//   ],
//   "message": "Fetch replies success"
// }