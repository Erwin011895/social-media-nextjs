import { UserContext } from "@/context/userContext";
import { Button, Card, CardBody, FormControl, Textarea } from "@chakra-ui/react";
import { useContext, useState } from "react";


export default function PostInput({ userData = {} } = {}) {
    const initialName = userData?.name
        ?.split(" ")
        .reduce((acc, s) => acc + s[0], "")
        .toUpperCase();

    const [postContent, setPostContent] = useState("")

    return (
        <Card width='full' mb="2">
            <CardBody>
                <FormControl>
                    <Textarea placeholder="what's happening" mb={2} value={postContent} onChange={(e) => setPostContent(e.target.value)} />
                    <Button width='full' colorScheme='blue' isDisabled={postContent === ""}>Post</Button>
                </FormControl>
            </CardBody>
        </Card>
    );
}
