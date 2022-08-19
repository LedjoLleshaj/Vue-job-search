import { createRouter, createWebHashHistory } from "vue-router";
//import HomeView from "@/views/HomeView.vue";
//import JobResultsView from "@/views/JobResultsView.vue";
//import JobView from "@/views/JobView.vue";
//Lazy Loading...
const HomeView = () => import("@/views/HomeView.vue");
const JobResultsView = () =>
  import(/* webpackChunkName: "jobs"*/ "@/views/JobResultsView.vue");
const JobView = () =>
  import(/* webpackChunkName: "jobs"*/ "@/views/JobView.vue");

const TeamsView = () =>
  import(/* webpackChunkName: "teams"*/ "@/views/TeamsView.vue");
//path name component
const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/jobs/results",
    name: "JobResults",
    component: JobResultsView,
  },
  {
    path: "/jobs/results/:id",
    name: "JobListing",
    component: JobView,
  },
  {
    path: "/teams",
    name: "Teams",
    component: TeamsView,
  },
  //To ADD new routes for adminItems that are declared in mainnav
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
      behavior: "smooth",
    };
  },
});
export default router;
