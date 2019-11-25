import { extname } from 'path';
import * as uuidv1 from 'uuid/v1';
import { HttpStatus, ForbiddenException } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new ForbiddenException('file extension tidak sesuai'));
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname);
  callback(null, uuidv1() + fileExtName);
};
