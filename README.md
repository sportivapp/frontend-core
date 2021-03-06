# [![sportiv](https://www.sportiv.app/_nuxt/img/sportiv-orange.fe73cc7.svg)](https://www.sportiv.app)

## Frontend Core
> this is the repository that runs sportiv organization

## Preparation

You need to install [node](https://nodejs.org/) and [git](https://git-scm.com/) locally. The project is based on [ES2015+](https://es6.ruanyifeng.com/), [vue](https://cn.vuejs.org/index.html), [vuex](https://vuex.vuejs.org/zh-cn/), [vue-router](https://router.vuejs.org/zh-cn/), [vue-cli](https://github.com/vuejs/vue-cli) , [axios](https://github.com/axios/axios) and [element-ui](https://github.com/ElemeFE/element). Understanding and learning this knowledge in advance will greatly help the use of this project.

## Getting started
```bash
# clone the project
git clone https://github.com/sportivapp/frontend-core

# enter the project directory
cd frontend-core

# install dependency
npm install

# develop
npm run dev
```

## .env

for running in your machine, please prepare your .env

Development
```bash
tournamentUrl=https://tournament.quickplay.app
tournamentCreateUrl=https://tournament.quickplay.app/tournament/form/step-1 
```
Production
```bash
tournamentUrl=https://tournament.sportiv.app
tournamentSeeAll=https://tournament.sportiv.app/tournament
tournamentCreateUrl=https://tournament.sportiv.app/tournament/form/step-1

```

## Deployment Staging

```bash
# pull production branch
git pull staging

# install dependency
npm install

# build for production and launch server
$ npm run build

```

## Deployment Production

```bash
# pull staging branch
git pull main

# install dependency
npm install

# build for production and launch server
$ npm run build
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```

## Code Editor

To simplify and make it easier to develop Vue JS, we recommend to use [VS Code](https://code.visualstudio.com/), it has a large library of very useful extensions.

Install these mandatory extensions:

- ESLint (dbaeumer.vscode-eslint)
- Prettier - Code formatter (esbenp.prettier-vscode)

Install these optional extensions:
- Install both Sass extensions:
  - Sass (robinbentley.sass-indented)
  - SCSS IntelliSense (mrmlnc.vscode-scss)
- TODO Highlight (wayou.vscode-todo-highlight)
- Auto Close Tag (formulahendry.auto-close-tag)
- Auto Complete Tag (formulahendry.auto-complete-tag)
- Auto Rename Tag (formulahendry.auto-rename-tag)
- Color Highlight (naumovs.color-highlight)
- Highlight Matching Tag (vincaslt.highlight-matching-tag)
- JS Refactor (cmstead.jsrefactor)

The project will already be setup up with Workspace settings which will assume that the above extensions are installed.

## Browser

As the main browser for development and testing, we recommend using Google Chrome as it has some very powerful debugging extensions for Vue and Vuex.

Install these extentions:

- [Vue Developer Tools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
Before committing your code, you should always check that the new changes work as expected in the browsers:

## Browsers support
Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge | last 2 versions | last 2 versions | last 2 versions |

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
