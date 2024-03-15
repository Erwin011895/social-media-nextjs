import { UserContext } from "@/context/userContext";
import { Button, Card, CardBody, FormControl, Textarea } from "@chakra-ui/react";
import { useContext } from "react";


export default function PostInput({ userData = {} } = {}) {
    const initialName = userData?.name
        ?.split(" ")
        .reduce((acc, s) => acc + s[0], "")
        .toUpperCase();

    return (
        <Card width='full' mb="2">
            <CardBody>
                <FormControl>
                    <Textarea placeholder="what's happening" mb={2}></Textarea>
                    <Button width='full' colorScheme='blue'>Post</Button>
                </FormControl>
            </CardBody>
        </Card>
    );
}
