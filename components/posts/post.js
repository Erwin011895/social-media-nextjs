import { UserContext } from '@/context/userContext';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Grid,
  GridItem,
  Textarea,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { BiDotsVerticalRounded, BiHeart, BiReply, BiSolidHeart } from 'react-icons/bi'
import { format } from 'date-fns'
import Link from 'next/link';
import { useMutations } from '@/hooks/useMutation';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Replies from '../replies';

export default function Post({ post = {} }) {
  const userData = useContext(UserContext)
  const { mutate } = useMutations();
  const toast = useToast()

  const ToogleLike = async (post) => {
    const action = post.is_like_post ? 'unlikes' : 'likes';
    const payload = {

    }

    // https://paace-f178cafcae7b.nevacloud.io/api/likes/post/1
    // https://paace-f178cafcae7b.nevacloud.io/api/unlikes/post/1
    const response = await mutate({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/${action}/post/${post.id}`,
      payload,
      headers: {
        "Authorization": `Bearer ${Cookies.get('user_token')}`
      }
    })

    if (!response?.success) {
      toast({
        title: `Failed to ${action} post`,
        status: "error",
        duration: 2000,
        isClosable: true,
      })
      console.log('Post', response)
    } else {
      toast({
        title: `Success ${action} post`,
        status: "success",
        duration: 2000,
        isClosable: true,
      })
      post.is_like_post = !post.is_like_post;
    }
  }

  const [selectedPost, setSelectedPost] = useState({
    id: 0,
  })
  const [replyInput, setReplyInput] = useState({
    description: '',
  })

  const MODAL_TYPE_REPLY = 'REPLY';
  const MODAL_TYPE_EDIT_POST = 'EDIT_POST';
  const MODAL_TYPE_DELETE_POST = 'DELETE_POST';
  const [modalType, setModalType] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const HandleOpenReplies = async (post) => {
    setSelectedPost({
      id: post?.id,
    })
    setModalType(MODAL_TYPE_REPLY)
    console.log(modalType, selectedPost)
    onOpen()
  }

  const HandleSubmitReply = async (post) => {
    setSelectedPost({
      id: post?.id,
    })
    setModalType(MODAL_TYPE_REPLY)
    console.log(modalType, selectedPost)
    onOpen()
  }

  return (
    <Card width='full'>
      <CardHeader>
        <Flex>
          <Flex flex='1' gap='4' alignItems='start' flexWrap='wrap'>
            <Avatar
              size='md'
              name={post?.user?.name}
            />

            <Box flex='3'>
              <Link href={'/profile/' + (post?.is_own_post ? '' : post?.user?.id)}>
                <Heading size='sm'>{post?.user?.name} {post?.is_own_post ? "(You)" : ""}</Heading>
              </Link>
              <Text>{post?.user?.email}</Text>
              <Text fontSize='xs'>
                {format(post?.created_at, "E LLL d yyyy")}
                {post?.created_at === post?.updated_at ? <Badge>Edited</Badge> : ''}
              </Text>
            </Box>
          </Flex>
          {post?.user?.email === userData?.email && (
            <Menu>
              <MenuButton as={IconButton} icon={<BiDotsVerticalRounded />} background='transparent' />
              <MenuList>
                <MenuItem onClick={() => HandleRoute('/profile')}>Edit</MenuItem>
                <MenuItem onClick={() => HandleRoute('/notifications')} color={'red'}>Delete</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>
          {post?.description}
        </Text>
      </CardBody>

      <CardFooter
        justify='space-between'
        flexWrap='wrap'
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        <Button
          flex='1'
          variant='ghost'
          leftIcon={post?.is_like_post ? <BiSolidHeart color='red' /> : <BiHeart />}
          onClick={() => ToogleLike(post)}
        >
          {post?.likes_count} Like
        </Button>
        <Button flex='1' variant='ghost' leftIcon={<BiReply />} onClick={() => { HandleOpenReplies(post) }}>
          {post?.replies_count} Reply
        </Button>

        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {modalType === MODAL_TYPE_REPLY && "Replies Post"}
              {modalType === MODAL_TYPE_EDIT_POST && "Edit Post"}
              {modalType === MODAL_TYPE_DELETE_POST && "Delete Post"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {
                modalType === MODAL_TYPE_REPLY && (
                  <>
                    <Grid gap={2}>
                      <GridItem>
                        <Textarea
                          value={replyInput?.description}
                          onChange={(event) => setReplyInput({ ...replyInput, description: event.target.value })}
                          placeholder='reply post ...'
                        />
                      </GridItem>
                      <GridItem>
                        <Button colorScheme='blue' onClick={() => { HandleSubmitReply(post) }} width='full'>Reply</Button>
                      </GridItem>
                    </Grid>

                    <Replies postId={post?.id} />
                  </>
                )
              }
              {
                modalType === MODAL_TYPE_EDIT_POST && (
                  <Grid gap={2}>
                    <GridItem>
                      <Textarea
                        value={replyInput?.description}
                        onChange={(event) => setReplyInput({ ...replyInput, description: event.target.value })}
                        placeholder='reply post ...'
                      />
                    </GridItem>
                    <GridItem>
                      <Button colorScheme='blue' onClick={() => { HandleOpenReplies(post) }} width='full'>reply</Button>
                    </GridItem>
                  </Grid>
                )
              }
              {
                modalType === MODAL_TYPE_DELETE_POST && (
                  <Grid gap={2}>
                    <GridItem>
                      <Textarea
                        value={replyInput?.description}
                        onChange={(event) => setReplyInput({ ...replyInput, description: event.target.value })}
                        placeholder='reply post ...'
                      />
                    </GridItem>
                    <GridItem>
                      <Button colorScheme='blue' onClick={() => { HandleOpenReplies(post) }} width='full'>reply</Button>
                    </GridItem>
                  </Grid>
                )
              }
            </ModalBody>
            {modalType === MODAL_TYPE_DELETE_POST && (
              <ModalFooter>
                <Button onClick={onClose}>Cancel</Button>
                <Button colorScheme='blue' onClick={null}>Yes</Button>
              </ModalFooter>
            )}
          </ModalContent>
        </Modal>
      </CardFooter>
    </Card>
  );
}

// const sampleAllPosts = {
//   "success": true,
//   "data": [
//     {
//       "id": 342,
//       "description": "Alhamdulillah akhirnya kelar juga brooooo!!!",
//       "users_id": 2,
//       "deleted_at": null,
//       "created_at": "2024-03-15T19:07:28.000000Z",
//       "updated_at": "2024-03-16T16:29:52.000000Z",
//       "likes_count": 0,
//       "replies_count": 0,
//       "is_like_post": false,
//       "is_own_post": true,
//       "user": {
//         "id": 2,
//         "name": "Rehan Firdaus",
//         "email": "rehan@mail.com"
//       }
//     },
//     {
//       "id": 365,
//       "description": "haiy",
//       "users_id": 180,
//       "deleted_at": null,
//       "created_at": "2024-03-16T15:56:19.000000Z",
//       "updated_at": "2024-03-16T15:56:33.000000Z",
//       "likes_count": 1,
//       "replies_count": 0,
//       "is_like_post": false,
//       "is_own_post": false,
//       "user": {
//         "id": 180,
//         "name": "joker",
//         "email": "joker@dot.com"
//       }
//     },
//   ],
//   "message": "Fetch posts success"
// }

