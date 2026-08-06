"use client";
import { useState, useEffect } from "react";
type Note = {
  id: number;
  note: string;
  from_user: string;
  to_user: string;
};
export default function TeacherClientPage({
  fetchNotes,
  initialNotes,
}: {
  fetchNotes: (since: any) => Promise<Note[]>;
  initialNotes?: Note[];
}) {
  const [notes, setNotes] = useState(initialNotes ? initialNotes : []);

  useEffect(() => {
    const interval = setInterval(async () => {
      let since;
      if (notes.length > 0) {
        since = notes[notes.length - 1]?.id ?? null;
      }
      const newNotes = await fetchNotes(since);
      setNotes([...notes, ...newNotes]);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <h1>Teacher View</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <fieldset>
              <h2>
                from: {note.from_user} | to {note.to_user}
              </h2>
              <p>{note.note}</p>
            </fieldset>
          </li>
        ))}
      </ul>
    </div>
  );
}
