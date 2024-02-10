import { UseGuards, applyDecorators } from "@nestjs/common";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";
import { RoleUser } from "../../common/enums/roles.enum";


export function Auth(roles: RoleUser[]){
    return applyDecorators(
        Roles(roles),
        UseGuards(AuthGuard,RolesGuard)
    )
}