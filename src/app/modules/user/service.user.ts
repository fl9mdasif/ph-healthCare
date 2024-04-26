import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();
const createAdmin = async (data: any) => {
  console.log(data);

  const userData = {
    email: data?.admin?.email,
    password: data?.password,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    // create user
    const createUser = await transactionClient.user.create({
      data: userData,
    });

    const createAdmin = await transactionClient.admin.create({
      data: data.admin,
    });
    return createAdmin;
  });
  return result;
};

export const userService = {
  createAdmin,
};