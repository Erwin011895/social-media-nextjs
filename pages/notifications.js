import { UserContext } from '@/context/userContext';
import { useQueries } from '@/hooks/useQueries';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  Tag,
  TagLabel,
  Text
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';

const LayoutComponent = dynamic(() => import("@/components/layout"))

export default function Notifications() {
  const { data, isLoading, isError } = useQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/notifications",
    headers: {
      "Authorization": `Bearer ${Cookies.get('user_token')}`
    },
  })

  return (
    <>
      <LayoutComponent metaTitle="Notification">
        {
          data?.data?.map((notif) => (
            <Card width='full' mb={'2'}>
              <CardBody padding='2'>
                <Flex dir='row'>
                  <Link href={'/profile/' + notif?.user?.id}>
                    <Tag size='lg' colorScheme='red' borderRadius='full' mr={2}>
                      <Avatar
                        size='xs'
                        name={notif?.user?.name}
                        ml={-1}
                        mr={2}
                      />
                      <TagLabel>{notif?.user?.name}</TagLabel>
                    </Tag>
                  </Link>
                  <Text lineHeight={8}> {notif?.remark} your post, "ago"</Text>
                </Flex>
              </CardBody>
            </Card>
          ))
        }
      </LayoutComponent >
    </>
  );
}

let x = {
  "id": 361,
  "remark": "like",
  "read": false,
  "created_at": "2024-01-05T12:55:08.000000Z",
  "updated_at": "2024-01-05T12:55:08.000000Z",
  "user": {
    "id": 88,
    "name": "sheva",
    "email": "sheva@gmail.com",
    "dob": null,
    "phone": null,
    "hobby": null,
    "deleted_at": null,
    "created_at": "2024-01-04T07:26:49.000000Z",
    "updated_at": "2024-01-04T07:26:49.000000Z"
  },
  "posts": {
    "id": 175,
    "description": "2024 jan hello [update]",
    "users_id": 2,
    "deleted_at": null,
    "created_at": "2024-01-05T12:09:06.000000Z",
    "updated_at": "2024-02-13T06:22:29.000000Z",
    "is_like_post": true,
    "is_own_post": true,
    "user": {
      "id": 2,
      "name": "Rehan Firdaus",
      "email": "rehan@mail.com",
      "dob": null,
      "phone": null,
      "hobby": null,
      "deleted_at": null,
      "created_at": "2023-10-08T07:14:55.000000Z",
      "updated_at": "2024-02-13T01:56:16.000000Z"
    }
  }
}