export default [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Gallery',
    link: '/gallery',
  },
  {
    name: 'Registration',
    link: '/registration',
    submenu: [
      {
        name: 'Online Registration',
        link: '/registration/online',
      },
      {
        name: 'Onsite Registration',
        link: '/registration/onsite',
      },
    ],
  },
  {
    name: 'Contest Info',
    link: '/contest-info',
    submenu: [
      {
        name: '2017 Report',
        link: '/contest-info/2017-report',
        redirect: 'pdf',
        pdfRedirect: true,
      },
      {
        name: '2017 Photos',
        link: '/contest-info/2017-photos',
        redirect: 'url',
        urlRedirect: 'https://drive.google.com/drive/folders/12_zdQ3Q_cdEuHNgMClKZW52OCNHx1Rgx'
      },
      {
        name: '2017 Onsite Contest Standings',
        link: '/contest-info/2017-onsite-contest-standings',
        redirect: 'url',
        urlRedirect:
          'https://icpc.global/regionals/finder/dhaka-2017/standings',
      },
      {
        name: '2017 Onsite Contest Detailed Standings',
        link: '/contest-info/2017-onsite-contest-detailed-standings',
        redirect: 'pdf',
        pdfRedirect: true
      },
      {
        name: 'Online Contest Detailed Ranklist',
        link: '/contest-info/online-contest-detailed-ranklist',
        redirect: 'pdf',
        pdfRedirect: true
      },
    ],
  },
  {
    name: 'Committee',
    link: '/committee',
    submenu: [
      {
        name: 'Steering Committee',
        link: '/committee/steering-committee',
        pdfRedirect: true,
      },
      {
        name: 'Executive Committee',
        link: '/committee/executive-committee',
        pdfRedirect: true,
      },
      {
        name: 'Judging Panel',
        link: '/committee/judging-panel',
        pdfRedirect: true,
      },
      {
        name: 'Sub-Committee',
        link: '/committee/sub-committees',
      },
    ],
  },
  {
    name: 'Contact Us',
    link: '/contact',
  },
];