import { UseGuards, applyDecorators } from "@nestjs/common";
import { RoleUser } from "src/schemas/user.schema";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";


export function Auth(roles: RoleUser[]){
    return applyDecorators(
        Roles(roles),
        UseGuards(AuthGuard,RolesGuard)
    )
}