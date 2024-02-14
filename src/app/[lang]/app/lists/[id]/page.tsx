'use client'

import { supabase } from '@/services/supabase'
import { List } from '@/types/supabase/lists'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'

import { ListItems } from './components/list-items'
import { Skeleton } from '@/components/ui/skeleton'
import { DataTableSkeleton } from './components/data-table-skeleton'
import { useAuth } from '@/context/auth'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/context/language'
import { Banner } from '@/components/banner'
import { tmdbImage } from '@/utils/tmdb/image'

const ListPage = ({ params }: { params: { id: string } }) => {
  const { user } = useAuth()
  const { push } = useRouter()
  const { dictionary } = useLanguage()

  const { data: response, isLoading } = useQuery({
    queryKey: [params.id],
    queryFn: async () => {
      const response = await supabase
        .from('lists')
        .select('*, list_items(*, id)')
        .eq('id', params.id)
        .order('created_at', { referencedTable: 'list_items' })
        .single<List>()

      return response
    },
  })

  if (isLoading) {
    return (
      <>
        <div className={`h-[80vh] border bg-muted/5`} />

        <div className="mx-auto max-w-5xl space-y-4 px-4 py-6">
          <div>
            <Skeleton className="mb-2 h-8 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>

          <div className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>

          <DataTableSkeleton />
        </div>
      </>
    )
  }

  if (!response?.data) {
    return (
      <div className="mx-auto max-w-5xl space-y-4 px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {dictionary.list_page.list_not_found}
            </h1>

            <p className="text-muted-foreground">
              {dictionary.list_page.see_your_lists_or_create_new}{' '}
              <Link href="/app/lists" className="underline">
                {dictionary.list_page.here}
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  const list = response.data

  // TODO: REVER ISSO
  if (user.id !== list.user_id) push('/app/lists')

  return (
    <>
      <Banner url={tmdbImage(list.cover_path ?? '')} />

      <div className="mx-auto max-w-5xl space-y-4 px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{list.name}</h1>
            <p className="text-muted-foreground">{list.description}</p>
          </div>
        </div>

        <ListItems listItems={list.list_items} />
      </div>
    </>
  )
}

export default ListPage