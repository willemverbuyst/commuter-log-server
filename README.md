## Svelte

[Svelte](https://svelte.dev/)

```
npx degit sveltejs/template PROJECT

npm install

npm run dev
```

#

## Datepicker

[Svelte-calendar](https://github.com/6eDesign/svelte-calendar)

```
npm install -D svelte-calendar
```

#

## ChartJS

[chartjs](https://www.chartjs.org/docs/latest/getting-started/installation.html)

[chartjs-plugin-datalabels](https://www.npmjs.com/package/chartjs-plugin-datalabels)

```
npm install chart.js --save

npm install chartjs-plugin-datalabels
```

#

## Dotenv

[dotenv](https://www.npmjs.com/package/dotenv)

[How to setup .env variables to your Svelte JS app](https://medium.com/dev-cafe/how-to-setup-env-variables-to-your-svelte-js-app-c1579430f032)

[Bug: Rollup plugin-replace: preventAssignment set to "false"](https://github.com/sveltejs/sapper-template/issues/302)

```
npm install --save-dev dotenv @rollup/plugin-replace
```

- Add .env
- Add .env to .gitignore
- Update rollup.config.js
- Adjust rollup.config.js, add `preventAssignment: true`

#

## Firebase

[Add Firebase to your JavaScript project](https://firebase.google.com/docs/web/setup)

```
npm install --save firebase
```

#

## TypeScript

[Adding TypeScript to an existing project](https://svelte.dev/blog/svelte-and-typescript)

[How to use Typescript with Svelte (updated)](https://codechips.me/how-to-use-typescript-with-svelte/)

```
npm install --save-dev @tsconfig/svelte typescript svelte-preprocess svelte-check

npm install @rollup/plugin-typescript --save-dev

npm install @types/chart.js --save-dev

npx svelte-check
```

- Set up Svelte-Preprocess, update rolllup.config.js
- Create tsconfig.json

#

## Jest

[Svelte Testing Library](https://testing-library.com/docs/svelte-testing-library/intro)

[Svelte with TypeScript and Jest (Starter Project)](https://daveceddia.com/svelte-typescript-jest/)

[svelte-jester](https://github.com/mihar-22/svelte-jester#typescript)

[Svelte Testing Library](https://github.com/testing-library/svelte-testing-library)

[Testing Svelte components with Jest ](https://dev.to/jpblancodb/testing-svelte-components-with-jest-53h3)

```
npm install --save-dev @testing-library/svelte

npm install --save-dev jest

npm install --save-dev svelte-jester

npm install --save-dev babel-jest

npm install --save-dev @testing-library/jest-dom

npm install ts-jest

```

- Add test scripts to your package.json
- Add Jest configuration to your package.json
- Add a .babelrc
- Update Jest configuration
- Create a svelte.config.js
- Add Jest to type property of tsconfig.json
- Add @testing-library/jest-dom to type property of tsconfig.json
