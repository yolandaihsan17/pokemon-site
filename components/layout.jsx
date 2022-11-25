import Head from 'next/head'
import Logo from '/public/image/logo.png'
import Image from 'next/image'
import Link from 'next/link'

export default function Layout(props) {
  const {
    children = <></>,
    title = 'Pokemon Site',
    description = 'Already got your Pokemon? Check their stats today! We will guide you to know your Pokemon better and grow them into their fully potential'
  } = props

  return (
    <div className=' w-full overflow-x-hidden pb-12'>

      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="navbar bg-base-100">
        <div className='w-full max-w-5xl mx-auto flex flex-row items-center gap-8 justify-start'>
          <Link href={'/'}><Image src={Logo} alt='Pokemon site logo' width={80} height={20} /></Link>
          <Link href={'/'} className=' text-sm'>Home</Link>
          <Link href={'/type'} className=' text-sm'>Pokemon Type</Link>
        </div>
      </div>

      {children}
    </div>
  )
}