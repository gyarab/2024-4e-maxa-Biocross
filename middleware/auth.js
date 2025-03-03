function requireRole(role) {
    return function (req, res, next) {
        if (!req.session.user_id) {
            req.session.message = { text: "Nejdřív se přihlaš!", success: false };
            return res.redirect("/login");
        }

        if (req.session.role !== role) {
            req.session.message = { text: "Přihlaste se jako " + role + "!", success: false };
            return res.redirect("/login");
        }

        next();
    };
}

module.exports = { requireRole };
