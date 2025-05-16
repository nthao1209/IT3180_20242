import ActivityDateSelect from '@/components/activity-date-select'
import { prisma } from '@/lib/prisma'
import { addDays, format, parse } from 'date-fns'
import { Calendar, Clock } from 'lucide-react'
import React from 'react'

async function Activities({
    searchParams
}: { searchParams: { from: string, to: string } }) {

    const params = await searchParams
    const activities = await prisma.activities.findMany({
        where: {
            activity_date: {
                gte: parse(params.from, 'yyyy-MM-dd', new Date()),
                lte: addDays(parse(params.to, 'yyyy-MM-dd', new Date()), 1)
            }
        },
        orderBy: {
            activity_date: 'asc'
        }
    })
    return (
        <>
            <div className="max-w-7xl mx-auto flex-col p-4 pt-16 space-y-8 sm:space-x-4">
                <ActivityDateSelect />
                {
                    activities && activities.length > 0 ?
                    <>
                        <p className='text-2xl sm:text-4xl'>Activites</p>
                        <div className="flex flex-col space-y-4 pt-16 w-full">
                            {
                                activities.map(activity => (
                                    <div key={activity.activity_id} className='border
                                     border-gray-500 rounded-md p-4 w-full space-y-2'>
                                        <div className="flex-flex-col sm:flex-row sm:justify-between sm:items-center">
                                            <p className='text-xl font-bold capitalize'>{activity.title}</p>
                                            <p className='text-sm text-gray-500'>{activity.age_group}</p>
                                        </div>
                                        <p>{activity.description}</p>
                                        <div className="pt-4 pb-4 space-y-2">
                                            <p className='text-sm flex items-center text-blue-500'>
                                                <Calendar size={16} className='mr-2' />{format(activity.activity_date, 'MMM, dd yyyy')}
                                            </p>
                                            <p className='text-sm flex items-center text-blue-500'>
                                                <Clock size={16} className='mr-2' />{activity.start_time} - {activity.end_time}
                                            </p>
                                        </div>
                                        <p className='text-sm text-gray-500'>Capacity {activity.capacity}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                    : activities.length === 0 && <p className="text-2xl sm:text-4xl font-bold text-slate-500 pt-16 pb-16 text-center uppercase tracking-wide">No activities</p>
                }
            </div>
        </>
    )
}

export default Activities