import express from "express";
import cors from "cors";
import { errorHandler } from "./utils/errorHandler";
import customerRoutes from "./modules/Customer/customer.route";
import bikeRoutes from "./modules/Bike/bike.route";
import serviceRoutes from "./modules/Service/service.route";

const app = express();

app.use(cors());
app.use(express.json());

// Routes

app.get("/", (req, res) => {
  res.send("Bike Service Management API");
});

app.use("/api/customers", customerRoutes);
app.use("/api/bikes", bikeRoutes);
app.use("/api/services", serviceRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
