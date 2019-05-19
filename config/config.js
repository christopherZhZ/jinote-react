import appRoutes from './router.config';

const plugins = [
  // ref: https://umijs.org/plugin/umi-plugin-react.html
  ['umi-plugin-react', {
    antd: true,
    dva: true,
    dynamicImport: false,
    title: 'jinote-react',
    dll: false,
    locale: {
      enable: true,
      default: 'en-US',
    },
    routes: {
      exclude: [
        /models\//,
        /services\//,
        /model\.(t|j)sx?$/,
        /service\.(t|j)sx?$/,
        /components\//,
      ],
    },
  }],
];

export default {
  treeShaking: true,
  plugins,
  routes: appRoutes,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);
      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  proxy: {
    '/server/api': {
      target: 'http://localhost:8081',
      // target: 'http://192.168.0.26:8081',
      changeOrigin: true,
      pathRewrite: { "^/server/api" : "" },
    },
  }
}
