import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Nhóm 7'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
