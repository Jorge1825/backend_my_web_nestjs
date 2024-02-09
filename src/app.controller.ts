import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  ConflictException,
  NotFoundException,
  HttpCode
} from '@nestjs/common';


@Controller()
export class BaseController {
  @Get()
  async lifeServer() {
  //responde con un status 200 y un mensaje de "life"
    return {message: "life"};

  }

}
