-- CreateEnum
CREATE TYPE "ConnectionStatus" AS ENUM ('CONNECTED', 'DISCONNECTED', 'ERROR');

-- AlterTable
ALTER TABLE "PlatformConnection" ADD COLUMN     "status" "ConnectionStatus" NOT NULL DEFAULT 'DISCONNECTED';
