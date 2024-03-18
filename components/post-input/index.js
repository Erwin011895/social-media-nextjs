import { useMutations } from "@/hooks/useMutation";
import { Button, Card, CardBody, FormControl, Textarea } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function PostInput({ userData = {} } = {}) {
    const router = useRouter()
    const { mutate } = useMutations()
    const [description, setDescription] = useState("")

    const HandleSubmit = async (post) => {
        console.log('post', post)
        console.log('replyInput', replyInput)
        const payload = {
            description: replyInput.description
        }

        const response = await mutate({
            url: `https://paace-f178cafcae7b.nevacloud.io/api/post`,
            payload,
            headers: {
                "Authorization": `Bearer ${Cookies.get('user_token')}`
            }
        })

        if (!response?.success) {
            toast({
                title: `Failed to post`,
                status: "error",
                duration: 2000,
                isClosable: true,
            })
            console.log('PostInput', response)
        } else {
            toast({
                title: `Success create post`,
                status: "success",
                duration: 1000,
                isClosable: true,
            })
            router.reload()
        }
    }

    return (
        <Card width='full' mb="2">
            <CardBody>
                <FormControl>
                    <Textarea placeholder="what's happening" mb={2} value={description} onChange={(e) => setDescription(e.target.value)} />
                    <Button
                        width='full'
                        colorScheme='blue'
                        isDisabled={description === ""}
                        onClick={() => { HandleSubmit() }}>
                        Post
                    </Button>
                </FormControl>
            </CardBody>
        </Card>
    );
}
