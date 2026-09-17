# attune-privacy — Change History

Full record of changes to the published site at attuneapp.io. Read on demand; not loaded
into sessions. Deploys are GitHub Pages, so a push to `main` IS the deploy.

---

- Sep 17 2026 (commit `96ad2b3`) — **THE FIRST SCREEN CARRIED A CLAIM AND A DOWNLOAD BUTTON WITH NO OUTSIDE VALIDATION.** The only review on the page, Daisy's five star App Store quote, sat below three full sections, so nothing on first paint told a visitor that anyone else had used the app. Added a `.hero-proof` block directly under the hero buttons: five stars, one verbatim sentence from that review ("As someone with PCOS this finally feels like it was built for me."), and the attribution. Cormorant italic so it reads as a pull quote rather than a badge; fades in at 0.9s behind the buttons; scales to 19px under the 900px breakpoint.

  DELIBERATE, do not "fix" either back. (1) ONE SENTENCE, not the whole review: the full paragraph in the hero buried the download button. Daisy's words are unedited, just trimmed. (2) THE FULL REVIEW STAYS in the testimonial section further down, so the quote appears twice on purpose. Cutting the lower section was offered and not taken.

  WHAT WAS REJECTED: aggregate social proof. A star average, a review count or a user total would all be more persuasive and Attune's real numbers cannot honestly carry any of them yet. The credible proof at this stage is specificity, one named review, not volume. Do not add invented counts.

  COST: hero button margin dropped 80px -> 34px and the proof block carries 56px, so the phone mockups start 112px lower. On a 900px tall viewport their top edge no longer peeks above the fold; it did before, by about 67px. Accepted knowingly. Spacing was tightened twice to limit it; going further made the hero cramped.

  ORIGIN: a gtm.help preview board told Denis the page "loses people" on the headline against "13 competing choices" with "no verified ratings". Checked against the live page: the headline quote was exact, the count was invented (8 clickables above the fold, 25 on the whole page), and the ratings claim was half true, right at first paint and wrong for the page. Only the first-paint half was worth acting on.

  VERIFIED: measured in a local render before pushing (quote at 787-847px inside a 1440x900 viewport, mobile overrides computing at 52px/19px, the existing `.phone-side` hide rule still applying after the new rules were inserted into that media query), then confirmed live with a cache buster after the Pages build.

  NOT COVERED: the drop off this does not touch. Attune's failure is post signup, 8 workout starts to 3 completions, and no hero change moves that number.

- Sep 6 2026 (commit `387dcac`) — **THE LIVE PRIVACY POLICY NAMED A VENDOR THE APP HAD STOPPED USING AND OMITTED ONE IT HAD JUST ADDED.** Attune moved analytics from Amplitude to PostHog and turned on masked session replay the same day. The policy still said "App interactions tracked via Amplitude analytics (anonymised)", still listed Amplitude as a data-sharing recipient, and **did not mention screen recording at all**. It had read "Last updated: April 2026" throughout.

  Three corrections: Amplitude replaced with PostHog in both the usage-data list and the sharing list; session recording disclosed explicitly, including what masking does and does not hide, on the reasoning that a user cannot judge "we record your sessions" without knowing her bloodwork, cycle data and photos are masked before the recording leaves the device; and **"anonymised" dropped**, because the app calls `identify()` with the Supabase user id, so usage data is linked to her account and the old wording was not accurate.

  TWO TRAPS THIS REPO SETS, both hit during the change. (1) `privacy.html` and `privacy/index.html` are DUPLICATES — editing one silently leaves the other serving the old text. (2) Verifying the deploy with a plain fetch returns a CACHED page and looks like a failed deploy; use a cache buster, `curl -s "https://attuneapp.io/privacy/?cb=$(date +%s)"`, and expect a minute or two of Pages rebuild.

  ROOT CAUSE WORTH NAMING: the policy lives in a DIFFERENT repo from the app, so no code change can ever remind anyone it has gone stale. A privacy check was added to the `release` skill as preflight step 6, conditional on the diff actually changing data collection.

  NOT COVERED BY THIS: the **App Store Connect App Privacy declarations** are a separate legal statement and were left to Denis.
