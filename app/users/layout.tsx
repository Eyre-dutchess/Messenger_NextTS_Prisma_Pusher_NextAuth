
import getUsers from '../actions/getUsers'
import BgLinear from '../component/BgLinear'
import { Sidebar } from '../component/sidebar/Sidebar'
import { UserList } from './component/UserList'

interface layoutProps {
  children: React.ReactNode
}

export default async function layout({children}: layoutProps){
  const users = await getUsers()

  return(
    <div className='min-w-screen min-h-screen'>
      <BgLinear />
      <Sidebar>
        <div className='h-full'>
            <UserList items={users}/>
            {children}
        </div>
      </Sidebar>
    </div>
  )
}
