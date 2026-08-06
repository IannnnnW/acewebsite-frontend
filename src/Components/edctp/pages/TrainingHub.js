'use client'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined'
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import EventOutlinedIcon from '@mui/icons-material/EventOutlined'
import { useI18n } from '@/lib/idmI18n'
import IdmPageHeader from '@/Components/edctp/IdmPageHeader'

const CARDS = [
  { href: '/edctp-idm/training/sites', icon: <CorporateFareOutlinedIcon sx={{ fontSize: 32 }} />, titleKey: 'nav.trainingSites', color: 'border-t-4 border-idblue-900' },
  { href: '/edctp-idm/training/mentors', icon: <SupervisorAccountOutlinedIcon sx={{ fontSize: 32 }} />, titleKey: 'nav.mentors', color: 'border-t-4 border-idblue-500' },
  { href: '/edctp-idm/training/fellows', icon: <PeopleOutlinedIcon sx={{ fontSize: 32 }} />, titleKey: 'nav.fellows', color: 'border-t-4 border-idred-600' },
  { href: '/edctp-idm/training/events', icon: <EventOutlinedIcon sx={{ fontSize: 32 }} />, titleKey: 'nav.trainingEvents', color: 'border-t-4 border-idblue-900' },
]

export default function TrainingHub() {
  const { t } = useI18n()

  return (
    <>
      <IdmPageHeader
        eyebrow={t('nav.training')}
        title={t('training.title')}
        subtitle={t('training.hubIntro')}
        breadcrumb={[{ label: t('nav.training'), href: '/edctp-idm/training' }]}
      />

      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CARDS.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className={`group bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${card.color}`}
              >
                <div className="text-idblue-900 group-hover:text-idred-600 transition-colors mb-4">
                  {card.icon}
                </div>
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-idblue-500 transition-colors mb-4">
                  {t(card.titleKey)}
                </h2>
                <span className="text-sm font-semibold text-idred-600 group-hover:text-idred-800 inline-flex items-center gap-1.5">
                  {t('common.learnMore')}
                  <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
