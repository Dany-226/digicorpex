# Preview and deployment of refonte-2026

## Base and publication gate

Local implementation starts from `d5e7dd58b5a29f77dfccb427de2725990f5dae2f` in Dany-226/digicorpex. Network access was unavailable during implementation. Before publication, compare current GitHub main and the currently successful Cloudflare production deployment to this commit. Integrate any newer main changes on the feature branch and rerun checks. Do not overwrite the production history.

Push only `refonte-2026` and create a PR against main. Review the exact Preview deployment commit. No merge or production deployment until the user validates the Preview.

## Checks

```sh
npm ci
npm run lint
npm run typecheck
npm test
npm run build:static
npm run test:export
```

Use Node 22 in CI/Cloudflare. GitHub Actions runs the checks. The build command in the existing Pages project is `npm run build:static`, output directory `out`, root directory the repository root. `/functions` must remain at the repository root and be compiled by Pages, not uploaded as static files.

## Environment variables and email

- Production: `RESEND_API_KEY` secret. Optional `CONTACT_TO_EMAIL` defaults to the current recipient. **MAIL_TEST_MODE must be absent or false.**
- Initial Preview/local tests: `MAIL_TEST_MODE=true`. Handlers return `{ok:true,test:true}`, the UI explicitly says no message was sent. No API key is needed.
- Final end-to-end email check: use a controlled test recipient and a Preview key; unset test mode only for this deliberate check. The diagnostic is sent to the entered email address. Never use real visitor data in tests.
- Never commit `.env*` or `.dev.vars*`. Set production and preview secrets independently in Pages.
- `/api/contact` and `/api/diagnostic` have distinct contracts. Both use the shared Web API handlers in `lib/enquiries.ts`; no Node `fs` or Brevo call in runtime functions.
- Keep Resend verified sender/DNS settings and Google Calendar reservation URL unchanged.
- Validate Cloudflare rate limiting / anti-abuse settings for the email endpoints before enabling public traffic, especially `/api/diagnostic`.

After installing Wrangler in the normal development environment, test actual Pages routing with `wrangler pages dev out` and local `.dev.vars`. Next dev adapters share the handler code, but do not replace a Pages routing test.

## Preview acceptance

- Confirm preview is not indexed (Cloudflare Preview response `X-Robots-Tag: noindex`); production has no noindex.
- Compare full page to the approved reference at 375, 390, 768, 1440 and 1920 px, Safari and Chromium.
- Check mobile menu and Escape/focus, pause, reduced-motion, method reset over multiple cycles, and no horizontal overflow.
- Verify blog articles, MDX components, PDF download, contact errors and controlled email receipt, Calendar link without placing a booking.
- Verify homepage metadata, article canonicals and JSON-LD, robots and sitemap, all local assets, and 301 `/services/automatisation` -> `/agents`.
- Confirm unknown routes return HTTP 404.
- Compare Lighthouse/CWV to existing production; target LCP <= 2.5 s, CLS <= 0.1, INP <= 200 ms. Laboratory tests alone do not establish field INP.
- Run a current dependency audit and resolve material findings before merging. Existing dependency versions have not been upgraded wholesale as part of the visual change.

## Rollback

Before merge, record the last successful production deployment ID, its commit and the current configuration (without recording secret values). On a blocking regression, roll back in Cloudflare Pages to that successful **production** deployment, then revert the merge on main through Git. A Preview is not a rollback target. Check homepage, blog, contact and indexing after rollback. Keep domain/DNS and secrets stable during the release.
