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
  Text
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { useContext } from 'react';
import { BiLike, BiReply } from 'react-icons/bi'

const LayoutComponent = dynamic(() => import("@/components/layout"))

export default function Notifications() {
  const { data, isLoading, isError } = useQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/notifications",
    headers: {
      "Authorization": `Bearer ${Cookies.get('user_token')}`
    },
  })

  const userData = useContext(UserContext)

  console.log(data?.data)

  return (
    <>
      <LayoutComponent metaTitle="Notification">
        {
          data?.data?.map((notif) => (
            <Card maxW='md'>
              <CardHeader>
                <Flex spacing='4'>
                  <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Text>{notif?.user?.name
                      ?.split(" ")
                      .reduce((acc, s) => acc + s[0], "")
                      .toUpperCase()}</Text>

                    <Box>
                      <Heading size='sm'>{notif?.user?.name} {notif?.user?.email === userData.email ? "(You)" : ""}</Heading>
                      <Text>{notif?.user?.email}</Text>
                      <Text fontSize='0.8em'>{notif?.created_at}</Text>
                    </Box>
                  </Flex>
                  <IconButton
                    variant='ghost'
                    colorScheme='gray'
                    aria-label='See menu'
                  />
                </Flex>
              </CardHeader>
              <CardBody>
                <Text>
                  With Chakra UI, I wanted to sync the speed of development with the speed
                  of design. I wanted the developer to be just as excited as the designer to
                  create a screen.
                </Text>
              </CardBody>
              <Image
                objectFit='cover'
                src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                alt='Chakra UI'
              />

              <CardFooter
                justify='space-between'
                flexWrap='wrap'
                sx={{
                  '& > button': {
                    minW: '136px',
                  },
                }}
              >
                <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
                  Like
                </Button>
                <Button flex='1' variant='ghost' leftIcon={<BiReply />}>
                  Reply
                </Button>
              </CardFooter>
            </Card>
          ))
        }
      </LayoutComponent>
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