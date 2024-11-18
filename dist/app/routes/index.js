"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_route_1 = require("../module/project/project.route");
const experience_route_1 = require("../module/experience/experience.route");
const education_route_1 = require("../module/education/education.route");
const technology_route_1 = require("../module/technologies/technology.route");
const stats_route_1 = require("../module/stats/stats.route");
const router = (0, express_1.Router)();
const routes = [
    {
        path: '/project',
        route: project_route_1.projectRouter,
    },
    {
        path: '/experience',
        route: experience_route_1.experienceRouter,
    },
    {
        path: '/education',
        route: education_route_1.educationRouter,
    },
    {
        path: '/technology',
        route: technology_route_1.technologyRouter,
    },
    {
        path: '/stats',
        route: stats_route_1.statsRouter,
    },
];
routes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
