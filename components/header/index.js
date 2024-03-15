import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu"
import Link from "next/link"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { Avatar, Button, Flex, Text, useToast } from "@chakra-ui/react";
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { useContext } from "react"
import { UserContext } from "@/context/userContext"
import { useMutations } from '@/hooks/useMutation';

export default function Header() {
  const router = useRouter()
  const userData = useContext(UserContext)
  const { mutate } = useMutations();
  const toast = useToast()

  const HandleLogout = async () => {
    const response = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/logout",
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${Cookies.get('user_token')}`
      }
    })

    if (!response?.success) {
      toast({
        title: "Logout gagal",
        description: "",
        status: "error",
        duration: 2000,
        isClosable: true,
      })
      console.log('gagal logout', response)
    } else {
      Cookies.remove('user_token')
      router.push('/login')
    }
  }

  const HandleRoute = async (link) => {
    router.push(link);
  }

  return (
    <Flex width="full" justify="center" marginBottom='4px'>
      <Flex px="4" w="full" align="center" justify="space-between" maxW="1200px">
        <Link href="/">
          <Text fontSize='1.5em' fontWeight='bold'>Social Media</Text>
        </Link>

        {userData && (
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size='sm'
                name={userData?.name}
              />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => HandleRoute('/profile')}>My Profile</MenuItem>
              <MenuItem onClick={() => HandleRoute('/notifications')}>Notification</MenuItem>
              <MenuItem onClick={() => HandleLogout()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex >
    </Flex >
  )
}
