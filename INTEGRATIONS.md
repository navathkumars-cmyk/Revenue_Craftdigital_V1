# Integration Architecture

Two independent, swappable systems live under `src/lib/`: **content** (where
marketing copy comes from) and **leads** (where form submissions go). Neither
requires any external service to be configured — both have safe, working
defaults — but both are built so wiring in a real backend never means
touching a page or component.

---

## 1. Content backend (`src/lib/cms/`)

Every page fetches services, industries, case studies, testimonials, and
FAQs through one interface:

```ts
import { getContentProvider } from "@/lib/cms"

const services = await getContentProvider().getServices()
const service = await getContentProvider().getServiceBySlug(slug)
```

**Never** import `config/services.ts` (etc.) directly from a page — that
array is the *local* provider's data source, not a general-purpose API. The
one intentional exception is `src/lib/validations/growth-audit-form.ts`,
which builds the "Business type" dropdown's enum directly from
`config/industries.ts`, because Zod enum values must be known synchronously
at schema-definition time — they can't `await` a CMS fetch. That's a
deliberate, narrow exception, not an oversight.

### Switching providers

Set `CMS_PROVIDER` in `.env.local` to one of `local` (default) | `sanity` |
`contentful` | `strapi` | `wordpress`. `src/lib/cms/index.ts` is the factory
that reads this and returns the matching provider — nothing else needs to
change.

### Activating a real CMS

Each adapter in `src/lib/cms/providers/` is a real, typed implementation of
`ContentProvider` whose methods currently throw a clear "not configured yet"
error with setup instructions. Each file's header comment has the exact
steps (package to install, env vars, content-model field names) for that
platform. Implementing a provider means:

1. Following that file's setup steps to install the SDK and set env vars.
2. Replacing each `notConfigured("methodName")` call with a real query,
   using the commented example as a starting point.
3. Making sure the shape you return matches `src/types/index.ts` exactly.

**Icons are the one field CMS content can't return as-is.** `Service.icon`
and `Industry.icon` are strings (e.g. `"search"`), not React components —
any real CMS can only return JSON, never a live component reference. Keep
that field a plain string key from `src/lib/icon-registry.ts`, and render it
with `<ContentIcon name={service.icon} />` (`src/components/ui/content-icon.tsx`),
never `const Icon = service.icon; <Icon />` directly — see that file's
comment for why (it's a `react-hooks/static-components` lint false-positive,
not a real safety issue, but the fix is still the right pattern to reuse).

---

## 2. Lead destinations (`src/lib/leads/`)

The contact form and Growth Audit form both POST to their own API route
(`/api/contact`, `/api/growth-audit`), which validates with Zod and then
calls one function:

```ts
const results = await dispatchLead({ source: "contact", name, email, ... })
```

`dispatchLead()` (`src/lib/leads/dispatch.ts`) fans the lead out, in
parallel, to **every destination that has its env vars set** — see
`.env.example` for the full list. A destination with missing env vars is
silently skipped (not an error); a destination that fails never blocks the
others or the form's success response to the visitor. If literally nothing
is configured, it logs a warning server-side so a lead is never silently
lost without a trace, and still returns success to the visitor.

### Destinations, and what's real vs. what needs your credentials

| Destination | File | Works once you set |
|---|---|---|
| Generic webhook | `destinations/webhook.ts` | `LEAD_WEBHOOK_URL` |
| Resend (email) | `destinations/resend.ts` | `RESEND_API_KEY` |
| Google Sheets | `destinations/google-sheets.ts` | `GOOGLE_SHEETS_WEBHOOK_URL` (via a published Apps Script — see file header) |
| Zoho CRM | `destinations/zoho.ts` | `ZOHO_REFRESH_TOKEN`, `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET` |
| HubSpot | `destinations/hubspot.ts` | `HUBSPOT_ACCESS_TOKEN` |
| EmailJS | `destinations/emailjs.ts` | `EMAILJS_SERVICE_ID/TEMPLATE_ID/PUBLIC_KEY/PRIVATE_KEY` |

Every implementation is real, working code (plain `fetch`, no unused SDK
dependencies) — none of them are stubs. They're inert only because no
credentials are set.

**EmailJS note:** it's normally wired directly into the browser with just a
public key (their official React SDK), not through a server route. The
adapter here uses their server-side REST endpoint with the *private* key
instead, so that every destination flows through the same one dispatch path.
Either approach is legitimate — pick client-side EmailJS instead if you'd
rather skip the extra round-trip.

### Adding a new destination

Implement the `LeadDestination` interface (`src/lib/leads/types.ts`:
`key`, `isConfigured()`, `send(payload)`), add it to the `allDestinations`
array in `dispatch.ts`. That's the entire integration surface — no changes
to the API routes or forms.

### Form → API → destinations, end to end

`GrowthAuditForm`/`ContactForm` (`src/components/forms/`) already POST to
their routes and show a real error state (not just success) if the request
fails — check `status === "error"` in either file if you need to change that
UX. Nothing about the destinations layer requires touching the forms again.
