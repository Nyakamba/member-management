--  Create a new table with COLLATE NOCASE for name and email
CREATE TABLE NewMember (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT COLLATE NOCASE NOT NULL,
    email TEXT COLLATE NOCASE NOT NULL UNIQUE,
    dob DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    profilePicture TEXT,
    userId INTEGER NOT NULL,
    roleId INTEGER NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (userId) REFERENCES User (id),
    FOREIGN KEY (roleId) REFERENCES Role (id)
);

--  Copy data from the old Member table to the new table
INSERT INTO NewMember (id, name, email, dob, profilePicture, userId, roleId, createdAt, updatedAt)
SELECT id, name, email, dob, profilePicture, userId, roleId, createdAt, updatedAt FROM Member;

-- Step 3: Drop the old Member table
DROP TABLE Member;

-- Step 4: Rename the new table to Member
ALTER TABLE NewMember RENAME TO Member;
