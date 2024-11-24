'use client'

import type { GetListById200List } from '@/api/endpoints.schemas'
import { getGetListsQueryKey, usePatchListBanner } from '@/api/list'
import { ImagePicker } from '@/components/image-picker'
import { APP_QUERY_CLIENT } from '@/context/app'
import { useLanguage } from '@/context/language'
import { useListMode } from '@/context/list-mode'
import { cn } from '@/lib/utils'
import { tmdbImage } from '@/utils/tmdb/image'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type ListBannerProps = {
  list: GetListById200List
}

export function ListBanner({ list }: ListBannerProps) {
  const { mode } = useListMode()
  const { dictionary } = useLanguage()
  const patchBanner = usePatchListBanner()
  const { refresh } = useRouter()

  if (mode === 'EDIT') {
    return (
      <ImagePicker.Root
        onSelect={(image, onClose) => {
          patchBanner.mutateAsync(
            {
              data: {
                bannerPath: image.file_path,
                listId: list.id,
              },
            },
            {
              onSuccess: async () => {
                await APP_QUERY_CLIENT.invalidateQueries({
                  queryKey: getGetListsQueryKey(),
                })

                refresh()
                onClose()

                toast.success(
                  dictionary.list_item_actions.cover_changed_successfully
                )
              },
            }
          )
        }}
      >
        <ImagePicker.Trigger>
          <section
            className={cn(
              'group relative flex h-[30dvh] max-h-[720px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-none border lg:h-[55dvh] lg:rounded-lg',
              !list.bannerPath && 'border-dashed'
            )}
          >
            {list.bannerPath && (
              <Image
                src={tmdbImage(list.bannerPath)}
                alt=""
                fill
                className="object-cover"
              />
            )}

            <div className="z-5 absolute h-full w-full bg-black/30 opacity-0 transition-all group-hover:opacity-100" />

            <p className="spacing z-[6] scale-0 text-xs  font-bold uppercase tracking-wider text-white transition-all group-hover:scale-100">
              {dictionary.profile_banner.change_banner}
            </p>
          </section>
        </ImagePicker.Trigger>
      </ImagePicker.Root>
    )
  }

  return (
    <section className="relative flex h-[30dvh] max-h-[720px] w-full items-center justify-center overflow-hidden rounded-none border lg:h-[55dvh] lg:rounded-lg">
      {list.bannerPath && (
        <Image
          src={tmdbImage(list.bannerPath)}
          alt=""
          fill
          className="object-cover"
        />
      )}
    </section>
  )
}