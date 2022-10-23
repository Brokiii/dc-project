CREATE TABLE "user"(
                       "id" INTEGER NOT NULL,
                       "login" VARCHAR(50) NOT NULL,
                       "hashedPassword" VARCHAR(200) NULL,
                       "accountType" VARCHAR(50) NOT NULL,
                       "email" VARCHAR(50) NOT NULL,
                       "name" VARCHAR(50) NOT NULL,
                       "surname" VARCHAR(50) NOT NULL
);
ALTER TABLE
    "user" ADD PRIMARY KEY("id");
CREATE TABLE "insurance"(
                            "id" INTEGER NOT NULL,
                            "good_type" VARCHAR(50) NOT NULL,
                            "clientId" INTEGER NOT NULL,
                            "insuranceType" VARCHAR(50) NOT NULL
);
ALTER TABLE
    "insurance" ADD PRIMARY KEY("id");
CREATE TABLE "attachment"(
                             "id" INTEGER NOT NULL,
                             "content" bytea NOT NULL,
                             "insuranceId" INTEGER NOT NULL,
                             "uuid" UUID NOT NULL
);
ALTER TABLE
    "attachment" ADD PRIMARY KEY("id");
CREATE TABLE "loss_report"(
                              "id" INTEGER NOT NULL,
                              "insurance_id" INTEGER NOT NULL,
                              "stage" VARCHAR(500) NOT NULL,
                              "decision_comment" VARCHAR(500) NOT NULL,
                              "considered_favourably" BOOLEAN NOT NULL
);
ALTER TABLE
    "loss_report" ADD PRIMARY KEY("id");
CREATE TABLE "appellation"(
                              "id" INTEGER NOT NULL,
                              "loss_report_id" INTEGER NOT NULL,
                              "decision_comment" VARCHAR(500) NOT NULL,
                              "client_comment" VARCHAR(500) NOT NULL
);
ALTER TABLE
    "appellation" ADD PRIMARY KEY("id");
ALTER TABLE
    "insurance" ADD CONSTRAINT "insurance_clientid_foreign" FOREIGN KEY("clientId") REFERENCES "user"("id");
ALTER TABLE
    "attachment" ADD CONSTRAINT "attachment_insuranceid_foreign" FOREIGN KEY("insuranceId") REFERENCES "insurance"("id");
ALTER TABLE
    "loss_report" ADD CONSTRAINT "loss_report_insurance_id_foreign" FOREIGN KEY("insurance_id") REFERENCES "insurance"("id");
ALTER TABLE
    "appellation" ADD CONSTRAINT "appellation_loss_report_id_foreign" FOREIGN KEY("loss_report_id") REFERENCES "loss_report"("id");