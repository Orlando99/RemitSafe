DROP DATABASE IF EXISTS remit_safeDB;
CREATE DATABASE remit_safeDB;

USE remit_safeDB;

CREATE TABLE users (
    first_name VARCHAR (100) NOT NULL,
    last_name VARCHAR (100) NOT NULL,
    email VARCHAR (255) NOT NULL,
    pw_hash VARCHAR (255) NOT NULL,
    role VARCHAR (200) NOT NULL,
    aws_id_tok NVARCHAR (1000), # ?? LONGBLOB or something else
    aws_acc_tok NVARCHAR (1000), # ?? LONGBLOB or something else
    aws_ref_tok NVARCHAR (1000), # ?? LONGBLOB or something else
    relationship_id ENUM ('BID', 'VID'),
    stripe_id NVARCHAR (500) #???
);

CREATE TABLE buyers (
    buyer_name VARCHAR(200) NOT NULL,
    address1 VARCHAR(100) NOT NULL,
    address2 VARCHAR(100),
    city VARCHAR(50) NOT NULL,
    state ENUM(
'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS',
'MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV',
'WI','WY') NOT NULL,
    zip INT(5) NOT NULL,
    phone_number INTEGER (10) NOT NULL,
    buyer_id NVARCHAR (4000)
);

CREATE TABLE vendor (
    buyer_id NVARCHAR (4000),
    vendor_name VARCHAR (200) NOT NULL,
    address1 VARCHAR(100) NOT NULL,
    address2 VARCHAR(100),
    city VARCHAR(50) NOT NULL,
    state ENUM(
'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS',
'MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV',
'WI','WY') NOT NULL,
    zip INT(5) NOT NULL,
    phone_number INTEGER (10) NOT NULL,
    vendor_id NVARCHAR (4000),
    status ENUM('Unvierified', 'Pending-Vertification', 'Verified', 'Verified-With-Remit')
);

# CREATE TABLE orders (
#     buyer_id INT NOT NULL,
#     vendor_id INT NOT NULL,
#     order_num INT (100),
#     amount DECIMAL(10,2),
#     date_due DATE,
#     date_received DATETIME
# );
