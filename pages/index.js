import dynamic from 'next/dynamic';

const LayoutComponent = dynamic(() => import("@/components/layout"))

export default function Home() {

  return (
    <>
      <LayoutComponent metaTitle="Home">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit atque aperiam nihil amet, odit nostrum inventore repellat facere voluptate deleniti iure repellendus aliquid modi, minima tempora dolores voluptas error est!
      </LayoutComponent>
    </>
  );
}
