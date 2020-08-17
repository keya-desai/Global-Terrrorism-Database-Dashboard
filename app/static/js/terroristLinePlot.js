// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("terroristDiv", am4charts.XYChart);

// Add data
chart.data = [{
    "year": "1970",
    "New People's Army (NPA)": 2,
    "Irish Republican Army (IRA)": 7,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 0, */
    "Shining Path (SL)": 0,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 0,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "1971",
    "New People's Army (NPA)": 1,
    "Irish Republican Army (IRA)": 60,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 0, */
    "Shining Path (SL)": 0,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 0,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "1972",
    "New People's Army (NPA)": 0,
    "Irish Republican Army (IRA)": 162,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 0, */
    "Shining Path (SL)": 0,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 0,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "1973",
    "New People's Army (NPA)": 0,
    "Irish Republican Army (IRA)": 111,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 0, */
    "Shining Path (SL)": 0,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 0,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "1974",
    "New People's Army (NPA)": 0,
    "Irish Republican Army (IRA)": 113,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 0, */
    "Shining Path (SL)": 0,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 0,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "1975",
    "New People's Army (NPA)": 0,
    "Irish Republican Army (IRA)": 75,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 2, */
    "Shining Path (SL)": 0,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 0,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "1976",
    "New People's Army (NPA)": 3,
    "Irish Republican Army (IRA)": 93,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 3, */
    "Shining Path (SL)": 0,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 0,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "1977",
    "New People's Army (NPA)": 2,
    "Irish Republican Army (IRA)": 109,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 28, */
    "Shining Path (SL)": 0,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 0,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "1978",
    "New People's Army (NPA)": 5,
    "Irish Republican Army (IRA)": 88,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 27, */
    "Shining Path (SL)": 1,
    "Farabundo Marti National Liberation Front (FMLN)": 1,
    "Kurdistan Workers' Party (PKK)": 0,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "1979",
    "New People's Army (NPA)": 13,
    "Irish Republican Army (IRA)": 207,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 46, */
    "Shining Path (SL)": 1,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 0,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "1980",
    "New People's Army (NPA)": 3,
    "Irish Republican Army (IRA)": 94,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 38, */
    "Shining Path (SL)": 25,
    "Farabundo Marti National Liberation Front (FMLN)": 159,
    "Kurdistan Workers' Party (PKK)": 0,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "1981",
    "New People's Army (NPA)": 12,
    "Irish Republican Army (IRA)": 103,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 53, */
    "Shining Path (SL)": 87,
    "Farabundo Marti National Liberation Front (FMLN)": 160,
    "Kurdistan Workers' Party (PKK)": 0,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "1982",
    "New People's Army (NPA)": 13,
    "Irish Republican Army (IRA)": 56,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 64, */
    "Shining Path (SL)": 249,
    "Farabundo Marti National Liberation Front (FMLN)": 284,
    "Kurdistan Workers' Party (PKK)": 0,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "1983",
    "New People's Army (NPA)": 7,
    "Irish Republican Army (IRA)": 134,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 89, */
    "Shining Path (SL)": 493,
    "Farabundo Marti National Liberation Front (FMLN)": 320,
    "Kurdistan Workers' Party (PKK)": 0,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "1984",
    "New People's Army (NPA)": 18,
    "Irish Republican Army (IRA)": 118,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 54, */
    "Shining Path (SL)": 502,
    "Farabundo Marti National Liberation Front (FMLN)": 254,
    "Kurdistan Workers' Party (PKK)": 3,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "1985",
    "New People's Army (NPA)": 84,
    "Irish Republican Army (IRA)": 53,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 36, */
    "Shining Path (SL)": 249,
    "Farabundo Marti National Liberation Front (FMLN)": 422,
    "Kurdistan Workers' Party (PKK)": 0,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "1986",
    "New People's Army (NPA)": 46,
    "Irish Republican Army (IRA)": 45,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 32, */
    "Shining Path (SL)": 391,
    "Farabundo Marti National Liberation Front (FMLN)": 174,
    "Kurdistan Workers' Party (PKK)": 1,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "1987",
    "New People's Army (NPA)": 118,
    "Irish Republican Army (IRA)": 79,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 64, */
    "Shining Path (SL)": 464,
    "Farabundo Marti National Liberation Front (FMLN)": 209,
    "Kurdistan Workers' Party (PKK)": 6,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "1988",
    "New People's Army (NPA)": 178,
    "Irish Republican Army (IRA)": 133,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 58, */
    "Shining Path (SL)": 277,
    "Farabundo Marti National Liberation Front (FMLN)": 351,
    "Kurdistan Workers' Party (PKK)": 22,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "1989",
    "New People's Army (NPA)": 106,
    "Irish Republican Army (IRA)": 124,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 25, */
    "Shining Path (SL)": 509,
    "Farabundo Marti National Liberation Front (FMLN)": 335,
    "Kurdistan Workers' Party (PKK)": 84,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "1990",
    "New People's Army (NPA)": 183,
    "Irish Republican Army (IRA)": 107,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 30, */
    "Shining Path (SL)": 371,
    "Farabundo Marti National Liberation Front (FMLN)": 181,
    "Kurdistan Workers' Party (PKK)": 122,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "1991",
    "New People's Army (NPA)": 96,
    "Irish Republican Army (IRA)": 202,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 145, */
    "Shining Path (SL)": 426,
    "Farabundo Marti National Liberation Front (FMLN)": 492,
    "Kurdistan Workers' Party (PKK)": 80,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "1992",
    "New People's Army (NPA)": 64,
    "Irish Republican Army (IRA)": 184,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 54, */
    "Shining Path (SL)": 286,
    "Farabundo Marti National Liberation Front (FMLN)": 8,
    "Kurdistan Workers' Party (PKK)": 361,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "1993",
    "New People's Army (NPA)": 0,
    "Irish Republican Army (IRA)": 0,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 0, */
    "Shining Path (SL)": 0,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 0,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "1994",
    "New People's Army (NPA)": 10,
    "Irish Republican Army (IRA)": 147,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 39, */
    "Shining Path (SL)": 74,
    "Farabundo Marti National Liberation Front (FMLN)": 1,
    "Kurdistan Workers' Party (PKK)": 182,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "1995",
    "New People's Army (NPA)": 2,
    "Irish Republican Army (IRA)": 4,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 47, */
    "Shining Path (SL)": 34,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 126,
    "Taliban": 4,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "1996",
    "New People's Army (NPA)": 2,
    "Irish Republican Army (IRA)": 12,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 70, */
    "Shining Path (SL)": 23,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 22,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "1997",
    "New People's Army (NPA)": 4,
    "Irish Republican Army (IRA)": 14,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 152, */
    "Shining Path (SL)": 31,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 16,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "1998",
    "New People's Army (NPA)": 0,
    "Irish Republican Army (IRA)": 12,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 43, */
    "Shining Path (SL)": 3,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 11,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "1999",
    "New People's Army (NPA)": 6,
    "Irish Republican Army (IRA)": 10,
    "Revolutionary Armed Forces of Colombia (FARC)": 50,
    "Shining Path (SL)": 5,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 36,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "2000",
    "New People's Army (NPA)": 16,
    "Irish Republican Army (IRA)": 6,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 67, */
    "Shining Path (SL)": 2,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 4,
    "Taliban": 0,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "2001",
    "New People's Army (NPA)": 9,
    "Irish Republican Army (IRA)": 0,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 48, */
    "Shining Path (SL)": 3,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 1,
    "Taliban": 4,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "2002",
    "New People's Army (NPA)": 14,
    "Irish Republican Army (IRA)": 2,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 111, */
    "Shining Path (SL)": 1,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 0,
    "Taliban": 7,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "2003",
    "New People's Army (NPA)": 19,
    "Irish Republican Army (IRA)": 2,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 61, */
    "Shining Path (SL)": 1,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 3,
    "Taliban": 50,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "2004",
    "New People's Army (NPA)": 13,
    "Irish Republican Army (IRA)": 0,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 26, */
    "Shining Path (SL)": 2,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 10,
    "Taliban": 55,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "2005",
    "New People's Army (NPA)": 9,
    "Irish Republican Army (IRA)": 1,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 30, */
    "Shining Path (SL)": 1,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 29,
    "Taliban": 120,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "2006",
    "New People's Army (NPA)": 18,
    "Irish Republican Army (IRA)": 2,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 33, */
    "Shining Path (SL)": 1,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 16,
    "Taliban": 164,
    "Al-Shabaab": 0,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "2007",
    "New People's Army (NPA)": 12,
    "Irish Republican Army (IRA)": 0,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 23, */
    "Shining Path (SL)": 3,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 15,
    "Taliban": 208,
    "Al-Shabaab": 6,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "2008",
    "New People's Army (NPA)": 86,
    "Irish Republican Army (IRA)": 1,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 89, */
    "Shining Path (SL)": 0,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 25,
    "Taliban": 258,
    "Al-Shabaab": 26,
    "Boko Haram": 0,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "2009",
    "New People's Army (NPA)": 58,
    "Irish Republican Army (IRA)": 0,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 105, */
    "Shining Path (SL)": 4,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 4,
    "Taliban": 268,
    "Al-Shabaab": 57,
    "Boko Haram": 10,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "2010",
    "New People's Army (NPA)": 55,
    "Irish Republican Army (IRA)": 0,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 120, */
    "Shining Path (SL)": 0,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 15,
    "Taliban": 308,
    "Al-Shabaab": 72,
    "Boko Haram": 17,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "2011",
    "New People's Army (NPA)": 48,
    "Irish Republican Army (IRA)": 1,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 83, */
    "Shining Path (SL)": 0,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 35,
    "Taliban": 214,
    "Al-Shabaab": 164,
    "Boko Haram": 125,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "2012",
    "New People's Army (NPA)": 86,
    "Irish Republican Army (IRA)": 0,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 85, */
    "Shining Path (SL)": 5,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 140,
    "Taliban": 800,
    "Al-Shabaab": 236,
    "Boko Haram": 424,
    "Islamic State of Iraq and the Levant (ISIL)": 0
  },
  {
    "year": "2013",
    "New People's Army (NPA)": 210,
    "Irish Republican Army (IRA)": 0,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 105, */
    "Shining Path (SL)": 10,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 21,
    "Taliban": 775,
    "Al-Shabaab": 325,
    "Boko Haram": 234,
    "Islamic State of Iraq and the Levant (ISIL)": 374
  },
  {
    "year": "2014",
    "New People's Army (NPA)": 289,
    "Irish Republican Army (IRA)": 0,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 163, */
    "Shining Path (SL)": 9,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 65,
    "Taliban": 1035,
    "Al-Shabaab": 871,
    "Boko Haram": 495,
    "Islamic State of Iraq and the Levant (ISIL)": 1249
  },
  {
    "year": "2015",
    "New People's Army (NPA)": 322,
    "Irish Republican Army (IRA)": 0,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 78, */
    "Shining Path (SL)": 6,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 336,
    "Taliban": 1249,
    "Al-Shabaab": 397,
    "Boko Haram": 540,
    "Islamic State of Iraq and the Levant (ISIL)": 1221
  },
  {
    "year": "2016",
    "New People's Army (NPA)": 172,
    "Irish Republican Army (IRA)": 0,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 11, */
    "Shining Path (SL)": 2,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 363,
    "Taliban": 1065,
    "Al-Shabaab": 564,
    "Boko Haram": 240,
    "Islamic State of Iraq and the Levant (ISIL)": 1454
  },
  {
    "year": "2017",
    "New People's Army (NPA)": 358,
    "Irish Republican Army (IRA)": 0,
    /* "Revolutionary Armed Forces of Colombia (FARC)": 0, */
    "Shining Path (SL)": 4,
    "Farabundo Marti National Liberation Front (FMLN)": 0,
    "Kurdistan Workers' Party (PKK)": 156,
    "Taliban": 894,
    "Al-Shabaab": 570,
    "Boko Haram": 333,
    "Islamic State of Iraq and the Levant (ISIL)": 1315
  }
];

