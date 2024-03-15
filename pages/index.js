import PostInput from '@/components/post-input';
import dynamic from 'next/dynamic';

const LayoutComponent = dynamic(() => import("@/components/layout"))

export default function Home() {

  return (
    <>
      <LayoutComponent metaTitle="Home">
        <PostInput />
      </LayoutComponent>
    </>
  );
}
