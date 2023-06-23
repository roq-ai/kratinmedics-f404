import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { seniorUserValidationSchema } from 'validationSchema/senior-users';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getSeniorUsers();
    case 'POST':
      return createSeniorUser();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSeniorUsers() {
    const data = await prisma.senior_user
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'senior_user'));
    return res.status(200).json(data);
  }

  async function createSeniorUser() {
    await seniorUserValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.senior_user_organization?.length > 0) {
      const create_senior_user_organization = body.senior_user_organization;
      body.senior_user_organization = {
        create: create_senior_user_organization,
      };
    } else {
      delete body.senior_user_organization;
    }
    const data = await prisma.senior_user.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
