/* =====================================================================
   SITE LISTS — edit this file to add or change people, videos, events
   and photos. You do not need to touch any HTML for these.

   HOW TO EDIT
   - Each item sits between { and } and ends with a comma.
   - To add a person, copy one whole line { ... }, paste it below,
     and change the words inside the quotes.
   - Keep the quotes " " around every value.
   - Leave a value as "" (empty quotes) if you don't have it yet;
     the site simply won't show it.
   - Lines starting with // are notes and are ignored.
   ===================================================================== */

window.SITE_DATA = {

  /* ---------- People page: Office Bearers ---------- */
  officeBearers: [
    { name: "Fr. ", role: "Vicar", place: "", phone: "+91 " },
    { name: "To be updated", role: "Trustee", place: "", phone: "" },
    { name: "Paul Thomas", role: "Secretary", place: "Pallickal", phone: "+91 94950 85926" },
  ],

  /* ---------- People page: Managing Committee (usually 10–12 members) ---------- */
  managingCommittee: [
    // { name: "Name", place: "House name" },
  ],

  /* ---------- People page: Diocesan Council Members from the Parish ---------- */
  dioceseCouncil: [
    { name: "Fr. T K Thomas", place: "Tharayathu" },
    { name: "Romykutty Madathilethu", place: "Madathilethu" },
  ],

  /* ---------- People page: Priests from the Parish ---------- */
  priests: [
    { name: "Rev. Fr. Mathews Vattiyanickal", place: "Vattiyanickal", note: "Currently serving in Malabar Diocese" },
    { name: "Rev. Fr. T K Thomas", place: "Tharayathu", note: "Vicar of St. George Orthodox Church, Kanakapalam" },
  ],

  /* ---------- Organisations page ----------
     For each organisation, add office bearers inside bearers: [ ... ]
     like this: { role: "President", name: "Name" },                  */
  organisations: [
    { name: "Sunday School", about: "Faith formation for children and young people every Sunday.", bearers: [] },
    { name: "Martha Mariyam Samajam", about: "The women's association of the parish.", bearers: [] },
    { name: "OVBS", about: "Orthodox Vacation Bible School, held during the summer holidays.", bearers: [] },
    { name: "AMOSS", about: "Akhila Malankara Orthodox Shusrushaka Sangham, the association of altar servers.", bearers: [] },
    { name: "Friday Prayer Meeting", about: "Weekly prayer gathering held on Fridays.", bearers: [] },
    { name: "Suvishesha Sangham", about: "The gospel association, supporting evangelism and mission work.", bearers: [] },
    { name: "OCYM", about: "Orthodox Christian Youth Movement, the youth wing of the parish.", bearers: [] },
    { name: "Balasamajam", about: "The children's association of the parish.", bearers: [] },
    { name: "Prayer Meetings", about: "Area prayer meetings held in members' homes.", bearers: [] },
    { name: "MGOCSM", about: "Mar Gregorios Orthodox Christian Student Movement, for students.", bearers: [] },
  ],

  /* ---------- Videos & Events page: Upcoming events ----------
     date must be written as "YYYY-MM-DD", for example "2027-02-20".
     Past events are hidden automatically.                              */
  events: [
    // { date: "2027-02-20", title: "Parish Feast (Perunnal)", details: "Kumbham 8 and 9. Evening prayer at 6:00 pm." },
  ],

  /* ---------- Videos & Events page and Home page: YouTube videos ----------
     youtube: the code at the end of the YouTube link.
       https://www.youtube.com/watch?v=AbCdEf12345  ->  "AbCdEf12345"
       https://youtu.be/AbCdEf12345                 ->  "AbCdEf12345"
     Newest video first. The first one also appears on the Home page.    */
  videos: [
    // { youtube: "AbCdEf12345", title: "Holy Qurbana – Parish Feast 2027", date: "February 2027" },
  ],

  /* ---------- Gallery page: Photos ----------
     1. Put the photo in the folder  images/gallery/
        (WebP or JPG, about 1600 pixels wide is plenty).
     2. Add a line here. "alt" describes the photo for blind visitors.   */
  gallery: [
    // { src: "images/gallery/church-front.webp", alt: "Front view of the church at Vayalathala", caption: "The church" },
  ],
};
