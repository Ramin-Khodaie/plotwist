import { getSocialLinks } from '@/api/social-links'
import { getUsersUsername } from '@/api/users'
import { ProBadge } from '@/components/pro-badge'
import { cn } from '@/lib/utils'
import type { PageProps } from '@/types/languages'
import { locale } from '@/utils/date/locale'
import { getDictionary } from '@/utils/dictionaries'
import { tmdbImage } from '@/utils/tmdb/image'
import { Button } from '@plotwist/ui/components/ui/button'
import { format } from 'date-fns'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { PropsWithChildren } from 'react'
import { ProfileBanner } from './_components/profile-banner'
import { ProfileImage } from './_components/profile-image'
import { ProfileTabs } from './_components/profile-tabs'
import { SocialLinks } from './_components/social-links'
import { UserDialog } from './_components/user-dialog'
import { UserResumeStats } from './_components/user-resume-stats'
import { LayoutProvider } from './_context'

export type UserPageProps = PageProps<Record<'username', string>> &
  PropsWithChildren

export async function generateMetadata(
  props: UserPageProps
): Promise<Metadata> {
  const params = await props.params
  const { user } = await getUsersUsername(params.username)

  const title = user.username
  const description = user.biography || ''

  const images = user.bannerPath ? [tmdbImage(user.bannerPath)] : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: 'Plotwist',
      images: images,
    },
    twitter: {
      title,
      description,
      images: images,
      card: 'summary_large_image',
    },
  }
}

export default async function Layout(props: UserPageProps) {
  const { params, children } = props
  const { lang, username } = await params

  const { user } = await getUsersUsername(username)
  const dictionary = await getDictionary(lang)

  const headersList = await headers()
  const headersURL = headersList.get('referer') || ''

  if (!user) {
    redirect(`/${lang}/home`)
  }

  if (headersURL.includes('stats') && user.subscriptionType === 'MEMBER') {
    redirect(`/${lang}#pricing`)
  }

  const { socialLinks } = await getSocialLinks({ userId: user.id })

  return (
    <LayoutProvider userId={user.id}>
      <main className="pb-16 mx-auto max-w-6xl">
        <ProfileBanner profile={user} />

        <section
          className={cn(
            'mx-auto max-w-5xl px-4',
            'flex flex-col',
            'lg:grid lg:grid-cols-3 lg:px-0 lg:gap-8'
          )}
        >
          <aside className="flex flex-col space-y-4 col-span-1 relative">
            <div
              className={cn(
                'flex flex-col items-center gap-8 text-center justify-center sticky top-24',
                'lg:justify-start lg:flex-col lg:text-start lg:items-start'
              )}
            >
              <ProfileImage profile={user} />

              <div
                className={cn(
                  'flex flex-col items-center justify-center gap-2 w-full',
                  'lg:block lg:flex-row'
                )}
              >
                <p className="text-xs text-muted-foreground">
                  {dictionary.member_since}{' '}
                  {format(new Date(user.createdAt), 'MMM/yyyy', {
                    locale: locale[lang],
                  })}
                </p>

                <div className="flex items-center gap-4 mt-2">
                  <h1 className="text-3xl font-bold">{user.username}</h1>

                  <UserDialog user={user} socialLinks={socialLinks}>
                    <Button size="sm" variant="outline">
                      {dictionary.profile_form.dialog_title}
                    </Button>
                  </UserDialog>
                </div>

                <UserResumeStats dictionary={dictionary} userId={user.id} />

                <p className="text-muted-foreground mt-2 text-sm">
                  {user.biography}
                </p>

                <div
                  className={cn(
                    'flex gap-1 flex-wrap mt-4 justify-center',
                    'sm:justify-start'
                  )}
                >
                  {user.subscriptionType === 'PRO' && <ProBadge />}

                  {/* <Badge variant="outline">Potterhead</Badge>
                <Badge variant="outline">Marveleiro</Badge>
                <Badge variant="outline">Jedi</Badge>
                <Badge variant="outline">Tolkienista</Badge>
                <Badge variant="outline">Afiliado</Badge> */}
                </div>

                <SocialLinks socialLinks={socialLinks} />

                {/* <FollowButton userId={user.id} /> */}
                {/* <Followers /> */}
              </div>
            </div>
          </aside>

          <section className="space-y-4 col-span-2 mt-8">
            <ProfileTabs user={user} />

            {children}
          </section>
        </section>
      </main>
    </LayoutProvider>
  )
}
