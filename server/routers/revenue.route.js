import express from "express";
import Orders from "../models/order.model.js";
const router = express.Router();

// CALCULATE REVENUE
router.get("/", async (req, res) => {
  const { q } = req.query;
  if (q) {
    Orders.aggregate([
      ,
      {
        $group: {
          _id: { $eq: ["$status", "Selesai"] },
          revenue: { $sum: "$total_price" },
        },
      },
    ]).then((data) => {
      res.send(data);
    });
  }
});

export default router;