// Set input format for the dates
chart.dateFormatter.inputDateFormat = "yyyy";

// Create axes
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// var title = chart.titles.create();
// // title.text = "Number of Attacks for Tops Terrorist Groups (1970-2017)";
// title.fontSize = 20;
// title.marginBottom = 30;

// Create series
function createSeries(field) {
  var series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = field;
  series.dataFields.dateX = "year";
  // series.tooltipText = "{valueY}"
  series.tooltipHTML = "<span style='font-size:14px; color:#000000;'><b>" +  field + ": {valueY.value}</b></span>";
  series.name = field;
  series.strokeWidth = 2;
  series.minBulletDistance = 15;

  // Drop-shaped tooltips
  series.tooltip.background.cornerRadius = 20;
  series.tooltip.background.strokeOpacity = 0;
  series.tooltip.pointerOrientation = "vertical";
  series.tooltip.label.minWidth = 40;
  series.tooltip.label.minHeight = 40;
  series.tooltip.label.textAlign = "middle";
  series.tooltip.label.textValign = "middle";

  // Make bullets grow on hover  
  var bullet = series.bullets.push(new am4charts.CircleBullet());
  bullet.circle.strokeWidth = 2;
  bullet.circle.radius = 4;
  bullet.circle.fill = am4core.color("#fff");

  var bullethover = bullet.states.create("hover");
  bullethover.properties.scale = 1.3;

  return series;
}

