export const siteAnalyticsEventNames = [
  "page_view",
  "cta_click",
  "lead_submit",
] as const

export type SiteAnalyticsEventName = (typeof siteAnalyticsEventNames)[number]

export const siteAnalyticsAllowedPaths = [
  "/",
  "/accessibilita",
  "/aree-di-intervento",
  "/assessment",
  "/compliance",
  "/convenzione-studio",
  "/insights",
  "/insights/compliance-by-design-workflow-python-gdpr-nis2",
  "/insights/iso-37001-37301-dlgs-231-architettura-integrata",
  "/insights/uni-pdr-125-2022-premialita-pnrr",
  "/metodo",
  "/note-legali",
  "/protocollo-23",
] as const

export const siteAnalyticsTargets = [
  "areas",
  "assessment",
  "compliance",
  "insights",
  "method",
  "protocollo_23",
] as const

export type SiteAnalyticsTarget = (typeof siteAnalyticsTargets)[number]

const allowedPathSet = new Set<string>(siteAnalyticsAllowedPaths)
const targetSet = new Set<string>(siteAnalyticsTargets)

export const isAllowedSiteAnalyticsPath = (value: unknown): value is string =>
  typeof value === "string" && allowedPathSet.has(value)

export const normalizeSiteAnalyticsPath = (
  value: string,
): string | undefined => {
  const withoutQueryOrFragment = value.split(/[?#]/, 1)[0] || "/"
  const normalized = withoutQueryOrFragment.startsWith("/")
    ? withoutQueryOrFragment
    : `/${withoutQueryOrFragment}`

  return isAllowedSiteAnalyticsPath(normalized) ? normalized : undefined
}

export const normalizeSiteAnalyticsTarget = (
  value: unknown,
): SiteAnalyticsTarget | undefined => {
  if (typeof value !== "string") return undefined
  const normalized = value.trim().toLowerCase()
  return targetSet.has(normalized)
    ? (normalized as SiteAnalyticsTarget)
    : undefined
}
