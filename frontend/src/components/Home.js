import React from "react";
import "./Home.css";

export default function Home() {
    return (
        <div className="home-container">
            <h1>Welcome to Notification Management System</h1>
            <p>
                This system allows you to create, view, update, and delete notifications
                with ease. Manage all your organization's notifications in one place,
                set priorities, categories, and schedule them as needed.
            </p>
            <div className="features">
                <div className="feature-card">
                    <h3>Create Notifications</h3>
                    <p>Add new notifications with detailed information and scheduling.</p>
                </div>
                <div className="feature-card">
                    <h3>Manage Notifications</h3>
                    <p>View, update, or delete existing notifications as needed.</p>
                </div>
                <div className="feature-card">
                    <h3>Organize Efficiently</h3>
                    <p>Categorize and prioritize notifications for better management.</p>
                </div>
            </div>
        </div>
    );
}