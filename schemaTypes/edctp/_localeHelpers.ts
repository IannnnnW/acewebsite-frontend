import { defineField } from 'sanity'

export const localeString = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    type: 'object',
    description,
    fields: [
      { name: 'en', title: '🇬🇧 English', type: 'string' },
      { name: 'fr', title: '🇫🇷 French (Français)', type: 'string' },
    ],
  })

export const localeText = (name: string, title: string, rows = 3, description?: string) =>
  defineField({
    name,
    title,
    type: 'object',
    description,
    fields: [
      { name: 'en', title: '🇬🇧 English', type: 'text', rows },
      { name: 'fr', title: '🇫🇷 French (Français)', type: 'text', rows },
    ],
  })

export const localeBlock = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      { name: 'en', title: '🇬🇧 English', type: 'array', of: [{ type: 'block' }] },
      { name: 'fr', title: '🇫🇷 French (Français)', type: 'array', of: [{ type: 'block' }] },
    ],
  })

export const localeStringArray = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    type: 'object',
    description,
    fields: [
      { name: 'en', title: '🇬🇧 English', type: 'array', of: [{ type: 'string' }] },
      { name: 'fr', title: '🇫🇷 French (Français)', type: 'array', of: [{ type: 'string' }] },
    ],
  })
