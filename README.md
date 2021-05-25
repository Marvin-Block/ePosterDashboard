# [KODiNET ePoster Dashboard](http://kodizabbix/)

![Produkt Bild](https://i.imgur.com/x9QlwwL.png)

[comment]: <> (**Vuetify Material Dashboard PRO** is a beautiful resource built over [Vuetify]&#40;https://vuetifyjs.com/en/&#41;, [Vuex]&#40;https://vuex.vuejs.org/installation.html&#41; and [Vuejs]&#40;https://vuejs.org/&#41;. It will help you get started and quickly developing dashboards in no time. Using the Dashboard is pretty simple but requires basic knowledge of Javascript, [Vuejs]&#40;https://vuejs.org/v2/guide/&#41; and [Vue-Router]&#40;https://router.vuejs.org/en/&#41;.)

## Getting Started

- Install Nodejs from the official [Nodejs page](https://nodejs.org/en/)
- Install yarn from the official [Yarn installation page](https://classic.yarnpkg.com/en/docs/install/#windows-stable).
- Open your terminal
- Navigate to the project
- Run `yarn install`
- Run `yarn serve` to start a local development server
- A new tab will be opened in your browser

You can also run additional tasks such as

- `yarn run build` to build your app for production
- `yarn run lint` to run linting.

## Vuetify

Vuetify is an Open Source UI Library that is developed exactly according to Material Design spec. Every component is handcrafted to bring you the best possible UI tools to your next great app. The development doesn't stop at the core components outlined in Google's spec. Through the support of community members and sponsors, additional components will be designed and made available for everyone to enjoy.

## Vuex

Vuex is a state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion. It also integrates with Vue's official [devtools](https://github.com/vuejs/vue-devtools) extension to provide advanced features such as zero-config time-travel debugging and state snapshot export / import.

## Vue-cli

We used the latest 3.x [Vue CLI](https://github.com/vuejs/vue-cli) which aims to reduce project configuration
to as little as possible. Almost everything is inside `package.json` + some other related files such as
`.babel.config.js`, `.eslintrc.js` and `.postcssrc.js`.

## File Structure

Within the download you'll find the following directories and files:

<details>

```txt
vuetify-material-dashboard/
┣ public/
┃ ┣ android-chrome-192x192.png
┃ ┣ android-chrome-512x512.png
┃ ┣ apple-touch-icon.png
┃ ┣ favicon-16x16.png
┃ ┣ favicon-32x32.png
┃ ┣ favicon.ico
┃ ┣ index.html
┃ ┣ robots.txt
┃ ┗ site.webmanifest
┣ src/
┃ ┣ assets/
┃ ┃ ┣ clint-mckoy.jpg
┃ ┃ ┣ lock.jpg
┃ ┃ ┣ login.jpg
┃ ┃ ┣ logo.png
┃ ┃ ┣ pricing.jpg
┃ ┃ ┣ register.jpg
┃ ┃ ┣ vmd.svg
┃ ┃ ┗ vuetify.svg
┃ ┣ components/
┃ ┃ ┣ app/
┃ ┃ ┃ ┣ BarItem.vue
┃ ┃ ┃ ┣ Btn.vue
┃ ┃ ┃ ┣ Card.vue
┃ ┃ ┃ ┗ Tabs.vue
┃ ┃ ┣ Links.vue
┃ ┃ ┣ MaterialAlert.vue
┃ ┃ ┣ MaterialCard.vue
┃ ┃ ┣ MaterialChartCard.vue
┃ ┃ ┣ MaterialDropdown.vue
┃ ┃ ┣ MaterialRevealCard.vue
┃ ┃ ┣ MaterialSnackbar.vue
┃ ┃ ┣ MaterialStatsCard.vue
┃ ┃ ┣ MaterialWizard.vue
┃ ┃ ┣ PlanCard.vue
┃ ┃ ┣ TestimonyCard.vue
┃ ┃ ┗ ViewIntro.vue
┃ ┣ i18n/
┃ ┃ ┣ messages/
┃ ┃ ┃ ┣ ar.json
┃ ┃ ┃ ┗ en.json
┃ ┃ ┗ index.js
┃ ┣ layouts/
┃ ┃ ┣ default/
┃ ┃ ┃ ┣ widgets/
┃ ┃ ┃ ┃ ┣ Account.vue
┃ ┃ ┃ ┃ ┣ AccountSettings.vue
┃ ┃ ┃ ┃ ┣ DrawerHeader.vue
┃ ┃ ┃ ┃ ┣ DrawerToggle.vue
┃ ┃ ┃ ┃ ┣ GoHome.vue
┃ ┃ ┃ ┃ ┣ Notifications.vue
┃ ┃ ┃ ┃ ┗ Search.vue
┃ ┃ ┃ ┣ AppBar.vue
┃ ┃ ┃ ┣ Drawer.vue
┃ ┃ ┃ ┣ Footer.vue
┃ ┃ ┃ ┣ Index.vue
┃ ┃ ┃ ┣ List.vue
┃ ┃ ┃ ┣ ListGroup.vue
┃ ┃ ┃ ┣ ListItem.vue
┃ ┃ ┃ ┣ Settings.vue
┃ ┃ ┃ ┗ View.vue
┃ ┃ ┗ page/
┃ ┃   ┣ AppBar.vue
┃ ┃   ┣ Footer.vue
┃ ┃   ┣ Index.vue
┃ ┃   ┗ View.vue
┃ ┣ plugins/
┃ ┃ ┣ app.js
┃ ┃ ┣ chartist.js
┃ ┃ ┣ index.js
┃ ┃ ┣ vee-validate.js
┃ ┃ ┣ vue-meta.js
┃ ┃ ┣ vue-world-map.js
┃ ┃ ┣ vuetify.js
┃ ┃ ┣ vuex-pathify.js
┃ ┃ ┣ webfontloader.js
┃ ┃ ┗ world-map-vue.js
┃ ┣ router/
┃ ┃ ┗ index.js
┃ ┣ store/
┃ ┃ ┣ modules/
┃ ┃ ┃ ┣ app.js
┃ ┃ ┃ ┣ index.js
┃ ┃ ┃ ┣ sales.js
┃ ┃ ┃ ┗ user.js
┃ ┃ ┗ index.js
┃ ┣ styles/
┃ ┃ ┣ overrides.sass
┃ ┃ ┗ variables.scss
┃ ┣ util/
┃ ┃ ┣ globals.js
┃ ┃ ┣ helpers.js
┃ ┃ ┗ routes.js
┃ ┣ views/
┃ ┃ ┣ Buttons.vue
┃ ┃ ┣ Calendar.vue
┃ ┃ ┣ Charts.vue
┃ ┃ ┣ Dashboard.vue
┃ ┃ ┣ DataTables.vue
┃ ┃ ┣ Error.vue
┃ ┃ ┣ ExtendedForms.vue
┃ ┃ ┣ ExtendedTables.vue
┃ ┃ ┣ FullscreenMap.vue
┃ ┃ ┣ GoogleMaps.vue
┃ ┃ ┣ Grid.vue
┃ ┃ ┣ Icons.vue
┃ ┃ ┣ Lock.vue
┃ ┃ ┣ Login.vue
┃ ┃ ┣ Notifications.vue
┃ ┃ ┣ Pricing.vue
┃ ┃ ┣ Register.vue
┃ ┃ ┣ RegularForms.vue
┃ ┃ ┣ RegularTables.vue
┃ ┃ ┣ Rtl.vue
┃ ┃ ┣ Tabs.vue
┃ ┃ ┣ Timeline.vue
┃ ┃ ┣ Typography.vue
┃ ┃ ┣ UserProfile.vue
┃ ┃ ┣ ValidationForms.vue
┃ ┃ ┣ Widgets.vue
┃ ┃ ┗ Wizard.vue
┃ ┣ App.vue
┃ ┗ main.js
┣ .browserslistrc
┣ .editorconfig
┣ .env.local
┣ .eslintrc.js
┣ .gitignore
┣ README.md
┣ babel.config.js
┣ package.json
┣ vue.config.js
┗ yarn.lock
```

</details>

## Useful Links

- [Documentation](https://vuetifyjs.com/)
