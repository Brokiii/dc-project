CREATE TABLE "user"(
                       "id" INTEGER NOT NULL,
                       "login" VARCHAR(50) NOT NULL,
                       "hashedPassword" VARCHAR(200) NOT NULL,
                       "accountType" VARCHAR(50) NOT NULL,
                       "email" VARCHAR(50) NOT NULL,
                       "name" VARCHAR(50) NOT NULL,
                       "surname" VARCHAR(50) NOT NULL
);
ALTER TABLE
    "user" ADD PRIMARY KEY("id");
CREATE TABLE "insurance"(
                            "id" INTEGER NOT NULL,
                            "goodType" VARCHAR(50) NOT NULL,
                            "clientId" INTEGER NOT NULL,
                            "insuranceType" VARCHAR(50) NOT NULL,
                            "agentId" INTEGER NOT NULL
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
CREATE TABLE "loss"(
                       "id" INTEGER NOT NULL,
                       "insuranceId" INTEGER NOT NULL,
                       "stage" VARCHAR(500) NOT NULL,
                       "decisionComment" VARCHAR(500) NOT NULL,
                       "consideredFavourably" BOOLEAN NOT NULL
);
ALTER TABLE
    "loss" ADD PRIMARY KEY("id");
CREATE TABLE "appellation"(
                              "id" INTEGER NOT NULL,
                              "lossReportId" INTEGER NOT NULL,
                              "decisionComment" VARCHAR(500) NOT NULL,
                              "clientComment" VARCHAR(500) NOT NULL
);
ALTER TABLE
    "appellation" ADD PRIMARY KEY("id");
ALTER TABLE
    "insurance" ADD CONSTRAINT "insurance_clientid_foreign" FOREIGN KEY("clientId") REFERENCES "user"("id");
ALTER TABLE
    "insurance" ADD CONSTRAINT "insurance_agentid_foreign" FOREIGN KEY("agentId") REFERENCES "user"("id");
ALTER TABLE
    "attachment" ADD CONSTRAINT "attachment_insuranceid_foreign" FOREIGN KEY("insuranceId") REFERENCES "insurance"("id");
ALTER TABLE
    "loss" ADD CONSTRAINT "loss_insuranceid_foreign" FOREIGN KEY("insuranceId") REFERENCES "insurance"("id");
ALTER TABLE
    "appellation" ADD CONSTRAINT "appellation_lossreportid_foreign" FOREIGN KEY("lossReportId") REFERENCES "loss"("id");