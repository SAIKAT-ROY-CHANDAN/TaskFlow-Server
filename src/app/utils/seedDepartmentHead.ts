import prisma from '../../db/db.config';
import configs from '../configs';
import { seedRoleAdminData } from '../constant/seedRoleData';
import bcrypt from 'bcryptjs';

export const seedRoleAdmin = async () => {
  const existingRole = await prisma.role.findFirst();
  const existingAdmin = await prisma.departmentHead.findFirst();

  if (!existingRole && !existingAdmin) {
    prisma.$transaction(async (prisma) => {
      const createRole = await prisma.role.create({
        data: {
          name: seedRoleAdminData.name,
          roleFeature: {
            create: seedRoleAdminData.roleFeature.map((roleFeature) => {
              return {
                name: roleFeature.name,
                path: roleFeature.path,
                index: roleFeature.index,
              };
            }),
          },
        },
      });

      const hashedPassword = await bcrypt.hash(configs.password as string, 10);

      await prisma.departmentHead.create({
        data: {
          name: configs.adminFullName as string,
          email: configs.adminEmail as string,
          password: hashedPassword,
          designation: 'CEO',
          phone: configs.phone as string,
          roleId: createRole.id,
        },
      });
    });
  }
};
