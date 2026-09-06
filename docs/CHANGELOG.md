# attune-privacy — Change History

Full record of changes to the published site at attuneapp.io. Read on demand; not loaded
into sessions. Deploys are GitHub Pages, so a push to `main` IS the deploy.

---

- Sep 6 2026 (commit `387dcac`) — **THE LIVE PRIVACY POLICY NAMED A VENDOR THE APP HAD STOPPED USING AND OMITTED ONE IT HAD JUST ADDED.** Attune moved analytics from Amplitude to PostHog and turned on masked session replay the same day. The policy still said "App interactions tracked via Amplitude analytics (anonymised)", still listed Amplitude as a data-sharing recipient, and **did not mention screen recording at all**. It had read "Last updated: April 2026" throughout.

  Three corrections: Amplitude replaced with PostHog in both the usage-data list and the sharing list; session recording disclosed explicitly, including what masking does and does not hide, on the reasoning that a user cannot judge "we record your sessions" without knowing her bloodwork, cycle data and photos are masked before the recording leaves the device; and **"anonymised" dropped**, because the app calls `identify()` with the Supabase user id, so usage data is linked to her account and the old wording was not accurate.

  TWO TRAPS THIS REPO SETS, both hit during the change. (1) `privacy.html` and `privacy/index.html` are DUPLICATES — editing one silently leaves the other serving the old text. (2) Verifying the deploy with a plain fetch returns a CACHED page and looks like a failed deploy; use a cache buster, `curl -s "https://attuneapp.io/privacy/?cb=$(date +%s)"`, and expect a minute or two of Pages rebuild.

  ROOT CAUSE WORTH NAMING: the policy lives in a DIFFERENT repo from the app, so no code change can ever remind anyone it has gone stale. A privacy check was added to the `release` skill as preflight step 6, conditional on the diff actually changing data collection.

  NOT COVERED BY THIS: the **App Store Connect App Privacy declarations** are a separate legal statement and were left to Denis.
