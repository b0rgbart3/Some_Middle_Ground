-- Drops the middleground if it exists currently --
-- DROP DATABASE IF EXISTS middleground;
-- Creates the "middleground" database --
-- CREATE DATABASE middleground;

-- survey_instances has one record to one participant, many questions, one chosen answer per question
CREATE TABLE survey_instances (
    id INTEGER NOT NULL,
    participant_id INTEGER NOT NULL,
    question_id VARCHAR(30),
    PRIMARY KEY (id)
)

-- participants has one record to one survey instance
CREATE TABLE participants (
    participant_id INTEGER NOT NULL,
    F_METRO INTEGER,
    F_CREGION INTEGER
    F_AGECAT INTEGER
    F_SEX INTEGER
    F_EDUCCAT INTEGER
    F_EDUCCAT2 INTEGER
    F_HISP INTEGER
    F_RACECMB INTEGER
    F_RACETHNMOD INTEGER
    F_CITIZEN INTEGER
    F_NATIVITY2 INTEGER
    F_MARITAL INTEGER
    F_RELIG INTEGER
    F_BORN INTEGER
    F_ATTEND INTEGER
    F_PARTY_FINAL INTEGER
    F_PARTYLN_FINAL INTEGER
    F_PARTYSUM_FINAL INTEGER
    F_INCOME INTEGER
    F_INCOME_RECODE INTEGER
    F_REG INTEGER
    F_IDEO INTEGER
    F_ACSWEB INTEGER
    F_VOLSUM INTEGER
    F_INC_TIER2 INTEGER
    F_HISP_ORIGIN INTEGER
    F_YEARSINUS INTEGER
    F_PARTYSUMIDEO INTEGER
    PRIMARY KEY (participant_id)
)

CREATE TABLE participant_demo_choices (
    
)

-- questions has one record to many answer options
CREATE TABLE questions (
    trans_id INTEGER AUTO_INCREMENT NO NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    transaction_type VARCHAR(30),
    notes VARCHAR(100),
    PRIMARY KEY (id)
    contact_id INTEGER,
    trans_type_id INTEGER,
    foodbundle_id INTEGER,
    FOREIGN KEY (trans_type_id) REFERENCES types(type_id)
)

-- questions has one record to many answer options
CREATE TABLE answer_choices (
    type_id INTEGER AUTO_INCREMENT NO NULL,
    type_name VARCHAR(20),
    related_table VARCHAR(20)
)