import { createParamDecorator, SetMetadata } from '@nestjs/common';
import * as JWT from 'jwt-decode';

export const UserCustom = createParamDecorator((data: any, req) => {
  const headerToken = req.headers['authorization'];
  const notBearerToken = headerToken.replace('Bearer ', '');
  const dataToken = JWT(notBearerToken);
  const role = [];
  role.push(dataToken.role);

  return dataToken;
});