var Taliban = createSeries("Taliban");
var Al_Shabaab = createSeries("Al-Shabaab");
var Boko_Haram = createSeries("Boko Haram");
var SL = createSeries("Shining Path (SL)");
var NPA = createSeries("New People's Army (NPA)");
var IRA = createSeries("Irish Republican Army (IRA)");
var PKK = createSeries("Kurdistan Workers' Party (PKK)");
var ISIL = createSeries("Islamic State of Iraq and the Levant (ISIL)");
/* var FARC = createSeries("Revolutionary Armed Forces of Colombia (FARC)"); */
var FMLN = createSeries("Farabundo Marti National Liberation Front (FMLN)");


// Make a panning cursor
chart.cursor = new am4charts.XYCursor();
chart.cursor.behavior = "panXY";
chart.cursor.xAxis = dateAxis;
chart.cursor.snapToSeries = [Taliban, Al_Shabaab, NPA, IRA,  SL, FMLN, PKK, Boko_Haram, ISIL];
/* FARC, */
// Create vertical scrollbar and place it before the value axis
chart.scrollbarY = new am4core.Scrollbar();
chart.scrollbarY.parent = chart.leftAxesContainer;
chart.scrollbarY.toBack();

// Create a horizontal scrollbar with previe and place it underneath the date axis
chart.scrollbarX = new am4core.Scrollbar();
chart.scrollbarX.parent = chart.bottomAxesContainer;
chart.scrollbarX.toBack();
/* chart.scrollbarX = new am4charts.XYChartScrollbar(); */
/* chart.scrollbarX.series.push(series); */


/* Add legend */
chart.legend = new am4charts.Legend();
chart.legend.position = "bottom";
chart.legend.fontSize = 8;
chart.minHeight = 80
chart.minWidth = 80

dateAxis.start = 0.79;
dateAxis.keepSelection = true;

chart.exporting.menu = new am4core.ExportMenu();
chart.exporting.menu.position = 'bottom'