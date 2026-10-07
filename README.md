# Mar Severios Sleeba Orthodox Valiya Pally — website

The website for sleebapally.org. It is plain HTML with no build step: what is in the
`public` folder is exactly what visitors see.

## How to change things

The easiest way is on github.com: open the file, click the **pencil icon** (Edit),
make your change, then click **Commit changes**. Cloudflare publishes the new
version within a minute or two.

To preview on your own computer first, double-click any `.html` file inside `public`
to open it in your browser.

### Lists: people, organisations, events, videos, photos

All of these live in **one file: `public/data/content.js`**. You never need to touch
HTML for them. Each person or item is one line, for example:

```js
{ name: "Paul Thomas", role: "Secretary", place: "Pallickal", phone: "+91 94950 85926" },
```

- **Add someone:** copy a whole line, paste it underneath, change the words inside the quotes.
- **Remove someone:** delete their whole line.
- **Don't know a value yet:** leave it as `""`. It simply won't show.
- Keep the quotes `" "` and the comma at the end of each line.

| To change… | Look for this section in `content.js` |
|---|---|
| Vicar, Trustee, Secretary | `officeBearers` |
| Managing committee | `managingCommittee` |
| Diocesan council members | `dioceseCouncil` |
| Priests from the parish | `priests` |
| Organisations and their office bearers | `organisations` (add people inside `bearers: [ ]`) |
| Upcoming events | `events` (dates as `"2027-02-20"`; past events hide themselves) |
| YouTube videos | `videos` (newest first; the first one also shows on the Home page) |
| Gallery photos | `gallery` |

**YouTube code:** for `https://www.youtube.com/watch?v=AbCdEf12345` or
`https://youtu.be/AbCdEf12345`, the code is `AbCdEf12345`.

**Photos:** upload into `public/images/gallery/`, then add a line in `gallery`.
Resize photos to about 1600 pixels wide and save as WebP before uploading. The free
site https://squoosh.app does this in the browser. Always fill in `alt` with a short
description of the photo for visitors who use screen readers.

If a list stops showing after an edit, a quote or comma is usually missing. Compare
your line with the one above it.

### Page text

Open the page's `.html` file in `public` and change the words between the tags.
Look for `<!-- EDIT: ... -->` notes, which mark the places that change most often.

| Page | File |
|---|---|
| Home | `index.html` |
| About | `about.html` |
| History | `history.html` |
| St. Severus | `st-severus.html` |
| Services & Feasts | `services.html` |
| Contact | `contact.html` |

**Service times appear in three places:** `index.html`, `services.html`, and the
footer at the bottom of every page. Update all of them together.

**Phone numbers in links** look like `<a href="tel:+914735245900">+91 4735 245 900</a>`.
Change both parts: the digits after `tel:` (no spaces) and the visible text.

### Colours and fonts

Set once at the top of `public/css/style.css` (`--maroon`, `--gold`, and so on).

## Other files (normally left alone)

- `public/js/main.js`: menu and the code that draws the lists.
- `public/_headers`: security and caching settings for Cloudflare.
- `public/_redirects`: send old website addresses to new pages.
- `public/sitemap.xml`, `robots.txt`: for search engines. Add a line to the sitemap if you add a new page.
- `public/fonts/`: fonts are stored here so the site makes no requests to Google.

Deployment steps and the pre-launch checklist are in [DEPLOY.md](DEPLOY.md).
