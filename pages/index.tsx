import Container from '../components/container'
import Layout from '../components/layout'
import Head from 'next/head'
import Link from 'next/link'

export default function Index() {
  return (
    <>
      <Layout>
        <Head>
          <title>{`Some(Scripting) Software Development`}</title>
        </Head>
        <Container>
          <h1>Main Page</h1>
        </Container>
        <Link href="/blog">Blog</Link>
      </Layout>
    </>
  )
}
