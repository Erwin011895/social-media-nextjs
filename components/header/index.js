import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu"
import Link from "next/link"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { Button, Flex, Text } from "@chakra-ui/react";
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { useContext } from "react"
import { UserContext } from "@/context/userContext"

export default function Header() {
  const router = useRouter()
  const userData = useContext(UserContext)

  const HandleLogout = async () => {
    const response = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/logout",
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${Cookies.get('user_token')}`
      }
    })

    if (!response?.success) {
      console.log('gagal logout', response)
    } else {
      Cookies.remove('user_token')
      router.push('/login')
    }
  }

  return (
    <Flex width="full" justify="center" marginBottom='4px'>
      <Flex px="4" w="full" align="center" justify="space-between" maxW="1200px">
        <Link href="/">
          <Text fontWeight='bold'>Social Media</Text>
        </Link>

        {userData && (
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {userData?.name}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => HandleLogout()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex >
    </Flex >
  )
}