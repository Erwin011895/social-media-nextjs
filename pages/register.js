import { Button, Container, Divider, FormControl, FormLabel, Heading, Input, Stack, Text, useToast } from '@chakra-ui/react'
import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useMutations } from '@/hooks/useMutation';
import { useState } from 'react';
import Link from 'next/link';

const LayoutComponent = dynamic(() => import("@/components/layout"))

export default function Register() {
  const router = useRouter()
  const { mutate } = useMutations()
  const toast = useToast()
  const [payload, setPayload] = useState({
    name: '',
    email: '',
    dob: '',
    phone: '',
    hobby: '',
    password: '',
  })

  const HandleSubmit = async () => {
    const response = await mutate({ url: "https://paace-f178cafcae7b.nevacloud.io/api/register", payload })

    if (!response?.success) {
      toast({
        title: "Register gagal",
        description: "",
        status: "error",
        duration: 2000,
        isClosable: true,
      })
    } else {
      router.push('/login')
    }
  }

  return (
    <>
      <LayoutComponent metaTitle="Register">
        <Heading marginBottom='4px' >Register</Heading>
        <Stack direction='column' width='sm'>
          <FormControl isRequired>
            <Input value={payload.name} onChange={(e) => setPayload({ ...payload, name: e.target.value })} placeholder="name" />
          </FormControl>
          <FormControl isRequired>
            <Input value={payload.email} onChange={(e) => setPayload({ ...payload, email: e.target.value })} placeholder="email" />
          </FormControl>
          <FormControl>
            <Input value={payload.dob} onChange={(e) => setPayload({ ...payload, dob: e.target.value })} placeholder="dob" type="date" />
          </FormControl>
          <FormControl>
            <Input value={payload.phone} onChange={(e) => setPayload({ ...payload, phone: e.target.value })} placeholder="phone" />
          </FormControl>
          <FormControl>
            <Input value={payload.hobby} onChange={(e) => setPayload({ ...payload, hobby: e.target.value })} placeholder="hobby" />
          </FormControl>
          <FormControl isRequired>
            <Input value={payload.password} onChange={(e) => setPayload({ ...payload, password: e.target.value })} placeholder="password" type='password' />
          </FormControl>
          <FormControl>
            <Button onClick={HandleSubmit} colorScheme='blue' width='full'>Login</Button>
          </FormControl>
          <FormControl>
            Don't have account? &nbsp;
            <Link href="/register">
              <Text as='span' fontWeight='bold'>Register Now</Text>
            </Link>
          </FormControl>
        </Stack >
      </LayoutComponent>
    </>
  );
}
