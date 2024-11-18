'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, PlusCircle, MinusCircle } from 'lucide-react'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@plotwist/ui/components/ui/hover-card'
import { DropdownMenuItem } from '@plotwist/ui/components/ui/dropdown-menu'
import { Skeleton } from '@plotwist/ui/components/ui/skeleton'

import { ItemHoverCard } from '@/components/item-hover-card'

import { tmdbImage } from '@/utils/tmdb/image'
import { useLanguage } from '@/context/language'

import { ListCommandGroup } from './list-command-group'
import { ListCommandItem } from './list-command-item'
import { HoverCardPortal } from '@radix-ui/react-hover-card'

import { MovieWithMediaType } from '@/services/tmdb'
import { ListCommandProps } from './list-command'

type ListCommandMoviesProps = {
  movies: MovieWithMediaType[]
} & Pick<ListCommandProps, 'onAdd' | 'onRemove' | 'items'>

export const ListCommandMovies = ({
  movies,
  items,
  onAdd,
  onRemove,
}: ListCommandMoviesProps) => {
  const { language, dictionary } = useLanguage()

  return (
    <ListCommandGroup.Root>
      <ListCommandGroup.Label>
        {dictionary.list_command.movies_label}
      </ListCommandGroup.Label>

      <ListCommandGroup.Items>
        {movies.map((movie) => {
          const includedItem = items.find(
            (listItem) => listItem.tmdbId === movie.id,
          )

          return (
            <HoverCard key={movie.id} openDelay={0} closeDelay={0}>
              <ListCommandItem.Root>
                <HoverCardTrigger>
                  <ListCommandItem.Label>
                    {movie.title}

                    {movie.release_date !== '' && (
                      <ListCommandItem.Year>
                        • {new Date(movie.release_date).getFullYear()}
                      </ListCommandItem.Year>
                    )}
                  </ListCommandItem.Label>
                </HoverCardTrigger>

                <ListCommandItem.Dropdown>
                  {includedItem ? (
                    <DropdownMenuItem onClick={() => onRemove(includedItem.id)}>
                      <MinusCircle size={14} className="mr-1" />
                      {dictionary.list_command.remove_from_list}
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem onClick={() => onAdd(movie.id, 'MOVIE')}>
                      <PlusCircle size={14} className="mr-1" />
                      {dictionary.add_to_list}
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem asChild>
                    <Link href={`/${language}/movies/${movie.id}`}>
                      <ExternalLink size={14} className="mr-1" />
                      {dictionary.list_command.view_details}
                    </Link>
                  </DropdownMenuItem>
                </ListCommandItem.Dropdown>
              </ListCommandItem.Root>

              <HoverCardPortal>
                <HoverCardContent
                  className="w-[320px] overflow-hidden rounded-lg p-0"
                  side="top"
                  align="start"
                >
                  <ItemHoverCard.Banner>
                    {movie.backdrop_path && (
                      <Image
                        src={tmdbImage(movie.backdrop_path)}
                        alt={movie.title}
                        fill
                      />
                    )}
                  </ItemHoverCard.Banner>

                  <ItemHoverCard.Information>
                    <ItemHoverCard.Poster>
                      {movie.poster_path && (
                        <Image
                          src={tmdbImage(movie.poster_path, 'w500')}
                          alt={movie.title}
                          fill
                          objectFit="cover"
                        />
                      )}
                    </ItemHoverCard.Poster>

                    <ItemHoverCard.Summary>
                      <ItemHoverCard.Title>{movie.title}</ItemHoverCard.Title>

                      <ItemHoverCard.Overview>
                        {movie.overview}
                      </ItemHoverCard.Overview>
                    </ItemHoverCard.Summary>
                  </ItemHoverCard.Information>
                </HoverCardContent>
              </HoverCardPortal>
            </HoverCard>
          )
        })}
      </ListCommandGroup.Items>
    </ListCommandGroup.Root>
  )
}

export const ListCommandMoviesSkeleton = () => {
  const { dictionary } = useLanguage()

  return (
    <ListCommandGroup.Root>
      <ListCommandGroup.Label>
        {dictionary.list_command.movies_label}
      </ListCommandGroup.Label>

      <ListCommandGroup.Items>
        {Array.from({ length: 5 }).map((_, index) => (
          <ListCommandItem.Root key={index}>
            <ListCommandItem.Label>
              <Skeleton className="h-[1.5ex] w-[30ch]" />

              <ListCommandItem.Year>
                • <Skeleton className="h-[1.5ex] w-[4ch]" />
              </ListCommandItem.Year>
            </ListCommandItem.Label>

            <Skeleton className="h-5 w-5" />
          </ListCommandItem.Root>
        ))}
      </ListCommandGroup.Items>
    </ListCommandGroup.Root>
  )
}