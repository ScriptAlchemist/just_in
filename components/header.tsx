import Link from 'next/link'

const Header = () => {
  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
      <Link href="/" className="border border-indigo-500 hover:border-red-500 rounded-xl bg-stone-900 hover:bg-stone-800 p-4 text-center justify-center flex">
      {'<-'} Home  
      </Link>
    </h2>
  )
}

export default Header
