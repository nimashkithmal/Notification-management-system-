import React, { useState } from "react";
import axios from "axios";
import "./AddNotification.css";
import { useNavigate } from "react-router-dom";

export default function AddNotification() {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [priority, setPriority] = useState("medium");
    const [category, setCategory] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [createdBy, setCreatedBy] = useState("");
    const navigate = useNavigate();

    const sendData = (e) => {
        e.preventDefault();

        const newNotification = {
            title,
            message,
            priority,
            category,
            startDate,
            endDate,
            isActive,
            createdBy
        };

        axios.post("http://localhost:8081/Notifications/add", newNotification)
            .then(() => {
                alert("Notification added successfully!");
                navigate("/");
            })
            .catch((err) => {
                console.error("Error adding notification:", err);
                alert("Failed to add notification");
            });
    };

    return (
        <div className="container">
            <form onSubmit={sendData}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter notification title"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        className="form-control"
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter notification message"
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select
                        className="form-control"
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        required
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        className="form-control"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Enter category"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="startDate">Start Date</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="endDate">End Date (Optional)</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="isActive">Active Status</label>
                    <select
                        className="form-control"
                        id="isActive"
                        value={isActive}
                        onChange={(e) => setIsActive(e.target.value === "true")}
                        required
                    >
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="createdBy">Created By</label>
                    <input
                        type="text"
                        className="form-control"
                        id="createdBy"
                        value={createdBy}
                        onChange={(e) => setCreatedBy(e.target.value)}
                        placeholder="Enter your name"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}