import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createBooking } from '../graphql/mutations';

const client = generateClient();

export default function BookingForm() {
  const [form, setForm] = useState({
    studentID: '',
    tutorID: '',
    time: '',
    status: 'pending',
    title: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const input = {
        ...form,
        createdAt: new Date().toISOString(),
      };
      await client.graphql({
        query: createBooking,
        variables: { input },
      });
      alert('Booking created!');
    } catch (err) {
      console.error('Booking creation failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
      <h2>Create a Booking</h2>
      <input name="studentID" placeholder="Student ID" onChange={handleChange} /><br />
      <input name="tutorID" placeholder="Tutor ID" onChange={handleChange} /><br />
      <input name="time" placeholder="Time (YYYY-MM-DDTHH:mm:ss)" onChange={handleChange} /><br />
      <input name="title" placeholder="Title" onChange={handleChange} /><br />
      <input name="notes" placeholder="Notes" onChange={handleChange} /><br />
      <button type="submit">Create Booking</button>
    </form>
  );
}