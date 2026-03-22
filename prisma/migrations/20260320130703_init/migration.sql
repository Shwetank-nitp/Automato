-- CreateTable
CREATE TABLE "User" (
    "Id" INTEGER NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Id_key" ON "User"("Id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
