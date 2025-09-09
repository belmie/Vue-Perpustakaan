import Tetapan from './views/Tetapan';
import Laporan from './views/Laporan';
import Surat from './views/Surat';
import Penggurusan from './views/Penggurusan';
import Tempahan from './views/Tempahan';
import Metadata from './views/Metadata';
import Rekod from './views/Rekod';
import Cuti from './views/Cuti';
import Log from './views/Log';
import Info from './views/Info';
import auth from "./auth";
import { createRouter, createWebHashHistory } from "vue-router";

import Home from "./views/home-page";
import Profile from "./views/profile-page";
import Tasks from "./views/tasks-page";
import defaultLayout from "./layouts/side-nav-outer-toolbar";
import simpleLayout from "./layouts/single-card";

function loadView(view) {
  return () => import (/* webpackChunkName: "login" */ `./views/${view}.vue`)
}

const router = new createRouter({
  routes: [
    {
      path: "/home",
      name: "home",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: Home
    },
    {
      path: "/profile",
      name: "profile",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: Profile
    },
    {
      path: "/tasks",
      name: "tasks",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: Tasks
    },
    {
      path: "/login-form",
      name: "login-form",
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: "Sign In"
      },
      component: loadView("login-form")
    },
    {
      path: "/reset-password",
      name: "reset-password",
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: "Reset Password",
        description: "Please enter the email address that you used to register, and we will send you a link to reset your password via Email."
      },
      component: loadView("reset-password-form")
    },
    {
      path: "/create-account",
      name: "create-account",
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: "Sign Up"
      },
      component: loadView("create-account-form"),
    },
    {
      path: "/change-password/:recoveryCode",
      name: "change-password",
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: "Change Password"
      },
      component: loadView("change-password-form")
    },
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/recovery",
      redirect: "/home"
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/home"
    }, 
    {
      path: "/info",
      name: "info",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: Info
    }, 
    {
      path: "/log",
      name: "log",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: Log
    }, 
    {
      path: "/cuti",
      name: "cuti",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: Cuti
    }, 
    {
      path: "/rekod",
      name: "rekod",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: Rekod
    }, 
    {
      path: "/metadata",
      name: "metadata",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: Metadata
    }, 
    {
      path: "/tempahan",
      name: "tempahan",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: Tempahan
    }, 
    {
      path: "/penggurusan",
      name: "penggurusan",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: Penggurusan
    }, 
    {
      path: "/surat",
      name: "surat",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: Surat
    }, 
    {
      path: "/laporan",
      name: "laporan",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: Laporan
    }, 
    {
      path: "/tetapan",
      name: "tetapan",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: Tetapan
    }
  ],
  history: createWebHashHistory()
});

router.beforeEach((to, from, next) => {

  if (to.name === "login-form" && auth.loggedIn()) {
    next({ name: "home" });
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.loggedIn()) {
      next({
        name: "login-form",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
