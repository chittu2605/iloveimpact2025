// getPlanManagement.js (fixed)
// Ensure correct relative path to authenticateToken depending on your project structure
const { SELECT_BV_WEIGHTAGE_PLAN_MANAGEMENT, SELECT_ALL_PLAN_MANAGEMENT } = require("../../dbQuery/planManagement/planManagement");
const connection = require("../../../dbConnect");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// require the authenticateToken middleware (adjust path if needed)
const authenticateToken = require("../../../utils/authenticateToken").authenticateToken;

module.exports = (app) => {

  // BV weightage - requires authenticated user
  app.get("/bv-weightage", urlencodedParser, authenticateToken, async (req, res) => {
    try {
      const adpId = (req.user && req.user.adp_id) ? req.user.adp_id : null;
      if (!adpId) {
        return res.status(400).json({ success: false, message: "Missing adp_id" });
      }

      connection.query(SELECT_BV_WEIGHTAGE_PLAN_MANAGEMENT(), async (error, results, fields) => {
        if (error) {
          console.error("DB error SELECT_BV_WEIGHTAGE_PLAN_MANAGEMENT:", error);
          return res.status(500).json({ success: false, message: "DB error" });
        }
        return res.json({ status: "success", results });
      });
    } catch (err) {
      console.error("Error in /bv-weightage handler:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  });

  // All plan management - requires authenticated user
  app.get("/all-plan-management", urlencodedParser, authenticateToken, async (req, res) => {
    try {
      const adpId = (req.user && req.user.adp_id) ? req.user.adp_id : null;
      if (!adpId) {
        return res.status(400).json({ success: false, message: "Missing adp_id" });
      }

      connection.query(SELECT_ALL_PLAN_MANAGEMENT(), async (error, results, fields) => {
        if (error) {
          console.error("DB error SELECT_ALL_PLAN_MANAGEMENT:", error);
          return res.status(500).json({ success: false, message: "DB error" });
        }
        return res.json({ status: "success", results });
      });
    } catch (err) {
      console.error("Error in /all-plan-management handler:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  });

};
