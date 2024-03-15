import { Container, Divider } from '@chakra-ui/react'
import Header from "@/components/header";
import dynamic from 'next/dynamic';

const LayoutComponent = dynamic(() => import("@/components/layout"))

export default function Home() {

  return (
    <>
      <LayoutComponent>
        <Container>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit atque aperiam nihil amet, odit nostrum inventore repellat facere voluptate deleniti iure repellendus aliquid modi, minima tempora dolores voluptas error est!
        </Container>
      </LayoutComponent>
    </>
    // <Container backgroundColor='#E2E8F0' maxWidth='full' minHeight='100vh'>
    //   <Container maxW='xl' centerContent backgroundColor='#F7FAFC'>

    //     <Divider />
    //   </Container>
    // </Container>
  );
}
