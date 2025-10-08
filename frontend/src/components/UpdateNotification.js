import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateNotification.css";

const UpdateNotification = () => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [priority, setPriority] = useState("medium");
    const [category, setCategory] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [createdBy, setCreatedBy] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8081/Notifications/get/${id}`)
            .then((res) => {
                const notificationData = res.data.notification;
                setTitle(notificationData.title);
                setMessage(notificationData.message);
                setPriority(notificationData.priority);
                setCategory(notificationData.category);
                setStartDate(new Date(notificationData.startDate).toISOString().slice(0, 16));
                setEndDate(notificationData.endDate ? new Date(notificationData.endDate).toISOString().slice(0, 16) : "");
                setIsActive(notificationData.isActive);
                setCreatedBy(notificationData.createdBy);
            })
            .catch((err) => {
                console.error("Error fetching notification data:", err);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedNotification = {
            title,
            message,
            priority,
            category,
            startDate,
            endDate,
            isActive,
            createdBy
        };

        axios.put(`http://localhost:8081/Notifications/update/${id}`, updatedNotification)
            .then(() => {
                alert("Notification updated successfully!");
                navigate("/notifications");
            })
            .catch((err) => {
                console.error("Error updating notification:", err);
                alert("Failed to update notification");
            });
    };

    return (
        <div className="update-container">
            <h1>Update Notification</h1>
            <form onSubmit={handleSubmit}>
                {/* Form fields remain the same as in your original */}
            </form>
        </div>
    );
};

export default UpdateNotification;  // This is the crucial fix