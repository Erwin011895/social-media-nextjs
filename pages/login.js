import { Button, Container, Divider, FormControl, FormLabel, Heading, Input, Stack, useToast } from '@chakra-ui/react'
import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useMutations } from '@/hooks/useMutation';
import { useState } from 'react';

const LayoutComponent = dynamic(() => import("@/components/layout"))

export default function Login() {
  const router = useRouter()
  const { mutate } = useMutations()
  const toast = useToast()
  const [payload, setPayload] = useState({
    email: '',
    password: '',
  })

  const HandleSubmit = async () => {
    console.log('hs', payload)
    const response = await mutate({ url: "https://paace-f178cafcae7b.nevacloud.io/api/login", payload })
    console.log('hs', response)

    if (!response?.success) {
      toast({
        title: "Login gagal",
        description: "email dan password tidak sesuai",
        status: "error",
        duration: 2000,
        isClosable: true,
      })
    } else {
      Cookies.set('user_token', response?.data?.token, {
        expires: new Date(response?.data?.expires_at),
        path: '/'
      })
      router.push('/')
    }
  }

  return (
    <>
      <LayoutComponent metaTitle="Login">
        <Heading marginBottom='4px' >LOGIN</Heading>
        <Stack direction='column' width='full'>
          <FormControl isRequired>
            <Input value={payload.email} onChange={(e) => setPayload({ ...payload, email: e.target.value })} placeholder="email" />
          </FormControl>
          <FormControl>
            <Input value={payload.password} onChange={(e) => setPayload({ ...payload, password: e.target.value })} placeholder="password" type='password' />
          </FormControl>
          <FormControl>
            <Button onClick={HandleSubmit}>Login</Button>
          </FormControl>
        </Stack >
      </LayoutComponent>
    </>
  );
}
