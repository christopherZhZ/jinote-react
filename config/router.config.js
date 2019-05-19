export default [
  { path: '/', redirect: '/jinote' },
  {
    path: '/jinote',
    component: '../layouts/MainLayout',
    routes: [
      { path: '/jinote', component: './NoteHome/index' },
      { path: '/jinote/account', component: './NoteAccount/index' },
    ]
  },
  {
    path: 'jinote-user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/jinote-user', redirect: '/jinote-user/login' },
      { path: '/jinote-user/login', component: './User/Login' },
      { path: '/jinote-user/signup', component: './User/Signup' },
    ]
  }
];
