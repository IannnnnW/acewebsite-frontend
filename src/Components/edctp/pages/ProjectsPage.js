'use client'
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import ArchitectureOutlinedIcon from '@mui/icons-material/ArchitectureOutlined'
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined'
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import { useI18n } from '@/lib/idmI18n'
import { loc } from '@/lib/edctpLocalize'
import IdmPageHeader from '@/Components/edctp/IdmPageHeader'

const ICON_MAP = {
  genomics: BiotechOutlinedIcon,
  epidemiology: BarChartOutlinedIcon,
  modelling: ArchitectureOutlinedIcon,
  clinical: LocalHospitalOutlinedIcon,
  surveillance: SearchOutlinedIcon,
  sequencing: ScienceOutlinedIcon,
  bioinformatics: ComputerOutlinedIcon,
  default: FolderOutlinedIcon,
}

function getProjectIcon(keyword) {
  const match = keyword && Object.keys(ICON_MAP).find((k) => keyword.toLowerCase().includes(k))
  const IconComponent = match ? ICON_MAP[match] : ICON_MAP.default
  return <IconComponent sx={{ fontSize: 28 }} />
}

export default function ProjectsPage({ projectTypes }) {
  const { t, locale } = useI18n()

  return (
    <>
      <IdmPageHeader
        eyebrow={t('nav.training')}
        title={t('nav.projects')}
        breadcrumb={[
          { label: t('nav.training'), href: '/edctp-idm/training' },
          { label: t('nav.projects'), href: '/edctp-idm/training/projects' },
        ]}
      />

      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {!projectTypes?.length ? (
            <p className="text-center text-gray-400 py-12">{t('training.emptyProjects')}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {projectTypes.map((pt) => (
                <div key={pt._id} className="rounded-2xl border border-gray-200 bg-white p-6 hover:border-idblue-500 hover:shadow-md transition-all">
                  <div className="text-idblue-900 mb-3">{getProjectIcon(pt.icon)}</div>
                  <h2 className="font-semibold text-gray-900 mb-2">{loc(pt.title, locale)}</h2>
                  {loc(pt.description, locale) && (
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{loc(pt.description, locale)}</p>
                  )}
                  {pt.exampleDatasets?.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">{t('training.exampleDatasets')}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {pt.exampleDatasets.map((ds, i) => (
                          <span key={i} className="text-xs bg-idblue-50 text-idblue-500 rounded-full px-2.5 py-0.5">{ds}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
