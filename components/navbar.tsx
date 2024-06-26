import Link from 'next/link'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from './ui/navigationMenu'
import { BackgroundGradient } from './ui/backgroundGradiant'
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import { useRouter } from 'next/router'


export const Navbar = () => {
  const router = useRouter();
  return (
    <>
      <NavigationMenu className='flex flex-col w-full mb-10'>
        <section className="flex flex-col">
          <div className="flex flex-col sm:flex-row items-center md:justify-around mt-8 max-w-5xl w-full sm:w-5/6 mx-auto ">
            <Link href='/'>
              <h1 className="mr-auto md:mr-0 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:pr-8"> <span className="underline decoration-indigo-500">
                  Some
                </span>
                <span className="text-red-500">
                  (
                </span>
                <span className="underline decoration-indigo-500">
                Scripting
                </span>
                <span className="text-red-500">
                  )
                </span>
                <div className='text-sm tracking-wider'>By Justin Bender</div>
              </h1>
            </Link>
              <div className="flex flex-wrap gap-4 justify-around w-full text-center text-lg mt-5 md:mt-0">
                <Link
                  title="Visit Justins LinkedIn"
                  href="https://www.linkedin.com/in/benderjustin"
                  className="duration-200 transition-colors text-blue-500 group"
                >
                  <BackgroundGradient className='px-3 bg-black text-white rounded-3xl flex items-center gap-x-2'>
                    <IconBrandLinkedin className='w-5 h-5 md:w-8 md:h-8 text-blue-700 m-3 group-hover:text-blue-500' />
                  </BackgroundGradient>
                </Link>
                <Link
                  title="Visit Justins Twitter"
                  href="https://twitter.com/ScriptAlchemist"
                  className="duration-200 transition-colors group"
                >
                  <BackgroundGradient className='px-3 bg-black text-white rounded-3xl flex items-center gap-x-2'>
                    <svg viewBox="0 0 1200 1227" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="none" className="fill-stone-300 w-5 h-5 md:w-8 md:h-8 m-3 group-hover:fill-stone-100"> 
                     <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"></path> 
                    </svg>
                  </BackgroundGradient>
                </Link>
                <Link
                  title="Visit Justins Github"
                  href="https://github.com/ScriptAlchemist"
                  className="duration-200 transition-colors group"
                >
                  <BackgroundGradient className='px-3 bg-black text-white rounded-3xl flex items-center gap-x-2'>
                    <IconBrandGithub className='w-5 h-5 md:w-8 md:h-8 text-orange-700 m-3 group-hover:text-orange-500' />
                  </BackgroundGradient>
                </Link>
              </div>
          </div>
        </section>
        <NavigationMenuList className='flex'>
            <div className='flex flex-row w-full max-w-screen-lg mx-5 sm:mx-20 mt-5 gap-x-3 gap-y-4 sm:gap-x-8'>
              {router.pathname !== '/' && 
                <NavigationMenuItem className='flex-1'>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink active={router.pathname === '/'} className={navigationMenuTriggerStyle()}>
                      Home 
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              }
              {/*
              <NavigationMenuItem className='flex-1'>
                <Link href="/about-me" legacyBehavior passHref>
                  <NavigationMenuLink active={router.pathname === '/about-me'} className={navigationMenuTriggerStyle()}>
                    About me 
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            */}
            </div>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  )
}

