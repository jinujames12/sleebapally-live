# Deploying sleebapally.org on Cloudflare Pages

Settings at a glance:

| Setting | Value |
|---|---|
| Framework preset | **None** |
| Build command | *(leave empty)* |
| Build output directory | **`public`** |
| Production branch | `main` |

Cloudflare's menus get renamed from time to time. If a label below doesn't match
exactly, look for the closest one.

---

## 1. Put the site on GitHub

### Option A: in the browser (no software needed)

1. Sign in at https://github.com and click **+ → New repository**.
2. Name it `sleebapally-website`. **Private** is fine (Cloudflare can still read it).
   Leave "Add a README" unticked. Click **Create repository**.
3. On the empty repository page, click **uploading an existing file**.
4. Unzip `sleebapally-website.zip` on your computer. Open the unzipped folder and
   drag **everything inside it** (`public`, `README.md`, `DEPLOY.md`) into the browser window.
   Check that `public` keeps its sub-folders (`css`, `data`, `fonts`, `images`, `js`).
5. Click **Commit changes**.

### Option B: with Git on the command line

From inside the unzipped `sleebapally-website` folder:

```bash
git init -b main
git add .
git commit -m "New church website"
git remote add origin https://github.com/<your-username>/sleebapally-website.git
git push -u origin main
```

## 2. Connect the repository to Cloudflare Pages

1. Sign in at https://dash.cloudflare.com.
2. Go to **Workers & Pages → Create application**, choose the **Pages** tab, then
   **Connect to Git**. (If you only see a Workers screen, look for
   "Looking to deploy Pages? Get started".)
3. Click **Connect GitHub**, authorise Cloudflare, and give it access to
   `sleebapally-website` only.
4. Select the repository and click **Begin setup**.
5. Project name: `sleebapally`. Production branch: `main`.
6. **Framework preset: None. Build command: leave empty. Build output directory: `public`.**
7. Click **Save and Deploy**. After a minute you get a test address like
   `https://sleebapally.pages.dev`. Check the site there before touching the domain.

From now on, every change committed on GitHub publishes automatically.

### Keep it free of trackers and injected scripts

- In the Pages project, open **Metrics** and make sure **Web Analytics** is **off**.
- Under **Analytics & Logs → Web Analytics** for the account, make sure
  `sleebapally.org` isn't set up with automatic setup.
- In the `sleebapally.org` zone:
  - **Speed → Optimization**: leave **Rocket Loader** off.
  - **Scrape Shield**: turn **Email Address Obfuscation** off (it adds a Cloudflare script
    whenever an email address appears on the page).

## 3. Add sleebapally.org and www.sleebapally.org

**Note:** this step switches the live domain from the old website to the new one.
Do it only after the checklist below is complete.

1. In the Pages project, open **Custom domains → Set up a custom domain**.
2. Enter `sleebapally.org` and click **Continue**.
   - Because the domain is already in your Cloudflare account, Cloudflare offers to
     create the DNS record for you. If the old site has existing `A`, `AAAA` or `CNAME`
     records for `sleebapally.org`, Cloudflare asks to replace them. Write the old
     values down first (in case you need to switch back), then accept.
   - Click **Activate domain**.
3. Repeat for `www.sleebapally.org`.
4. Wait until both show **Active** (usually a few minutes) with an SSL certificate issued.
5. In the `sleebapally.org` zone, under **SSL/TLS → Edge Certificates**, turn on
   **Always Use HTTPS**.

### Redirect www to sleebapally.org

The site's main address is `https://sleebapally.org` (the sitemap and page tags use it).
Send every `www` visit there:

1. In the `sleebapally.org` zone, go to **Rules → Redirect Rules → Create rule**.
   Cloudflare has a ready-made template, **"Redirect from WWW to root"**, which does
   exactly this; use it if offered. Otherwise:
2. Rule name: `www to root`.
3. **If incoming requests match:** Custom filter expression, Field **Hostname**,
   Operator **equals**, Value `www.sleebapally.org`.
4. **Then:** Type **Dynamic**, Expression:
   `concat("https://sleebapally.org", http.request.uri.path)`
   Status code **301**, tick **Preserve query string**.
5. **Deploy**.
6. The `www` DNS record must be **Proxied** (orange cloud) for the rule to work.
   The record Pages creates already is.

Test: open `http://www.sleebapally.org/about` and check you land on
`https://sleebapally.org/about`.

### Old website addresses

If the old site had pages at other addresses (e.g. `/service-timings`), add them to
`public/_redirects` so old links and Google results still work. Examples are in that file.

---

## Pre-launch checklist

Check everything against the old site and with the vicar or secretary.

**Names, dates and facts**
- [ ] Church name, English and Malayalam, on Home, the footer and the share image
- [ ] Founding year shows **1906** everywhere (Home, header, About, History)
- [ ] Present Catholicos: H.H. Baselios Marthoma Mathews III (About page)
- [ ] Nilackal Diocese details: first Metropolitan, 39 parishes, 5 districts (About page)
- [ ] English summary of the history matches the Malayalam text (History, "In Brief")
- [ ] Annual feasts and dates, including Ettu Nombu 1–8 Sept and Shunoyo 15 Aug (Services)
- [ ] Kurishadi details (Services)
- [ ] One-line descriptions of each organisation (Organisations)
- [ ] Priests from the parish, diocesan council members (People)

**Timings**
- [ ] Vespers Saturday 6:00 pm; Holy Qurbana Sunday 7:30 am, other days 7:00 am
- [ ] Same times in all three places: Home, Services, footer

**Phone numbers and address**
- [ ] Church office +91 4735 245 900
- [ ] Vicar Fr. K A Cherian +91 94474 55041
- [ ] Secretary Paul Thomas +91 94950 85926
- [ ] Trustee name and number added (`content.js` → `officeBearers`, and `contact.html`)
- [ ] Full postal address and PIN code (`contact.html`, footer)
- [ ] "Open in Google Maps" lands on the church
- [ ] Email address added, or the Email line removed (`contact.html`)
- [ ] Tap each phone number on a phone; it should open the dialler with the right number

**Placeholders to fill or remove**
- [ ] Managing committee (10–12 members)
- [ ] Office bearers for each organisation
- [ ] At least one YouTube video (the Home "Latest Video" section stays hidden until one is added)
- [ ] Gallery photos, each with alt text
- [ ] Search every file for "To be updated"

**Phone testing** (most visitors)
- [ ] Open the `pages.dev` address on an Android phone and an iPhone
- [ ] Menu opens and closes; every menu link works
- [ ] Malayalam text displays correctly (no boxes)
- [ ] No sideways scrolling on any page
- [ ] A video plays when tapped

**Links and search**
- [ ] Click every link on every page; nothing goes to a missing page
- [ ] Visit a made-up address like `/xyz`; the "Page not found" page appears
- [ ] Share the link in WhatsApp; the maroon preview card with the church name appears
- [ ] Old site addresses redirect (`_redirects`)
- [ ] After launch: add `https://sleebapally.org` in Google Search Console and submit `https://sleebapally.org/sitemap.xml`

**Domain switch-over**
- [ ] Old DNS values written down before replacing them
- [ ] `sleebapally.org` and `www.sleebapally.org` both Active with SSL in Pages
- [ ] `www` and `http://` both redirect to `https://sleebapally.org`
