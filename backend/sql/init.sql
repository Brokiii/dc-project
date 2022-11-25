CREATE TABLE "user"(
                       "id" INTEGER NOT NULL,
                       "login" VARCHAR(50) NOT NULL,
                       "hashed_password" VARCHAR(200) NOT NULL,
                       "account_type" VARCHAR(50) NOT NULL,
                       "email" VARCHAR(50) NOT NULL,
                       "name" VARCHAR(50) NOT NULL,
                       "surname" VARCHAR(50) NOT NULL
);
ALTER TABLE
    "user" ADD PRIMARY KEY("id");
CREATE TABLE "insurance"(
                            "id" INTEGER NOT NULL,
                            "good_type" VARCHAR(50) NOT NULL,
                            "client_id" INTEGER NOT NULL,
                            "insurance_type" VARCHAR(50) NOT NULL,
                            "agent_id" INTEGER
);
ALTER TABLE
    "insurance" ADD PRIMARY KEY("id");
CREATE TABLE "attachment"(
                             "id" INTEGER NOT NULL,
                             "content" bytea NOT NULL,
                             "insurance_id" INTEGER NOT NULL,
                             "uuid" UUID NOT NULL
);
ALTER TABLE
    "attachment" ADD PRIMARY KEY("id");
CREATE TABLE "loss"(
                       "id" INTEGER NOT NULL,
                       "insurance_id" INTEGER NULL,
                       "report_stage" VARCHAR(500) NOT NULL,
                       "decision_comment" VARCHAR(500) NULL,
                       "considered_favourably" BOOLEAN NULL,
                       "reason" VARCHAR(1500) NULL
);
ALTER TABLE
    "loss" ADD PRIMARY KEY("id");
CREATE TABLE "appellation"(
                              "id" INTEGER NOT NULL,
                              "loss_reportId" INTEGER NOT NULL,
                              "decision_comment" VARCHAR(500) NULL,
                              "client_comment" VARCHAR(500) NULL,
                              "considered_favourably" BOOLEAN NULL
);
ALTER TABLE
    "appellation" ADD PRIMARY KEY("id");
ALTER TABLE
    "insurance" ADD CONSTRAINT "insurance_client_id_foreign" FOREIGN KEY("client_id") REFERENCES "user"("id");
ALTER TABLE
    "insurance" ADD CONSTRAINT "insurance_agent_id_foreign" FOREIGN KEY("agent_id") REFERENCES "user"("id");
ALTER TABLE
    "attachment" ADD CONSTRAINT "attachment_insurance_id_foreign" FOREIGN KEY("insurance_id") REFERENCES "insurance"("id");
ALTER TABLE
    "loss" ADD CONSTRAINT "loss_insurance_id_foreign" FOREIGN KEY("insurance_id") REFERENCES "insurance"("id");
ALTER TABLE
    "appellation" ADD CONSTRAINT "appellation_loss_report_id_foreign" FOREIGN KEY("loss_reportId") REFERENCES "loss"("id");

CREATE SEQUENCE hibernate_sequence START 1;