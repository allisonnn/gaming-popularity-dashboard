# 🎮 Gaming popularity dashboard

This application (deployed at [https://allisonnn.github.io/gaming-popularity-dashboard](https://allisonnn.github.io/gaming-popularity-dashboard)) provides an easy way to explore some data in gaming industry, showing trends in game releases, what genres are popular, how sales compare in different regions, and which games are top-rated by using the data from [Video_Games_Sales_as_at_22_Dec_2016](https://www.kaggle.com/datasets/sidtwr/videogames-sales-dataset?select=Video_Games_Sales_as_at_22_Dec_2016.csv).

## Architecture

**1. Folder structure**

```shell
.
├── README.md
├── index.html
├── package.json
├── postcss.config.js
├── public
│   └── gamepad.svg # For the favicon.
├── src
│   ├── App.tsx # React entry point.
│   ├── components # Components for chart.
│   ├── context # Contexts
│   ├── helpers # Helper functions.
│   ├── hooks # Custom hooks e.g. useNumOfReleaseByGenre.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── mocks
│   │   └── source.json # The json file stores the dataset.
│   ├── test # Test utilities.
│   ├── types # Types definition.
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

**2. Utilizing React Context API**

The project uses Context API to provide a global state(data source) that can be accessed by any component within the component tree, to eliminate too much prop drilling. This global state is initialized and managed in the `App.tsx` file, which serves as the entry point of the application.

**3. Data Management**

The data used in the context is prepared and tidied before being stored in the context, ensuring that components consume clean and contentful info. This preprocessing step simplifies data manipulation in the application.

**4. Uitilizing custom hooks**

In the `hook` dir, custom hooks like `useNumOfReleaseByGenre.tsx` abstract the logic for accessing or computing specific pieces of state, such as the number of releases by genre by manufactuer. These hooks provide reusable logic that can be easily utilized by different components.

**5. Potential reusable components**

The `components` dir contains potential reusable component for the charts, encapsulating the visualization logic in a `Chart.tsx` and separating from the parent UI logic. This approach will also make the components easier to be tested.

**6. Type declarations**

Custom types have been created under `types` dir, to ensure the shape of the data and props passed around the components are consistent and error free.

## Technical choices

**1. Vite + React + Typescript**

Vite significantly accelerates development with its fast server start-up and HMR, requiring very minimal configuration, which makes it a good choice for this assignment.

**2.`visx` for data visualization**

`victory` doesn't have much activity on its GitHub, so I'm concerned it might not be well-maintained. When comparing between `visx` and `recharts`, `visx` is more like a low-level data visualization library which provides more control over customization. This should make it more scalable in the long term or for a larger scope.

**3. TailwindCSS for styling**

TailwindCSS is easy to use and speeds up some UI prototyping. It has ready-to-use design pieces which means less time writing custom code, so it's a pretty good choice for a solo project like this assignment.

**4. Vitest for unit testing**

I used Vitest because of its streamlined setup, fast test execution, and seamless integration with Vite, which reduced potential maintenance effort.

**5. Github Pages and Actions for deployment**

Since this is just a static web page, I'm using Github Pages to host the app and using the Github Actions to simplify the release process.

## Develop instructions

**Dev environment setup**

<details>
  <summary>1. Switch to the compatible node version</summary>

```shell
nvm add
```

</details>

<details>
  <summary>2. Prepare package manager</summary>
  
  ```shell
  corepack prepare
  ```
</details>

<details>
  <summary>3. Install dependency</summary>
  
  ```shell
  pnpm i
  ```
</details>
 
<details>
  <summary>4. Start development</summary>
  
  ```shell
  pnpm dev
  ```
</details>

<br/>

**Other commands**

<details>
  <summary>Run linter</summary>
  
  ```shell
  pnpm lint
  ```
</details>

<details>
  <summary>Run unit tests</summary>
  
  ```shell
  pnpm test
  ```
</details>

<details>
  <summary>Show test coverage</summary>
  
  ```shell
  pnpm test:coverage
  ```
</details>

<details>
  <summary>Build for production</summary>
  
  ```shell
  pnpm build
  ```
</details>

## Deploy instructions

This project leverages automated deployment via GitHub Actions, configured to trigger a deployment cycle upon new commits to the `main` branch. Any changes pushed to `main` will initiate the deployment process, and the application will be updated soon.

**Disable automatic deployment**

To disable the automated deployment, you can follow the official document from Github about [disabling a workflow](https://docs.github.com/en/actions/using-workflows/disabling-and-enabling-a-workflow#disabling-a-workflow).

## Production readiness checklist

> **Note:** These checklist are specifically based on this assignment project which is static single page application and may not contain infos like dynamic data loading, pagination concern etc..

### Overall checklist

- [ ] 1. [Acceptance criteria check](#1-acceptance-criteria-check)
- [ ] 2. [Test coverage check](#2-test-coverage-check)
- [ ] 3. [Performance check](#3-performance-check)
- [ ] 4. [Accessibility check](#4-accessibility-check)
- [ ] 5. [Localization check](#5-localization-check)
- [ ] 6. [Usability testing check](#6-usability-testing-check)
- [ ] 7. [Analytics and monitoring check](#7-analytics-and-monitoring-check)
- [ ] 8. [Documentation check](#8-documentation-check)

### Detailed checklist

#### 1. Acceptance criteria(requirements) check

- [x] 1.1 Release trend
  - [x] 1.1.1 The application displays a bar chart demoing the timeline of game releases.
  - [x] 1.1.2 Users can check through the timeline to see game released in that year.
  - [x] 1.1.3 Users can filter the data by manufacturer. By default, the UI shows overall releases across all the manufacturers.
- [x] 1.2 Popular genres
  - [x] 1.2.1 The application displays a breakdown of game genres released during the time period, sorted by release number in descending order.
  - [x] 1.2.2 Users can check how many game has been released for that genre on the bar chart.
  - [x] 1.2.3 Users can filter the data by manufacturer. By default, the UI shows overall releases across all the manufacturers.
- [x] 1.3 Regional sales analysis
  - [x] 1.3.1 The application displays a comparison of game sales across different regions in a pie chart.
  - [x] 1.3.2 Users can check the sales amount in each region by hovering on the pie chart.
  - [x] 1.3.3 Users can filter the data by manufacturer. By default, the UI shows overall releases across all the manufacturers.
- [x] 1.4 Top rated games
  - [x] 1.4.1 The application displays up to 20 highly rated games using critic score in a wordcloud.
  - [x] 1.4.2 Users can hover on the text and view the critic score of that game.
  - [x] 1.4.3 Users can filter the data by manufacturer. By default, the UI shows overall releases across all the manufacturers.
- [ ] 1.5 Handling edge cases
  - [ ] 1.5.1 Ensure the application's usability on very small screen sizes.
  - [ ] 1.5.2 Implement error boundaries within the application to provide clear error messages and guidance for resolution.
- [ ] 1.6 Document any known issues, including steps to reproduce and potential workarounds, to provide clear information for users and other developers.

#### 2. Test coverage check

- [ ] 2.1 Unit tests for individual components or functions.
  - [ ] 2.1.1 Ensure comprehensive coverage of the page header, footer, and custom hooks through unit tests.
  - [ ] 2.1.2 If possible, add basic unit tests to validate the correct rendering of charts with the appropriate SVG elements.
  - [ ] 2.1.3 Integrate with `jest-axe` to identify accessibility issues at an early stage.
- [ ] 2.2 Integration tests for testing the interaction between multiple components/hooks that are integrated together.
  - [ ] 2.2.1 Testing each chart wrapper is reading the correct data from store and rendering the charts.
- [ ] 2.3 System tests(End-to-end tests) to ensure the application meets the specified requirements and functions in all aspects.
  - [ ] 2.3.1 Implement end-to-end user workflow tests on the application(e.g. toggling between manufactuers), including both typical scenarios and edge cases.
  - [ ] 2.3.2 Evaluate the application's cross-browser and cross-device compatibility by testing on various browsers (Firefox, Edge, etc.) and devices (desktop, mobile, etc.).
- [ ] 2.4 Screenshot tests for visual regressions
  - [ ] 2.4.1 Since data visualization has many details on styling, we need to implement screenshot difference testing to capture visual regressions.
- [ ] 2.5 Test integration
  - [ ] 2.5.1 Integrate those automated tests listed above with the CI/CD pipeline to ensure the overall quality.

#### 3. Performance check

- [ ] 3.1 Utilize Chrome Performance Insights to simulate common user environments, ensuring that the Largest Contentful Paint (LCP) and Time to Interactive (TTI) metrics are within acceptable thresholds.

#### 4. Accessibility check

- [ ] 4.1 The application meets WCAG 2.2 AA standards.
- [ ] 4.2 All charts, images and svg elements have appropriate alt text and roles for screen readers.
- [ ] 4.3 The application is navigable using a keyboard only.
- [ ] 4.4 Color contrast ratios are sufficient.

#### 5. Localization check

- [ ] 5.1 All the content has been localized.

#### 6. Usability testing check

- [ ] 6.1 Conduct internal usability testing to ensure that the outcomes align with specified requirements.

#### 7. Analytics and monitoring check

- [ ] 7.1 Analytics tracking has been implemented for user interactions.
- [ ] 7.2 Real-time monitoring is set up to track application performance and usage.
- [ ] 7.3 Establish a way for collecting user feedback to improve the application in the next interation.

#### 8. Documentation check

- [ ] 8.1 Estabish maintainess guidelines and provide them to production support team.
- [ ] 8.2 Make sure user guides for the application, help documentation and legal documentation is accessible.

## TODOs

This section listed potential opportunities for converting this assignment into a fully functional product in the future showing dynamic data loaded from server.

- [ ] Improve the UX for a super large dataset
  - [ ] Show loading indicator.
  - [ ] Implement scrollbar for bar charts, utilizing virtulization.
- [ ] Implement more unit tests and system tests following the production readiness checklist above.
- [ ] Identify and address potential edge cases
  - [ ] Show meaningful error messages for broken empty dataset.
  - [ ] Implement 404/403 error messages.
  - [ ] Find the performance limitation, for example if the dataset is super large, we might end up with thousands of svg elements on the page, which cause some performance issue and we need to switch to canvas at that point.
  - [ ] Mobile devices:
    - [ ] Reduce number of labels on `AxisBottom` in the release trend chart, or try a different way otherwise the labels might have overlay.
    - [ ] Release trend chart is not very readable on a very small mobile screen due to the width limit.
- [ ] UX improvements
  - [ ] Add additional filters(e.g. filter by games released after 2000) for each chart to allow for more granular data exploration.
  - [ ] Introduce a detail page feature, enabling users to look into more details such as checking top-rated games by screenshos, score, genre, and description, or exploring popular genres within each region through the regional sales widget.
  - [ ] Work with designers to polish the UI.
- [ ] A11y improvements
  - [ ] Using pattern fill for bar chart and pie chart.
  - [ ] Improve color contrast ratio.
- [ ] Using i18n localize content.
- [ ] Extracting common UI pieces like card heading component, useTooltip hook.
