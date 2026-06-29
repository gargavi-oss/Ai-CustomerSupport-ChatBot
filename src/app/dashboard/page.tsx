import DashboardClient from '@/components/DashboardClient';
import { getSession } from '@/lib/getSession'
import { cookies } from 'next/headers'
import React from 'react'

const page = async () => {
    const session = await getSession();
    const userId = session?.user?.id!
    const email = session?.user?.email!
  return (
    <div>
        <DashboardClient ownerId={userId} email = {email}/>
    </div>
  )
}

export default page