import {
  isAllowedSiteAnalyticsPath,
  normalizeSiteAnalyticsTarget,
  siteAnalyticsEventNames,
  type SiteAnalyticsEventName,
  type SiteAnalyticsTarget,
} from "../_shared/siteAnalyticsContract.ts"

export interface ValidSiteAnalyticsPayload {
  eventName: SiteAnalyticsEventName
  pagePath: string
  language: "it"
  sessionId: string
  target: SiteAnalyticsTarget | null
}

const eventNameSet = new Set<string>(siteAnalyticsEventNames)
const allowedPayloadKeys = new Set([
  "eventName",
  "pagePath",
  "language",
  "sessionId",
  "target",
])
const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export const parseSiteAnalyticsPayload = (
  input: Record<string, unknown>,
): ValidSiteAnalyticsPayload | null => {
  if (Object.keys(input).some((key) => !allowedPayloadKeys.has(key))) return null

  const eventName = input.eventName
  const pagePath = input.pagePath
  const language = input.language
  const sessionId = input.sessionId
  const rawTarget = input.target

  if (
    typeof eventName !== "string" ||
    !eventNameSet.has(eventName) ||
    !isAllowedSiteAnalyticsPath(pagePath) ||
    language !== "it" ||
    typeof sessionId !== "string" ||
    !uuidPattern.test(sessionId)
  ) {
    return null
  }

  let target: SiteAnalyticsTarget | null
  if (rawTarget === undefined || rawTarget === null) {
    target = null
  } else {
    const normalizedTarget = normalizeSiteAnalyticsTarget(rawTarget)
    if (!normalizedTarget) return null
    target = normalizedTarget
  }
  if (eventName === "page_view" && target !== null) return null
  if (eventName !== "page_view" && target === null) return null
  if (
    eventName === "lead_submit" &&
    !(
      (target === "assessment" && pagePath === "/assessment") ||
      (target === "protocollo_23" && pagePath === "/protocollo-23")
    )
  ) {
    return null
  }

  return {
    eventName: eventName as SiteAnalyticsEventName,
    pagePath,
    language,
    sessionId,
    target,
  }
}
