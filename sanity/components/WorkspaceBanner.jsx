'use client'
import { useWorkspace } from 'sanity'
import ScienceOutlined from '@mui/icons-material/ScienceOutlined'
import LanguageOutlined from '@mui/icons-material/LanguageOutlined'

export function WorkspaceBanner() {
  const { name } = useWorkspace()
  const isIdm = name === 'edctp-idm'

  return (
    <div
      style={{
        padding: '6px 16px',
        fontSize: '12px',
        fontWeight: 700,
        textAlign: 'center',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        background: isIdm ? '#003366' : '#a71c20',
      }}
    >
      {isIdm
        ? <><ScienceOutlined style={{ fontSize: 14 }} /> Editing: IDM Africa — Infectious Diseases Modelling Africa</>
        : <><LanguageOutlined style={{ fontSize: 14 }} /> Editing: ACE Uganda Main Site</>
      }
    </div>
  )
}
