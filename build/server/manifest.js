const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","home.jpg"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.5b37cc2b.js","imports":["_app/immutable/entry/start.5b37cc2b.js","_app/immutable/chunks/index.7d0cd1aa.js","_app/immutable/chunks/singletons.011dbdef.js","_app/immutable/chunks/index.5dc4b988.js","_app/immutable/chunks/control.e7f5239e.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.e0a9862c.js","imports":["_app/immutable/entry/app.e0a9862c.js","_app/immutable/chunks/index.7d0cd1aa.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./chunks/0-aa0f38a5.js'),
			() => import('./chunks/1-76799ed6.js'),
			() => import('./chunks/2-fbdcfd7b.js'),
			() => import('./chunks/3-f9be17eb.js'),
			() => import('./chunks/4-9d8e9e69.js'),
			() => import('./chunks/5-619135f6.js'),
			() => import('./chunks/6-c9c90dc7.js'),
			() => import('./chunks/7-687e1037.js'),
			() => import('./chunks/8-f1af75c4.js'),
			() => import('./chunks/9-291ccaf6.js'),
			() => import('./chunks/10-315132db.js')
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
