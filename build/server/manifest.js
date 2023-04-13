const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","home.jpg"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.d574cec7.js","imports":["_app/immutable/entry/start.d574cec7.js","_app/immutable/chunks/index.7d0cd1aa.js","_app/immutable/chunks/singletons.b204ce40.js","_app/immutable/chunks/index.5dc4b988.js","_app/immutable/chunks/control.e7f5239e.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.a6ac569f.js","imports":["_app/immutable/entry/app.a6ac569f.js","_app/immutable/chunks/index.7d0cd1aa.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./chunks/0-68fae170.js'),
			() => import('./chunks/1-b72d42d8.js'),
			() => import('./chunks/2-af413232.js'),
			() => import('./chunks/3-cb3ea81c.js'),
			() => import('./chunks/4-2a762179.js'),
			() => import('./chunks/5-95d8ad7e.js'),
			() => import('./chunks/6-9c71ee79.js'),
			() => import('./chunks/7-81c6a7d9.js'),
			() => import('./chunks/8-75236d60.js'),
			() => import('./chunks/9-7b96a4a5.js'),
			() => import('./chunks/10-a3e14b41.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/coding-problems",
				pattern: /^\/coding-problems\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 6 },
				endpoint: null
			},
			{
				id: "/coding-problem/[slug]",
				pattern: /^\/coding-problem\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,,], errors: [1,2], leaf: 5 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 7 },
				endpoint: null
			},
			{
				id: "/profile",
				pattern: /^\/profile\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 8 },
				endpoint: null
			},
			{
				id: "/write-code-online",
				pattern: /^\/write-code-online\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 9 },
				endpoint: null
			},
			{
				id: "/write-code-online/[slug]",
				pattern: /^\/write-code-online\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 10 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

export { manifest };
//# sourceMappingURL=manifest.js.map
