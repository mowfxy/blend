---
name: kern-ship
description: Kern specialist for shipping quality on any platform, covering working actions and links, honest content and finished identity (favicon, titles, app icons, no starter branding), accessibility, performance, SEO and sharing for public sites, store readiness for apps, privacy and consent, and security for features that are actually present. Use it before handing back a substantial build, before a launch, or when asked for a launch, accessibility or quality review. For small edits, check only the changed flow.
---

# Kern Ship

Design that does not work is not finished. This is the quality floor beneath the taste. It does not prescribe an aesthetic. Apply what is relevant to the product: a brochure site does not need login security, and a prototype does not need a cookie policy. Implement fixes when the work is authorised. Listing them is not the same as doing them.

## Working

- Every visible button, link, menu item and footer link does something real, with no empty handlers or `href="#"`. The logo goes home. Contact emails use `mailto:`.
- Navigation works on every size, including the mobile menu (open, close, keyboard, state exposed to assistive tech), the back and forward buttons, direct URL loads and deep links in apps.
- Forms have visible labels, the right input types and autocomplete attributes, validation with actionable errors, loading and disabled states, duplicate-submit protection, preserved input on failure, and success only after a real success.
- Unknown routes get a useful 404 with a way back, served with a real 404 status where supported.
- Desktop and mobile apps handle offline, permission denial, an interrupted operation and resuming from the background.

## Honest and finished

- **No starter residue:** no "Vite + React" titles, default favicons, lorem ipsum, sample contact details, dead social links or framework badges.
- **No invented proof:** no fake reviews, customers, logos, statistics or press. Sample content in a prototype is labelled as a sample.
- **Pictures are used with rights** and credited where the licence requires it.
- **The identity is complete:** favicon and touch icons; app icons in every required size and variant; a window title and an About panel on desktop; the store listing assets for mobile.

## Accessible

- Use semantic structure: landmarks, logical headings, native controls where possible, and accessible names for every control and icon button.
- Make keyboard use complete, with visible focus, logical order, focus trapped in and returned from dialogs, and no keyboard traps.
- Meet contrast for text, UI boundaries and states (see [kern-color](../kern-color/SKILL.md#5-check-the-numbers)). Never use colour as the only signal.
- Targets should be at least 24 px on the web, 44 pt on iOS and 48 dp on Android. The layout survives 200% zoom, Dynamic Type at the largest sizes and Android font scaling.
- Respect reduced motion and reduced transparency. Give media captions, give informative images alt text and give decorative images empty alt text.
- Test with a screen reader on the main flow (VoiceOver, TalkBack or NVDA), not only with an automated scan.

## Fast

- **Images:** sized to their slots, in modern formats, with dimensions reserved, the first image prioritised and the rest lazy-loaded.
- **Fonts:** subset, preloaded only above the fold, with metric-adjusted fallbacks.
- **JavaScript:** investigate large bundles and defer expensive features such as 3D, maps and video.
- **Errors:** no console errors, failed requests or missing assets.
- **Measure before claiming improvements.** Use Lighthouse or WebPageTest for the web and cold-start time and memory for apps.

## Found and shared (public sites)

- Give every page a unique title and description, one clear H1 and a coherent heading order. Set canonical URLs on the production origin, plus Open Graph and Twitter metadata with a real share image ([kern-media](../kern-media/SKILL.md#social-and-open-graph-images)).
- Provide `robots.txt` and `sitemap.xml` for indexable sites, and keep previews and private pages out of the index. Add structured data only where it matches visible content and confirmed facts.
- Set `theme-color` and `color-scheme`, and include a web app manifest when the site can be installed.

## Private and secure (where relevant)

- Collect only the data needed, and say why. Provide privacy information where personal data is collected. Make consent real: non-essential tracking waits for consent, rejecting works, and preferences can be changed.
- Keep secrets out of client bundles and the repository. Enforce authorisation on the server, validate input at server boundaries and use parameterised queries. Use HTTPS, secure cookies and headers tested against the real assets. Rate-limit abuse-prone endpoints.
- For desktop apps: in Electron, use context isolation, no Node integration in the renderer and a validated IPC; in Tauri, grant minimal capabilities. Sign and notarise the builds.

## Verify and report

For a substantial build: open the real thing (browser, simulator or app), follow every navigation path, exercise the primary action and one failure, visit an unknown route, use the keyboard only, and check the console and network. Run the project's build, lint and tests.

Report what was verified, what is blocked by a missing dependency (credentials, domain, store account) and what was not applicable. Never claim browser, device, accessibility or security verification that did not happen. Never call something launch-ready while a critical flow is unresolved.
