import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.redirect("/login");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/dashboard", (req, res) => {
    res.render("dashboard");
});

router.get("/issue/:id", (req, res) => {
    res.render("issue", { issueId: req.params.id });
});

router.get("/create-issue", (req, res) => {
    res.render("createIssue");
});

export default router;