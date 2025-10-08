import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NotificationDisplay.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function NotificationDisplay() {
    const [notifications, setNotifications] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        function getNotifications() {
            axios
                .get("http://localhost:8081/Notifications/")
                .then((res) => {
                    setNotifications(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        getNotifications();
    }, []);

    const deleteNotification = (notificationId) => {
        axios
            .delete(`http://localhost:8081/Notifications/delete/${notificationId}`)
            .then(() => {
                setNotifications(notifications.filter((notification) => notification._id !== notificationId));
                alert(`Notification with ID: ${notificationId} deleted successfully.`);
            })
            .catch((err) => {
                alert(`Error deleting notification: ${err.message}`);
            });
    };

    const downloadPdf = (notification) => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text(`Notification Details: ${notification.title}`, 14, 15);
    
        const headers = [["Field", "Value"]];
        const data = [
            ["Title", notification.title],
            ["Message", notification.message],
            ["Priority", notification.priority],
            ["Category", notification.category],
            ["Start Date", new Date(notification.startDate).toLocaleString()],
            ["End Date", notification.endDate ? new Date(notification.endDate).toLocaleString() : "N/A"],
            ["Active Status", notification.isActive ? "Active" : "Inactive"],
            ["Created By", notification.createdBy],
            ["Created At", new Date(notification.createdAt).toLocaleString()]
        ];
    
        autoTable(doc, {
            head: headers,
            body: data,
            startY: 25,
            theme: "grid",
            styles: { fontSize: 10 },
            headStyles: { fillColor: [0, 122, 255] },
        });
    
        doc.save(`Notification_${notification.title}_Details.pdf`);
    };

    const filteredNotifications = notifications.filter((notification) =>
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="notification-container">
            <h1>All Notifications</h1>
            
            <div className="notification-count">
                <p>Total Notifications: {filteredNotifications.length}</p>
            </div>

            <div className="notification-search-bar">
                <input
                    type="text"
                    placeholder="Search notifications"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div>
                {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification, index) => (
                        <div key={index} className="notification-card">
                            <h3>Notification #{index + 1}</h3>
                            <div className="notification-field">
                                <label>Title: {notification.title}</label>
                            </div>
                            <div className="notification-field">
                                <label>Message: {notification.message}</label>
                            </div>
                            <div className="notification-field">
                                <label>Priority: {notification.priority}</label>
                            </div>
                            <div className="notification-field">
                                <label>Category: {notification.category}</label>
                            </div>
                            <div className="notification-field">
                                <label>Start Date: {new Date(notification.startDate).toLocaleString()}</label>
                            </div>
                            <div className="notification-field">
                                <label>End Date: {notification.endDate ? new Date(notification.endDate).toLocaleString() : "N/A"}</label>
                            </div>
                            <div className="notification-field">
                                <label>Status: {notification.isActive ? "Active" : "Inactive"}</label>
                            </div>
                            <div className="notification-field">
                                <label>Created By: {notification.createdBy}</label>
                            </div>

                            <div className="notification-actions">
                                <Link to={`/update/${notification._id}`}>
                                    <button className="update-btn">Update</button>
                                </Link>
                                <button className="delete-btn" onClick={() => deleteNotification(notification._id)}>Delete</button>
                                <button className="download-btn" onClick={() => downloadPdf(notification)}>Download PDF</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No notifications available.</p>
                )}
            </div>
        </div>
    );
}