-- Add user back to the database
INSERT INTO "Users" ("Auth0ID", "Username", "Name", "Email", "CreatedAt")
VALUES (
    'google-oauth2|100195696035167038572',
    'micahphlps',
    'micah',
    'micahphlps@gmail.com',
    NOW()
); 