import { Avatar, Card, CardBody, CardHeader, Container, Flex, Text } from "@chakra-ui/react";


export default function ProfileBox({ userData = {} } = {}) {
    return (
        <Card width='full' mb="2">
            <CardHeader>
                <Flex align='center' flexDir='column'>
                    <Avatar size='md' name={userData?.name} />
                    <Text align='center'>{userData?.name}</Text>
                </Flex>
            </CardHeader>
            <CardBody>
                <Flex dir="row" justifyContent='space-between'>
                    <div>
                        <Text fontWeight='bold'>Email</Text>
                        {userData?.email || "-"}
                    </div>
                    <div>
                        <Text fontWeight='bold'>Hobby</Text>
                        {userData?.hobby || "-"}
                    </div>
                    <div>
                        <Text fontWeight='bold'>Dob</Text>
                        {userData?.dob || "-"}
                    </div>
                    <div>
                        <Text fontWeight='bold'>Phone</Text>
                        {userData?.phone || "-"}
                    </div>
                </Flex>
            </CardBody>
        </Card>
    );
}
