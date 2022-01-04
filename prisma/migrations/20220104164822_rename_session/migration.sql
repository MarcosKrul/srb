/*
  Warnings:

  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_user_id_fkey";

-- DropTable
DROP TABLE "session";

-- CreateTable
CREATE TABLE "login_control" (
    "attempts" INTEGER NOT NULL,
    "blocked" BOOLEAN NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "login_control_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "login_control" ADD CONSTRAINT "login_control_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
