import prisma from "../../../db/db.config";

const getUsersFromDB = async () => {
    const users = await prisma.user.findMany({})

    return users;
};

export const RoleService = {
    getUsersFromDB
}