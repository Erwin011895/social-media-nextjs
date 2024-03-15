import Head from "next/head";
import Header from "../header";
import { Container, Divider } from "@chakra-ui/react";

export default function Layout({ children, metaTitle, metaDescription }) {
  return (
    <div>
      <Head>
        <title>{`Social Media - ${metaTitle}`}</title>
        <meta
          name="description"
          content={metaDescription || "Generated by create next app"}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container backgroundColor='#E2E8F0' maxWidth='full' minHeight='100vh'>
        <Container maxW='xl' centerContent backgroundColor='#F7FAFC'>
          <Header />
          <Divider />
          {children}
        </Container>
      </Container>
    </div>
  );
}