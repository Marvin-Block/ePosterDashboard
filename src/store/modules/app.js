// Pathify
import { make } from 'vuex-pathify'

// Data
const state = {
  drawer: null,
  drawerImage: false,
  mini: true,
  items: [
    {
      title: 'Dashboard',
      // icon: 'mdi-view-dashboard',
      icon: 'mdi-chart-box-outline',
      to: '/'
    },
    {
      title: 'Geräte',
      icon: 'mdi-monitor-cellphone-star',
      to: '/devices/'
    },
    {
      title: 'Videos',
      icon: 'mdi-widgets',
      to: '/videos/'
    },
    {
      title: 'Links',
      icon: 'mdi-auto-fix',
      to: '/links/'
    },
    // {
    //   title: 'Logs',
    //   icon: 'mdi-history',
    //   to: '/logs/',
    // },
    {
      title: 'Playlist',
      icon: 'mdi-folder',
      to: '/playlist/'
    }
    // {
    //   title: 'Pages',
    //   icon: 'mdi-image',
    //   items: [
    //     {
    //       title: 'Pricing',
    //       to: '/pages/pricing/',
    //     },
    //     {
    //       title: 'RTL Support',
    //       to: '/pages/rtl/',
    //     },
    //     {
    //       title: 'Timeline',
    //       to: '/components/timeline/',
    //     },
    //     {
    //       title: 'Login Page',
    //       to: '/pages/login/',
    //     },
    //     {
    //       title: 'Register Page',
    //       to: '/pages/register/',
    //     },
    //     {
    //       title: 'Lock Screen Page',
    //       to: '/pages/lock/',
    //     },
    //     {
    //       title: 'User Profile',
    //       to: '/components/profile/',
    //     },
    //     {
    //       title: 'Error Page',
    //       to: '/pages/error/',
    //     },
    //   ],
    // },
    // {
    //   title: 'Components',
    //   icon: 'mdi-view-comfy',
    //   items: [
    //     {
    //       title: 'Multi Level Collapse',
    //       items: [{
    //         title: 'Example',
    //       }],
    //     },
    //     {
    //       title: 'Buttons',
    //       to: '/components/buttons/',
    //     },
    //     {
    //       title: 'Grid System',
    //       to: '/components/grid/',
    //     },
    //     {
    //       title: 'Tabs',
    //       to: '/components/tabs/',
    //     },
    //     {
    //       title: 'Notifications',
    //       to: '/components/notifications/',
    //     },
    //     {
    //       title: 'Icons',
    //       to: '/components/icons/',
    //     },
    //     {
    //       title: 'Typography',
    //       to: '/components/typography/',
    //     },
    //   ],
    // },
    // {
    //   title: 'Forms',
    //   icon: 'mdi-clipboard-outline',
    //   items: [
    //     {
    //       title: 'Regular Forms',
    //       to: '/forms/regular/',
    //     },
    //     {
    //       title: 'Extended Forms',
    //       to: '/forms/extended/',
    //     },
    //     {
    //       title: 'Validation Forms',
    //       to: '/forms/validation/',
    //     },
    //     {
    //       title: 'Wizard',
    //       to: '/forms/wizard/',
    //     },
    //   ],
    // },
    // {
    //   title: 'Tables',
    //   icon: 'mdi-grid',
    //   items: [
    //     {
    //       title: 'Regular Tables',
    //       to: '/tables/regular/',
    //     },
    //     {
    //       title: 'Extended Tables',
    //       to: '/tables/extended/',
    //     },
    //     {
    //       title: 'DataTables Tables',
    //       to: '/tables/data-tables/',
    //     },
    //   ],
    // },
    // {
    //   title: 'Maps',
    //   icon: 'mdi-map-marker',
    //   items: [
    //     {
    //       title: 'Google Maps',
    //       to: '/maps/google/'
    //     },
    //     {
    //       title: 'Fullscreen Map',
    //       to: '/maps/fullscreen/'
    //     }
    //   ]
    // }
    // {
    //   title: 'Widgets',
    //   icon: 'mdi-widgets',
    //   to: '/widgets/',
    // },
    // {
    //   title: 'Charts',
    //   icon: 'mdi-chart-timeline-variant',
    //   to: '/charts/',
    // }
    // {
    //   title: 'Calendar',
    //   icon: 'mdi-calendar-range-outline',
    //   to: '/calendar/',
    // },
  ],
  filialen: [
    {
      'filNr': '105',
      'location': '105 - Duisburg-Meiderich',
      'Strasse': 'von-der-Mark-Str. 91',
      'Latitude': 51.46719,
      'Longitude': 6.771037,
      'Status': 'Online'
    },
    {
      'filNr': '110',
      'location': '110 - Ahaus',
      'Strasse': 'Marktstr. 17',
      'Latitude': 52.074119,
      'Longitude': 7.007474,
      'Status': 'Online'
    },
    {
      'filNr': '112',
      'location': '112 - Leichlingen',
      'Strasse': 'Brückenstr. 12',
      'Latitude': 51.105293,
      'Longitude': 7.012831,
      'Status': 'Online'
    },
    {
      'filNr': '113',
      'location': '113 - Kempen',
      'Strasse': 'Engerstr. 21',
      'Latitude': 51.364612,
      'Longitude': 6.42263,
      'Status': 'Online'
    },
    {
      'filNr': '114',
      'location': '114 - Köln-Ehrenfeld III',
      'Strasse': 'Venloer Str. 318',
      'Latitude': 50.949311,
      'Longitude': 6.918494,
      'Status': 'Online'
    },
    {
      'filNr': '118',
      'location': '118 - Köln-Mülheim II',
      'Strasse': 'Frankfurter Str. 54',
      'Latitude': 50.959188,
      'Longitude': 7.008565,
      'Status': 'Online'
    },
    {
      'filNr': '119',
      'location': '119 - Berg.-Gladbach-Refrath',
      'Strasse': 'Siebenmorgen 37',
      'Latitude': 50.957439,
      'Longitude': 7.115765,
      'Status': 'Online'
    },
    {
      'filNr': '120',
      'location': '120 - Moers-Repelen',
      'Strasse': 'Lintforter Str. 68',
      'Latitude': 51.489872,
      'Longitude': 6.597781,
      'Status': 'Online'
    },
    {
      'filNr': '121',
      'location': '121 - Xanten',
      'Strasse': 'Markt 34',
      'Latitude': 51.661073,
      'Longitude': 6.454479,
      'Status': 'Online'
    },
    {
      'filNr': '127',
      'location': '127 - Mönchengladbach-Giesenkirchen',
      'Strasse': 'Konstantinstr. 155',
      'Latitude': 51.155865,
      'Longitude': 6.487207,
      'Status': 'Online'
    },
    {
      'filNr': '134',
      'location': '134 - Mülheim an der Ruhr',
      'Strasse': 'Schloßstr. 9a',
      'Latitude': 51.428474,
      'Longitude': 6.883318,
      'Status': 'Online'
    },
    {
      'filNr': '135',
      'location': '135 - Erftstadt Lechenich',
      'Strasse': 'Bonner Strasse 15',
      'Latitude': 50.800059,
      'Longitude': 6.767881,
      'Status': 'Online'
    },
    {
      'filNr': '139',
      'location': '139 - Neuss',
      'Strasse': 'Krefelder Str. 39',
      'Latitude': 51.201854,
      'Longitude': 6.685623,
      'Status': 'Online'
    },
    {
      'filNr': '140',
      'location': '140 - Waltrop',
      'Strasse': 'Raiffeisenplatz 3',
      'Latitude': 51.6242403,
      'Longitude': 7.398046,
      'Status': 'Online'
    },
    {
      'filNr': '141',
      'location': '141 - Köln Severinstr.',
      'Strasse': 'Severinstr. 131',
      'Latitude': 50.927148,
      'Longitude': 6.95768,
      'Status': 'Online'
    },
    {
      'filNr': '143',
      'location': '143 - Bochum-Linden',
      'Strasse': 'Hattinger Str. 803',
      'Latitude': 51.427937,
      'Longitude': 7.163877,
      'Status': 'Online'
    },
    {
      'filNr': '146',
      'location': '146 - Datteln',
      'Strasse': 'Hohe Straße 36',
      'Latitude': 51.653046,
      'Longitude': 7.340244,
      'Status': 'Offline'
    },
    {
      'filNr': '151',
      'location': '151 - Krefeld Hochstr.',
      'Strasse': 'Hochstr. 56',
      'Latitude': 51.330102,
      'Longitude': 6.563757,
      'Status': 'Online'
    },
    {
      'filNr': '158',
      'location': '158 - Krefeld-Uerdingen',
      'Strasse': 'Niederstr. 15',
      'Latitude': 51.35469,
      'Longitude': 6.649246,
      'Status': 'Online'
    },
    {
      'filNr': '159',
      'location': '159 - Dortmund-Mengede',
      'Strasse': 'Siegburgstr. 11',
      'Latitude': 51.570526,
      'Longitude': 7.382046,
      'Status': 'Online'
    },
    {
      'filNr': '163',
      'location': '163 - Herten',
      'Strasse': 'Konrad-Adenauer-Str. 12',
      'Latitude': 51.594829,
      'Longitude': 7.139193,
      'Status': 'Online'
    },
    {
      'filNr': '164',
      'location': '164 - Bonn-Duisdorf',
      'Strasse': 'Rochusstr. 204',
      'Latitude': 50.715118,
      'Longitude': 7.048756,
      'Status': 'Online'
    },
    {
      'filNr': '167',
      'location': '167 - Oberhausen-Luchsstr.',
      'Strasse': 'Luchsstr. 1',
      'Latitude': 51.531458,
      'Longitude': 6.841249,
      'Status': 'Online'
    },
    {
      'filNr': '168',
      'location': '168 - Lüdinghausen',
      'Strasse': 'Münsterstr. 3',
      'Latitude': 51.772178,
      'Longitude': 7.444999,
      'Status': 'Online'
    },
    {
      'filNr': '169',
      'location': '169 - Sprockhövel',
      'Strasse': 'Hauptstraße 52',
      'Latitude': 51.366433,
      'Longitude': 7.247251,
      'Status': 'Online'
    },
    {
      'filNr': '171',
      'location': '171 - Düsseldorf Bilker Allee',
      'Strasse': 'Bilker Allee 48',
      'Latitude': 51.211139,
      'Longitude': 6.767321,
      'Status': 'Online'
    },
    {
      'filNr': '172',
      'location': '172 - Münster Hiltrup',
      'Strasse': 'Bergiusstr. 3',
      'Latitude': 51.9044898,
      'Longitude': 7.653092,
      'Status': 'Online'
    },
    {
      'filNr': '179',
      'location': '179 - Straelen',
      'Strasse': 'Klosterplatz 4',
      'Latitude': 51.443796,
      'Longitude': 6.265588,
      'Status': 'Online'
    },
    {
      'filNr': '180',
      'location': '180 - Lünen',
      'Strasse': 'Waltroper Strasse 14',
      'Latitude': 51.59646,
      'Longitude': 7.439049,
      'Status': 'Online'
    },
    {
      'filNr': '183',
      'location': '183 - Ennepetal',
      'Strasse': 'Voerder Straße 40',
      'Latitude': 51.299606,
      'Longitude': 7.347535,
      'Status': 'Online'
    },
    {
      'filNr': '185',
      'location': '185 - Solingen',
      'Strasse': 'Kirchstrasse 14',
      'Latitude': 51.171057,
      'Longitude': 7.083924,
      'Status': 'Online'
    },
    {
      'filNr': '187',
      'location': '187 - Willich',
      'Strasse': 'Grabenstraße 10',
      'Latitude': 51.2630115,
      'Longitude': 6.550469,
      'Status': 'Online'
    },
    {
      'filNr': '188',
      'location': '188 - Lippstadt',
      'Strasse': 'Erwitter Straße 121',
      'Latitude': 51.655549,
      'Longitude': 8.3439,
      'Status': 'Online'
    },
    {
      'filNr': '189',
      'location': '189 - Gütersloh',
      'Strasse': 'Brockhäger Straße 22',
      'Latitude': 51.916393,
      'Longitude': 8.371967,
      'Status': 'Offline'
    },
    {
      'filNr': '190',
      'location': '190 - Telgte',
      'Strasse': 'Steinstr. 11',
      'Latitude': 51.983235,
      'Longitude': 7.786012,
      'Status': 'Online'
    },
    {
      'filNr': '197',
      'location': '197 - Düsseldorf Himmelgeisterstr.',
      'Strasse': 'Himmelgeister Straße 96',
      'Latitude': 51.199592,
      'Longitude': 6.782228,
      'Status': 'Online'
    },
    {
      'filNr': '202',
      'location': '202 - Hamminkeln',
      'Strasse': 'Raiffeisenstr. 5',
      'Latitude': 51.729222,
      'Longitude': 6.59057,
      'Status': 'Online'
    },
    {
      'filNr': '213',
      'location': '213 - Hamm-Werries',
      'Strasse': 'Ostwennemarstraße 106',
      'Latitude': 51.688547,
      'Longitude': 7.884872,
      'Status': 'Online'
    },
    {
      'filNr': '215',
      'location': '215 - Dinslaken-Hiesfeld',
      'Strasse': 'Sterkrader Straße 239',
      'Latitude': 51.559919,
      'Longitude': 6.764411,
      'Status': 'Online'
    },
    {
      'filNr': '220',
      'location': '220 - Düsseldorf-Flingern',
      'Strasse': 'Gaußstraße 22',
      'Latitude': 51.230075,
      'Longitude': 6.815176,
      'Status': 'Online'
    },
    {
      'filNr': '228',
      'location': '228 - Hagen III',
      'Strasse': 'Elberfelder Straße 45',
      'Latitude': 51.358539,
      'Longitude': 7.469306,
      'Status': 'Online'
    },
    {
      'filNr': '229',
      'location': '229 - Gelsenkirchen-Horst',
      'Strasse': 'Essener Strasse 41',
      'Latitude': 51.537577,
      'Longitude': 7.0203,
      'Status': 'Online'
    },
    {
      'filNr': '231',
      'location': '231 - Lüdenscheid',
      'Strasse': 'Wilhelmstr. 14',
      'Latitude': 51.215765,
      'Longitude': 7.630275,
      'Status': 'Online'
    },
    {
      'filNr': '237',
      'location': '237 - Dortmund-Wickede',
      'Strasse': 'Wickeder Hellweg 89',
      'Latitude': 51.532091,
      'Longitude': 7.610056,
      'Status': 'Offline'
    },
    {
      'filNr': '239',
      'location': '239 - Essen-Kray',
      'Strasse': 'Krayer Straße 223',
      'Latitude': 51.46636,
      'Longitude': 7.080304,
      'Status': 'Online'
    },
    {
      'filNr': '241',
      'location': '241 - Moers Neumarkt',
      'Strasse': 'Neumarkt 21',
      'Latitude': 51.452578,
      'Longitude': 6.6259,
      'Status': 'Online'
    },
    {
      'filNr': '243',
      'location': '243 - Mayen',
      'Strasse': 'Marktplatz 30',
      'Latitude': 50.327778,
      'Longitude': 7.221065,
      'Status': 'Online'
    },
    {
      'filNr': '245',
      'location': '245 - Rheinberg',
      'Strasse': 'Rheinstr. 24',
      'Latitude': 51.547043,
      'Longitude': 6.601198,
      'Status': 'Offline'
    },
    {
      'filNr': '248',
      'location': '248 - Kaarst',
      'Strasse': 'Neusser Str. 12',
      'Latitude': 51.232091,
      'Longitude': 6.619588,
      'Status': 'Online'
    },
    {
      'filNr': '250',
      'location': '250 - Oberhausen-Schmachtendorf',
      'Strasse': 'Tenterstraße 12',
      'Latitude': 51.542428,
      'Longitude': 6.817143,
      'Status': 'Online'
    },
    {
      'filNr': '251',
      'location': '251 - Leverkusen Wiesdorf',
      'Strasse': 'Wiesdorfer Platz 6c',
      'Latitude': 51.0325931,
      'Longitude': 6.9828291,
      'Status': 'Online'
    },
    {
      'filNr': '254',
      'location': '254 - Emmerich',
      'Strasse': 'Kaßstraße 46',
      'Latitude': 51.837618,
      'Longitude': 6.2623,
      'Status': 'Online'
    },
    {
      'filNr': '256',
      'location': '256 - Köln-Rath-Heumar',
      'Strasse': 'Rösrather Strasse 569',
      'Latitude': 50.9298667907715,
      'Longitude': 7.04415607452393,
      'Status': 'Online'
    },
    {
      'filNr': '259',
      'location': '259 - Schwalmtal-Waldniel',
      'Strasse': 'St. Michaelstr. 3',
      'Latitude': 51.21434,
      'Longitude': 6.2739,
      'Status': 'Online'
    },
    {
      'filNr': '262',
      'location': '262 - Winterberg',
      'Strasse': 'Hauptstr. 14',
      'Latitude': null,
      'Longitude': null,
      'Status': 'Online'
    },
    {
      'filNr': '264',
      'location': '264 - Sinzig',
      'Strasse': 'Markt 8',
      'Latitude': 50.544185,
      'Longitude': 7.24941,
      'Status': 'Online'
    },
    {
      'filNr': '275',
      'location': '275 - Mettmann',
      'Strasse': 'Jubiläumsplatz 1',
      'Latitude': 51.251232,
      'Longitude': 6.978826,
      'Status': 'Online'
    },
    {
      'filNr': '279',
      'location': '279 - Brüggen',
      'Strasse': 'Klosterstr. 55',
      'Latitude': 51.241014,
      'Longitude': 6.183056,
      'Status': 'Offline'
    },
    {
      'filNr': '280',
      'location': '280 - Bonn Beuel',
      'Strasse': 'Hans-Böckler-Str. 5',
      'Latitude': 50.740081,
      'Longitude': 7.122065,
      'Status': 'Online'
    },
    {
      'filNr': '282',
      'location': '282 - Bad Neuenahr-Ahrweiler',
      'Strasse': 'Niederhutstr. 50',
      'Latitude': 50.542922,
      'Longitude': 7.0967,
      'Status': 'Online'
    },
    {
      'filNr': '284',
      'location': '284 - Alpen',
      'Strasse': 'Alte Kirchstr. 4',
      'Latitude': 51.576635,
      'Longitude': 6.512761,
      'Status': 'Offline'
    },
    {
      'filNr': '290',
      'location': '290 - Wuppertal-Cronenberg',
      'Strasse': 'Hauptstr. 45',
      'Latitude': 51.206901,
      'Longitude': 7.132897,
      'Status': 'Online'
    },
    {
      'filNr': '292',
      'location': '292 - Essen-Kupferdreh',
      'Strasse': 'Kupferdreher Str. 154',
      'Latitude': 51.391886,
      'Longitude': 7.082387,
      'Status': 'Online'
    },
    {
      'filNr': '294',
      'location': '294 - Krefeld-Hüls',
      'Strasse': 'Kempener Str. 7',
      'Latitude': 51.372916,
      'Longitude': 6.507999,
      'Status': 'Online'
    },
    {
      'filNr': '296',
      'location': '296 - Düsseldorf Dietrich Karee in Pempelfort',
      'Strasse': 'Duisburger Straße 24',
      'Latitude': 51.236301,
      'Longitude': 6.781286,
      'Status': 'Online'
    },
    {
      'filNr': '299',
      'location': '299 - Hagen Mittelstr.',
      'Strasse': 'Mittelstr. 6',
      'Latitude': 51.356558,
      'Longitude': 7.476116,
      'Status': 'Online'
    },
    {
      'filNr': '304',
      'location': '304 - Duisburg-Buchholz',
      'Strasse': 'Münchener Str. 39',
      'Latitude': 51.384019,
      'Longitude': 6.763045,
      'Status': 'Online'
    },
    {
      'filNr': '308',
      'location': '308 - Duisburg Rumeln',
      'Strasse': 'Düsseldorfer Str. 113',
      'Latitude': 51.391156,
      'Longitude': 6.656324,
      'Status': 'Online'
    },
    {
      'filNr': '309',
      'location': '309 - Bottrop-Kirchhellen',
      'Strasse': 'Hauptstr. 53',
      'Latitude': 51.604161,
      'Longitude': 6.923042,
      'Status': 'Online'
    },
    {
      'filNr': '312',
      'location': '312 - Wuppertal-Barmen II',
      'Strasse': 'Werth 75',
      'Latitude': 51.272214,
      'Longitude': 7.203747,
      'Status': 'Online'
    },
    {
      'filNr': '316',
      'location': '316 - Leverkusen-Rheindorf',
      'Strasse': 'Felderstr. 55',
      'Latitude': 51.050755,
      'Longitude': 6.949042,
      'Status': 'Online'
    },
    {
      'filNr': '319',
      'location': '319 - Essen-Frintrop',
      'Strasse': 'Frintroper Straße 441',
      'Latitude': 51.475391,
      'Longitude': 6.912588,
      'Status': 'Online'
    },
    {
      'filNr': '322',
      'location': '322 - Düsseldorf-Wersten',
      'Strasse': 'Kölner Landstr. 174',
      'Latitude': 51.188625,
      'Longitude': 6.818406,
      'Status': 'Online'
    },
    {
      'filNr': '325',
      'location': '325 - Gummersbach',
      'Strasse': 'Kaiserstr. 2b',
      'Latitude': 51.026231,
      'Longitude': 7.566901,
      'Status': 'Online'
    },
    {
      'filNr': '326',
      'location': '326 - Kevelaer Hauptstr 56',
      'Strasse': 'Hauptstr. 56',
      'Latitude': 51.582371,
      'Longitude': 6.247188,
      'Status': 'Online'
    },
    {
      'filNr': '328',
      'location': '328 - Gladbeck EKZ',
      'Strasse': 'Hochstr. 10',
      'Latitude': 51.573121,
      'Longitude': 6.990291,
      'Status': 'Online'
    },
    {
      'filNr': '329',
      'location': '329 - Bonn Bad Godesberg',
      'Strasse': 'Koblenzer Straße 62',
      'Latitude': 50.683935,
      'Longitude': 7.155274,
      'Status': 'Online'
    },
    {
      'filNr': '330',
      'location': '330 - Hofheim am Taunus',
      'Strasse': 'Am alten Bach 2',
      'Latitude': 50.087039,
      'Longitude': 8.443291,
      'Status': 'Online'
    },
    {
      'filNr': '331',
      'location': '331 - Oberursel',
      'Strasse': 'Vorstadt 2',
      'Latitude': 50.200738,
      'Longitude': 8.581973,
      'Status': 'Online'
    },
    {
      'filNr': '337',
      'location': '337 - Frankfurt Hessencenter',
      'Strasse': 'Borsigallee 26',
      'Latitude': 50.140548,
      'Longitude': 8.751814,
      'Status': 'Online'
    },
    {
      'filNr': '342',
      'location': '342 - Hainburg',
      'Strasse': 'Daimler Str.4',
      'Latitude': 50.066514,
      'Longitude': 8.969242,
      'Status': 'Online'
    },
    {
      'filNr': '344',
      'location': '344 - Waldbröl',
      'Strasse': 'Kaiserstr. 98',
      'Latitude': 50.879832,
      'Longitude': 7.625004,
      'Status': 'Online'
    },
    {
      'filNr': '345',
      'location': '345 - Frankfurt Limescorso',
      'Strasse': 'Limescorso 8',
      'Latitude': 50.15624,
      'Longitude': 8.63386,
      'Status': 'Online'
    },
    {
      'filNr': '346',
      'location': '346 - Linden',
      'Strasse': 'Max-Eyth Weg 1',
      'Latitude': 50.539274,
      'Longitude': 8.653871,
      'Status': 'Online'
    },
    {
      'filNr': '349',
      'location': '349 - Iserlohn Vinckestr.',
      'Strasse': 'Vinckestraße 9',
      'Latitude': 51.37512,
      'Longitude': 7.703864,
      'Status': 'Online'
    },
    {
      'filNr': '350',
      'location': '350 - Frankfurt Hedderichstr.',
      'Strasse': 'Hedderichstr. 47',
      'Latitude': 50.10049,
      'Longitude': 8.687033,
      'Status': 'Online'
    },
    {
      'filNr': '351',
      'location': '351 - Lohr am Main',
      'Strasse': 'Hauptstr.15',
      'Latitude': 49.994483,
      'Longitude': 9.574675,
      'Status': 'Offline'
    },
    {
      'filNr': '501',
      'location': '501 - Düsseldorf-Rath',
      'Strasse': 'Westfalenstr. 35',
      'Latitude': 51.2626,
      'Longitude': 6.814553,
      'Status': 'Online'
    },
    {
      'filNr': '502',
      'location': '502 - Recklinghausen',
      'Strasse': 'Bochumer Str. 119',
      'Latitude': 51.572824,
      'Longitude': 7.212733,
      'Status': 'Online'
    },
    {
      'filNr': '504',
      'location': '504 - Herzogenrath',
      'Strasse': 'Kleikstr. 29',
      'Latitude': 50.868185,
      'Longitude': 6.094614,
      'Status': 'Online'
    },
    {
      'filNr': '506',
      'location': '506 - Duisburg-Wanheimerort',
      'Strasse': 'Fischerstr. 95',
      'Latitude': 51.402239,
      'Longitude': 6.761605,
      'Status': 'Online'
    },
    {
      'filNr': '508',
      'location': '508 - Coesfeld',
      'Strasse': 'Kupferstr. 19',
      'Latitude': 51.943537,
      'Longitude': 7.165098,
      'Status': 'Online'
    },
    {
      'filNr': '509',
      'location': '509 - Essen-Steele',
      'Strasse': 'Bochumer Str. 13',
      'Latitude': 51.446486,
      'Longitude': 7.07668,
      'Status': 'Offline'
    },
    {
      'filNr': '510',
      'location': '510 - Bergheim',
      'Strasse': 'Hauptstr. 51',
      'Latitude': 50.953526,
      'Longitude': 6.638868,
      'Status': 'Online'
    },
    {
      'filNr': '513',
      'location': '513 - Aachen',
      'Strasse': 'Trierer Str. 1',
      'Latitude': 50.770886,
      'Longitude': 6.118424,
      'Status': 'Online'
    },
    {
      'filNr': '514',
      'location': '514 - Eschweiler',
      'Strasse': 'Grabenstr. 34',
      'Latitude': 50.819263,
      'Longitude': 6.267213,
      'Status': 'Online'
    },
    {
      'filNr': '516',
      'location': '516 - Herne I',
      'Strasse': 'Bahnhofstr. 34',
      'Latitude': 51.539176,
      'Longitude': 7.224096,
      'Status': 'Online'
    },
    {
      'filNr': '517',
      'location': '517 - Gevelsberg',
      'Strasse': 'Mittelstr. 50',
      'Latitude': 51.318994,
      'Longitude': 7.336705,
      'Status': 'Online'
    },
    {
      'filNr': '521',
      'location': '521 - Bochum Drehscheibe',
      'Strasse': 'Kortumstr. 100',
      'Latitude': 51.482468,
      'Longitude': 7.217278,
      'Status': 'Online'
    },
    {
      'filNr': '522',
      'location': '522 - Castrop-Rauxel',
      'Strasse': 'Münsterplatz 3',
      'Latitude': 51.549546,
      'Longitude': 7.309902,
      'Status': 'Online'
    },
    {
      'filNr': '525',
      'location': '525 - Wuppertal-Elberfeld',
      'Strasse': 'Friedrich-Ebert-Str. 88',
      'Latitude': 51.254034,
      'Longitude': 7.13426,
      'Status': 'Online'
    },
    {
      'filNr': '529',
      'location': '529 - Bochum-Wattenscheid',
      'Strasse': 'Oststr. 19',
      'Latitude': 51.480901,
      'Longitude': 7.135168,
      'Status': 'Online'
    },
    {
      'filNr': '530',
      'location': '530 - Ahlen',
      'Strasse': 'Oststr. 26',
      'Latitude': 51.763294,
      'Longitude': 7.894252,
      'Status': 'Online'
    },
    {
      'filNr': '531',
      'location': '531 - Duisburg Hochheide',
      'Strasse': 'Moerser Str. 287',
      'Latitude': 51.4496,
      'Longitude': 6.683524,
      'Status': 'Online'
    },
    {
      'filNr': '535',
      'location': '535 - Düren',
      'Strasse': 'Josef-Schregel-Str. 10',
      'Latitude': 50.805703,
      'Longitude': 6.482801,
      'Status': 'Online'
    },
    {
      'filNr': '538',
      'location': '538 - Solingen-Ohligs',
      'Strasse': 'Düsseldorfer Str. 55',
      'Latitude': 51.161983,
      'Longitude': 6.999212,
      'Status': 'Online'
    },
    {
      'filNr': '540',
      'location': '540 - Erkelenz',
      'Strasse': 'Kölner Str. 39a',
      'Latitude': 51.077507,
      'Longitude': 6.318776,
      'Status': 'Online'
    },
    {
      'filNr': '542',
      'location': '542 - Köln-Zollstock',
      'Strasse': 'Höninger Weg 172',
      'Latitude': 50.912016,
      'Longitude': 6.940718,
      'Status': 'Online'
    },
    {
      'filNr': '543',
      'location': '543 - Düsseldorf-Oberbilk',
      'Strasse': 'Kölner Str. 259',
      'Latitude': 51.215025,
      'Longitude': 6.804291,
      'Status': 'Online'
    },
    {
      'filNr': '546',
      'location': '546 - Düsseldorf-Gerresheim',
      'Strasse': 'Kölner Tor 18',
      'Latitude': 51.235919,
      'Longitude': 6.861594,
      'Status': 'Online'
    },
    {
      'filNr': '548',
      'location': '548 - Köln-Friesenplatz',
      'Strasse': 'Hohenzollernring 55',
      'Latitude': 50.939891,
      'Longitude': 6.939458,
      'Status': 'Online'
    },
    {
      'filNr': '550',
      'location': '550 - Haan',
      'Strasse': 'Dieker Str. 97',
      'Latitude': 51.194164,
      'Longitude': 7.011519,
      'Status': 'Online'
    },
    {
      'filNr': '551',
      'location': '551 - Berg. Gladbach Bensberg',
      'Strasse': 'Schloßstr. 30',
      'Latitude': 50.96609,
      'Longitude': 7.15916,
      'Status': 'Online'
    },
    {
      'filNr': '553',
      'location': '553 - Düsseldorf Friedrichstr.',
      'Strasse': 'Friedrichstr. 20',
      'Latitude': 51.216783,
      'Longitude': 6.776984,
      'Status': 'Online'
    },
    {
      'filNr': '554',
      'location': '554 - Düsseldorf-Benrath',
      'Strasse': 'Sistenichstr. 4',
      'Latitude': 51.163696,
      'Longitude': 6.872292,
      'Status': 'Online'
    },
    {
      'filNr': '555',
      'location': '555 - Gelsenkirchen-Buer',
      'Strasse': 'Rottmansiepe 2',
      'Latitude': 51.577558,
      'Longitude': 7.052779,
      'Status': 'Online'
    },
    {
      'filNr': '556',
      'location': '556 - Bottrop',
      'Strasse': 'Osterfelder Str. 7',
      'Latitude': 51.522462,
      'Longitude': 6.924659,
      'Status': 'Online'
    },
    {
      'filNr': '562',
      'location': '562 - Gronau',
      'Strasse': 'Neustr. 26',
      'Latitude': 52.211344,
      'Longitude': 7.02439,
      'Status': 'Online'
    },
    {
      'filNr': '564',
      'location': '564 - Herne Wanne-Eickel',
      'Strasse': 'Hauptstr. 232',
      'Latitude': 51.530967,
      'Longitude': 7.159235,
      'Status': 'Online'
    },
    {
      'filNr': '566',
      'location': '566 - Heinsberg',
      'Strasse': 'Hochstr. 118',
      'Latitude': 51.06331,
      'Longitude': 6.095459,
      'Status': 'Online'
    },
    {
      'filNr': '567',
      'location': '567 - Köln-Eigelstein',
      'Strasse': 'Eigelstein 102',
      'Latitude': 50.948702,
      'Longitude': 6.956921,
      'Status': 'Online'
    },
    {
      'filNr': '571',
      'location': '571 - Bocholt',
      'Strasse': 'Osterstr. 40',
      'Latitude': 51.838236,
      'Longitude': 6.618092,
      'Status': 'Online'
    },
    {
      'filNr': '572',
      'location': '572 - Remscheid-Lennep',
      'Strasse': 'Kölner Str. 82',
      'Latitude': 51.187333,
      'Longitude': 7.256078,
      'Status': 'Online'
    },
    {
      'filNr': '573',
      'location': '573 - Bochum-Langendreer',
      'Strasse': 'Alte Bahnhofstr. 202',
      'Latitude': 51.477111,
      'Longitude': 7.302508,
      'Status': 'Online'
    },
    {
      'filNr': '574',
      'location': '574 - Wesel',
      'Strasse': 'Brückstr. 33',
      'Latitude': 51.656906,
      'Longitude': 6.612523,
      'Status': 'Online'
    },
    {
      'filNr': '575',
      'location': '575 - Siegburg',
      'Strasse': 'Markt 2a',
      'Latitude': 50.79668,
      'Longitude': 7.206171,
      'Status': 'Online'
    },
    {
      'filNr': '576',
      'location': '576 - Geldern',
      'Strasse': 'Markt 5',
      'Latitude': 51.51673,
      'Longitude': 6.32301,
      'Status': 'Online'
    },
    {
      'filNr': '577',
      'location': '577 - Langenfeld',
      'Strasse': 'Ganspohler Str. 5',
      'Latitude': 51.109361,
      'Longitude': 6.950244,
      'Status': 'Online'
    },
    {
      'filNr': '578',
      'location': '578 - Dormagen',
      'Strasse': 'Kölner Str. 134',
      'Latitude': 51.095533,
      'Longitude': 6.840043,
      'Status': 'Online'
    },
    {
      'filNr': '579',
      'location': '579 - Hamm',
      'Strasse': 'Marktplatz 15',
      'Latitude': 51.681525,
      'Longitude': 7.818871,
      'Status': 'Online'
    },
    {
      'filNr': '583',
      'location': '583 - Brühl',
      'Strasse': 'Markt 16',
      'Latitude': 50.828649,
      'Longitude': 6.905055,
      'Status': 'Online'
    },
    {
      'filNr': '585',
      'location': '585 - Köln-Deutz',
      'Strasse': 'Deutzer Freiheit 77',
      'Latitude': 50.937024,
      'Longitude': 6.973668,
      'Status': 'Online'
    },
    {
      'filNr': '586',
      'location': '586 - Düsseldorf-Holthausen',
      'Strasse': 'Henkelstr. 9',
      'Latitude': 51.175615,
      'Longitude': 6.834865,
      'Status': 'Offline'
    },
    {
      'filNr': '587',
      'location': '587 - Köln-Nippes',
      'Strasse': 'Neusser Str. 224',
      'Latitude': 50.962171,
      'Longitude': 6.954482,
      'Status': 'Online'
    },
    {
      'filNr': '588',
      'location': '588 - Essen-Rüttenscheid',
      'Strasse': 'Rüttenscheider Str. 77',
      'Latitude': 51.439224,
      'Longitude': 7.006154,
      'Status': 'Online'
    },
    {
      'filNr': '591',
      'location': '591 - Dortmund-Hombruch',
      'Strasse': 'Harkortstr. 46',
      'Latitude': 51.475598,
      'Longitude': 7.441254,
      'Status': 'Online'
    },
    {
      'filNr': '594',
      'location': '594 - Leverkusen-Schlebusch',
      'Strasse': 'Bergische Landstr. 67',
      'Latitude': 51.035705,
      'Longitude': 7.051712,
      'Status': 'Online'
    },
    {
      'filNr': '595',
      'location': '595 - Duisburg-Neumühl',
      'Strasse': 'Hohenzollernplatz 16',
      'Latitude': 51.497063,
      'Longitude': 6.798471,
      'Status': 'Online'
    },
    {
      'filNr': '597',
      'location': '597 - Essen-Frohnhausen',
      'Strasse': 'Frohnhauser Str. 242',
      'Latitude': 51.449781,
      'Longitude': 6.975409,
      'Status': 'Online'
    },
    {
      'filNr': '850',
      'location': '850 - Frankenthal',
      'Strasse': 'Speyerer Str. 38',
      'Latitude': 49.533414,
      'Longitude': 8.353868,
      'Status': 'Online'
    },
    {
      'filNr': '853',
      'location': '853 - Aschaffenburg',
      'Strasse': 'Sandgasse 23',
      'Latitude': 49.974582,
      'Longitude': 9.148464,
      'Status': 'Online'
    }
  ]
}

const mutations = make.mutations(state)

const actions = {}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
