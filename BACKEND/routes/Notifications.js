const router = require("express").Router();
let Notification = require("../models/Notification");

// Add a new notification
router.route("/add").post((req, res) => {
    const {
        title,
        message,
        priority,
        category,
        startDate,
        endDate,
        isActive,
        createdBy
    } = req.body;

    const newNotification = new Notification({
        title,
        message,
        priority,
        category,
        startDate,
        endDate,
        isActive,
        createdBy
    });

    newNotification.save()
        .then(() => res.json("Notification added successfully!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

// Get all notifications
router.route("/").get((req, res) => {
    Notification.find()
        .then((notifications) => res.json(notifications))
        .catch((err) => res.status(400).json("Error: " + err));
});

// Update a notification by ID
router.route("/update/:id").put(async (req, res) => {
    const notificationId = req.params.id;
    const updateData = req.body;

    try {
        const updatedNotification = await Notification.findByIdAndUpdate(notificationId, updateData, { new: true });
        if (!updatedNotification) {
            return res.status(404).json({ status: "Notification not found" });
        }
        res.status(200).json({ status: "Notification updated", notification: updatedNotification });
    } catch (err) {
        res.status(500).json({ status: "Error updating notification", error: err.message });
    }
});

// Delete a notification by ID
router.route("/delete/:id").delete(async (req, res) => {
    const notificationId = req.params.id;

    try {
        const deletedNotification = await Notification.findByIdAndDelete(notificationId);
        if (!deletedNotification) {
            return res.status(404).json({ status: "Notification not found" });
        }
        res.status(200).json({ status: "Notification deleted" });
    } catch (err) {
        res.status(500).json({ status: "Error deleting notification", error: err.message });
    }
});

// Get a notification by ID
router.route("/get/:id").get(async (req, res) => {
    const notificationId = req.params.id;

    try {
        const notification = await Notification.findById(notificationId);
        if (!notification) {
            return res.status(404).json({ status: "Notification not found" });
        }
        res.status(200).json({ status: "Notification fetched", notification });
    } catch (err) {
        res.status(500).json({ status: "Error fetching notification", error: err.message });
    }
});

module.exports = router;