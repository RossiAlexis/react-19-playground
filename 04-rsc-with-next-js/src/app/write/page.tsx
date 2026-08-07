import { AsyncDatabase } from "promised-sqlite3";

import postNote from "./postNote";

type User = {
  id: number;
  name: string;
};
export default async function WritePage() {
  async function getUsers() {
    const db = await AsyncDatabase.open("./notes.db");
    return db.all<User>("SELECT * FROM users");
  }
  const users = await getUsers();

  return (
    <div>
      <fieldset className="note-fieldset">
        <legend>Write a Note</legend>
        <form action={postNote} className="note-form">
          <label htmlFor="">
            From
            <select name="from_user" id="from">
              {users.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="">
            To
            <select defaultValue={2} name="to_user" id="to">
              {users.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="note">
            <textarea name="note" id="note" />
          </label>
          <button type="submit">Save</button>
        </form>
      </fieldset>
    </div>
  );
}
