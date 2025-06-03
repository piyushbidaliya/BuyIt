import { useSelector } from 'react-redux'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'

function Dashboard() {
  const user = useSelector(state => state.user)
  return (
    <section className='bg-white '>
        <div className='mx-auto p-3 flex w-screen'>
            {/* left section */}
            <div className='p-4 sticky top-20 max-h-[calc(100vh-96px)] overflow-y-auto hidden lg:block w-1/4 border-r border-slate-200'>
                <UserMenu/>
            </div>
            {/* right section */}
            <div className='bg-white w-full min-h-[80vh]'>
                <Outlet/>
            </div>
        </div>
    </section>
  )
}

export default Dashboard
