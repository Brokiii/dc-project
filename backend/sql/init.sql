CREATE TABLE "user"(
                       "user_id" SERIAL NOT NULL,
                       "login" VARCHAR(50) NOT NULL,
                       "hashed_password" VARCHAR(200) NULL,
                       "account_type" VARCHAR(50) NOT NULL,
                       "email" VARCHAR(50) NOT NULL,
                       "name" VARCHAR(50) NOT NULL,
                       "surname" VARCHAR(50) NOT NULL
);
ALTER TABLE
    "user" ADD PRIMARY KEY("user_id");
CREATE TABLE "insurance"(
                            "insurance_id" SERIAL NOT NULL,
                            "good_type" VARCHAR(50) NOT NULL,
                            "client_id" INTEGER NOT NULL,
                            "insurance_type" VARCHAR(50) NOT NULL
);
ALTER TABLE
    "insurance" ADD PRIMARY KEY("insurance_id");
CREATE TABLE "attachment"(
                             "id" INTEGER NOT NULL,
                             "content" bytea NOT NULL,
                             "insurance_id" INTEGER NOT NULL,
                             "uuid" UUID NOT NULL
);
ALTER TABLE
    "attachment" ADD PRIMARY KEY("id");
CREATE TABLE "loss_report"(
                              "loss_id" SERIAL NOT NULL,
                              "insurance_id" INTEGER NOT NULL,
                              "stage" VARCHAR(500) NOT NULL,
                              "decision_comment" VARCHAR(500) NOT NULL,
                              "considered_favourably" BOOLEAN NOT NULL
);
ALTER TABLE
    "loss_report" ADD PRIMARY KEY("loss_id");
CREATE TABLE "appellation"(
                              "appellation_id" SERIAL NOT NULL,
                              "loss_report_id" INTEGER NOT NULL,
                              "decision_comment" VARCHAR(500) NOT NULL,
                              "client_comment" VARCHAR(500) NOT NULL
);
ALTER TABLE
    "appellation" ADD PRIMARY KEY("appellation_id");
ALTER TABLE
    "insurance" ADD CONSTRAINT "insurance_clientid_foreign" FOREIGN KEY("client_id") REFERENCES "user"("user_id");
ALTER TABLE
    "attachment" ADD CONSTRAINT "attachment_insuranceid_foreign" FOREIGN KEY("insurance_id") REFERENCES "insurance"("insurance_id");
ALTER TABLE
    "loss_report" ADD CONSTRAINT "loss_report_insurance_id_foreign" FOREIGN KEY("insurance_id") REFERENCES "insurance"("insurance_id");
ALTER TABLE
    "appellation" ADD CONSTRAINT "appellation_loss_report_id_foreign" FOREIGN KEY("loss_report_id") REFERENCES "loss_report"("loss_id");