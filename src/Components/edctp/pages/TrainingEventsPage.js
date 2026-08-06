'use client'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import { useI18n } from '@/lib/idmI18n'
import { loc } from '@/lib/edctpLocalize'
import { generateICS, googleCalendarUrl } from '@/lib/ics'
import IdmPageHeader from '@/Components/edctp/IdmPageHeader'

function formatEventDate(dt, locale) {
  if (!dt) return null
  return new Date(dt).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

function formatEventTime(dt, locale) {
  if (!dt) return null
  return new Date(dt).toLocaleTimeString(locale === 'fr' ? 'fr-FR' : 'en-GB', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })
}

export default function TrainingEventsPage({ events }) {
  const { t, locale } = useI18n()

  return (
    <>
      <IdmPageHeader
        eyebrow={t('nav.training')}
        title={t('nav.trainingEvents')}
        breadcrumb={[
          { label: t('nav.training'), href: '/edctp-idm/training' },
          { label: t('nav.trainingEvents'), href: '/edctp-idm/training/events' },
        ]}
      />

      <div className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {!events?.length ? (
            <p className="text-center text-gray-400 py-12">{t('training.emptyEvents')}</p>
          ) : (
            <div className="space-y-5">
              {events.map((event) => {
                const title = loc(event.title, locale)
                const description = loc(event.description, locale)
                // The ICS/Google Calendar utilities expect plain strings
                const calendarEvent = { ...event, title, description }

                return (
                  <div key={event._id} className="rounded-2xl border border-idblue-100 bg-idblue-50/50 p-6">
                    <h2 className="font-semibold text-gray-900 text-lg mb-3">{title}</h2>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1.5">
                        <CalendarMonthOutlinedIcon sx={{ fontSize: 16 }} className="text-idblue-500" />
                        {formatEventDate(event.startDateTime, locale)}
                      </span>
                      {event.startDateTime && (
                        <span className="flex items-center gap-1.5">
                          <AccessTimeOutlinedIcon sx={{ fontSize: 16 }} className="text-idblue-500" />
                          {formatEventTime(event.startDateTime, locale)}
                          {event.endDateTime && ` – ${formatEventTime(event.endDateTime, locale)}`}
                        </span>
                      )}
                      {event.location && (
                        <span className="flex items-center gap-1.5">
                          <PlaceOutlinedIcon sx={{ fontSize: 16 }} className="text-idblue-500" />
                          {event.location}
                        </span>
                      )}
                    </div>

                    {description && <p className="text-sm text-gray-600 leading-relaxed">{description}</p>}

                    <div className="mt-4 flex flex-wrap gap-2">
                      <a
                        href={generateICS(calendarEvent)}
                        download={`${(title || 'event').replace(/\s+/g, '-')}.ics`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-idred-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-idred-800 transition-colors"
                      >
                        <FileDownloadOutlinedIcon sx={{ fontSize: 14 }} />
                        {t('training.addToCalendar')}
                      </a>
                      <a
                        href={googleCalendarUrl(calendarEvent)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-idblue-200 bg-idblue-50 px-3 py-1.5 text-xs font-medium text-idblue-900 hover:bg-idblue-100 transition-colors"
                      >
                        <CalendarMonthOutlinedIcon sx={{ fontSize: 14 }} />
                        {t('training.googleCalendar')}
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
