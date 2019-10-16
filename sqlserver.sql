-- carles log
-- to start: docker start mssqlball
-- data to remember: 
-- created docker container with command:
-- sudo docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=<YourStrong@Passw0rd>" \
--   -p 1433:1433 --name mssqlball \
--   -d mcr.microsoft.com/mssql/server:2017-latest-ubuntu
-- sa password <YourNewStrong@Passw0rd>
-- created database books with table named books



-- Create a new database called 'books'
-- Connect to the 'master' database to run this snippet
USE master
GO
-- Create the new database if it does not exist already
IF NOT EXISTS (
  SELECT name
    FROM sys.databases
    WHERE name = N'books'
)
CREATE DATABASE books
GO

-- Create the table books
CREATE TABLE books
(
  booksId INT NOT NULL PRIMARY KEY, -- primary key column
  title [NVARCHAR](50) NOT NULL,
  author [NVARCHAR](50) NOT NULL
  -- specify more columns here
);
GO

-- Insert rows into table 'TableName'
INSERT INTO books
( -- columns to insert data into
 [booksId], [title], [author]
)
VALUES
( -- first row: values for the columns in the list above
 0, 'War and Peace', 'Lev Nikolayevich Tolstoy'
),
( -- second row: values for the columns in the list above
 1, 'Les Misérables', 'Victor Hugo'
),
( 
 2, 'The Time Machine', 'H. G. Wells'
),
( 
 3, 'A Journey into the Center of the Earth', 'Jules Verne'
),
( 
 4, 'The Dark World', 'Henry Kuttner'
),
( 
 5, 'Life On The Mississippi', 'Mark Twain'
),
( 
 6, 'Childhood', 'Lev Nikolayevich Tolstoy'
)
GO

-- Select rows 
SELECT * FROM books
GO

-- Change colunm name from 'booksId' to 'id'
USE books;
EXEC sp_rename 'books.booksId' , 'id' , 'COLUMN';
    GO